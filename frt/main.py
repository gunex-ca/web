from pathlib import Path
import json
from tqdm import tqdm
import re
from collections import defaultdict
from peewee import *

db = SqliteDatabase("guns.db")

class BaseModel(Model):
    class Meta:
        database = db

class Gun(BaseModel):
    frn = CharField(primary_key=True)
    type = CharField()
    manufacturer = CharField()
    model = CharField()
    action = CharField()
    legal_class = CharField()
    country_code = CharField()
    calibres = CharField()
    pages = CharField()

countries = {
    "UNITED STATES OF AMERICA": "US",
    "CANADA": "CA",
    "UNITED KINGDOM": "GB",
    "SPAIN": "ES",
    "ITALY": "IT",
    "HUNGARY": "HU",
    "GERMANY": "DE",
    "BELGIUM": "BE",
    "CHINA": "CN",
    "ISRAEL": "IL",
    "TURKEY": "TR",
    "JAPAN": "JP",
    "BOSNIA-HERZEGOVINA": "BA",
    "AUSTRIA": "AT",
    "SWEDEN": "SE",
    "DENMARK": "DK",
    "NORWAY": "NO",
    "FINLAND": "FI",
    "POLAND": "PL",
    "CZECH REPUBLIC": "CZ",
    "FRANCE": "FR",
    "NETHERLANDS": "NL",
    "PORTUGAL": "PT",
    "RUSSIAN FEDERATION": "RU",
    "SWITZERLAND": "CH",
    "UNITED ARAB EMIRATES": "AE",
    "VENEZUELA": "VE",
    "FRANCE": "FR",
    "GREECE": "GR",
    "SERBIA": "RS",
    "CZECHOSLOVAKIA": "CZ",
    "YUGOSLAVIA": "RS",
    "RUSSIA": "RU",
    "GERMANY, WEST": "DE",
    "GERMANY, EAST": "DE",
    "TAIWAN": "TW",
    "KOREA, SOUTH": "KR",
    "ARGENTINA": "AR",
    "RHODESIA": "ZW",
    "PHILIPPINES": "PH",
    "BRAZIL": "BR",
    "PAKISTAN": "PK",
    "CHILE": "CL",
    "ROMANIA": "RO",
    "SINGAPORE": "SG",
    "AUSTRALIA": "AU",
    "NEW ZEALAND": "NZ",
    "IRELAND": "IE",
    "BURMA": "MM",
    "MEXICO": "MX",
    "BULGARIA": "BG",
    "SOUTH AFRICA": "ZA",
    "INDIA": "IN",
    "INDONESIA": "ID",
    "ALBANIA": "AL",
    "SLOVENIA": "SI",
    "CROATIA": "HR",
    "DOMINICAN REPUBLIC": "DO",
    "CONFEDERATE STATES OF AMERICA": "US",
    "NIGERIA": "NG",
    "MOROCCO": "MA",
    "TUNISIA": "TN",
    "MANCHURIA": "CN",
    "AZERBAIJAN": "AZ",
    "ESTONIA": "EE",
    "EGYPT": "EG",
    "IRAQ": "IQ",
    "UNITED ARAB REPUBLIC": "AE",
    "KOREA, NORTH": "KP",
    "IRAN": "IR",
    "UKRAINE": "UA",
    "SAUDI ARABIA": "SA",
    "SLOVAKIA (SLOVAK REPUBLIC)": "SK",
    "COLOMBIA": "CO",
    "JORDAN": "JO",
    "KAZAKHSTAN": "KZ",
    "VIETNAM": "VN",
    "THAILAND": "TH",
    "KOREA, REPUBLIC OF": "KR",
    "MALAYSIA": "MY",
    "LUXEMBOURG": "LU",
    "NEPAL": "NP",
    "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF": "MK",
    "PERU": "PE",
    "VIETNAM, NORTH": "VN",
    "MONTENEGRO": "ME",
}

MANUFACTURERS = {
    
}

KNOWN_LABELS = [
    "Manufacturer",
    "Model",
    "Action",
    "Legal Classification",
    "Country of Manufacturer",
    "Serial Numbering",
]


if __name__ == "__main__":

    MAX_PAGES = 107_191

    pdf_path = Path("./frt-0811.pdf").expanduser().resolve()

    CHUNK_SIZE = 10_000
    
    def load_existing_chunks() -> list[str]:
        """Load all existing chunk files and return combined page texts."""
        all_pages = []
        chunk_num = 1
        while True:
            chunk_file = Path(f"guns-{chunk_num}.json")
            if not chunk_file.exists():
                break
            try:
                with chunk_file.open("r", encoding="utf-8") as f:
                    chunk_data = json.load(f)
                if isinstance(chunk_data, list):
                    all_pages.extend(chunk_data)
                    print(f"Loaded {len(chunk_data)} pages from {chunk_file}")
                chunk_num += 1
            except Exception:
                print(f"Failed to load {chunk_file}")
                break
        return all_pages

    def save_chunk(pages: list[str], chunk_num: int) -> None:
        """Save a chunk of pages to a numbered file."""
        chunk_file = Path(f"guns-{chunk_num}.json")
        with chunk_file.open("w", encoding="utf-8") as f:
            json.dump(pages, f, ensure_ascii=False)
        print(f"Saved {len(pages)} pages to {chunk_file}")

    def check_all_chunks_exist(max_pages: int) -> bool:
        """Check if all required chunk files exist for the target page count."""
        required_chunks = (max_pages + CHUNK_SIZE - 1) // CHUNK_SIZE  # Ceiling division
        for chunk_num in range(1, required_chunks + 1):
            chunk_file = Path(f"guns-{chunk_num}.json")
            if not chunk_file.exists():
                return False
        return True

    # Check if we can skip extraction entirely
    if check_all_chunks_exist(MAX_PAGES):
        print(f"All chunk files exist for {MAX_PAGES} pages. Skipping extraction.")
        page_texts = load_existing_chunks()
    else:
        existing_pages = load_existing_chunks()
        total_existing = len(existing_pages)
        
        if total_existing < MAX_PAGES:
            if existing_pages:
                print(f"Have {total_existing} pages cached, need {MAX_PAGES}. Extracting more…")
            else:
                print(f"No cached pages found. Extracting from PDF…")
            
            import pdfplumber
            with pdfplumber.open(pdf_path) as pdf:
                total_pages = len(pdf.pages)
                target_count = min(MAX_PAGES, total_pages)
                
                # Process in chunks, skipping existing ones
                start_idx = total_existing
                pages_processed = total_existing
                
                # Calculate which chunks we need to process
                start_chunk = (start_idx // CHUNK_SIZE) + 1
                end_chunk = (target_count + CHUNK_SIZE - 1) // CHUNK_SIZE
                
                for chunk_num in range(start_chunk, end_chunk + 1):
                    chunk_file = Path(f"guns-{chunk_num}.json")
                    
                    if chunk_file.exists():
                        print(f"Skipping chunk {chunk_num} - {chunk_file} already exists")
                        pages_processed += CHUNK_SIZE
                        continue
                    
                    # Extract this chunk
                    chunk_start = (chunk_num - 1) * CHUNK_SIZE
                    chunk_end = min(chunk_start + CHUNK_SIZE, target_count)
                    current_chunk = []
                    
                    print(f"Extracting chunk {chunk_num} (pages {chunk_start + 1}-{chunk_end})")
                    for idx in tqdm(range(chunk_start, chunk_end), desc=f"Chunk {chunk_num}", unit="page"):
                        text = pdf.pages[idx].extract_text()
                        current_chunk.append(text if text is not None else "")
                        pages_processed += 1
                    
                    save_chunk(current_chunk, chunk_num)
                    
            print(f"Extraction complete: {pages_processed} total pages")
            # Reload all chunks for processing
            page_texts = load_existing_chunks()
        else:
            print(f"Using existing {total_existing} pages from cache")
            page_texts = existing_pages


    frn_groups = defaultdict(list)

    for idx, text in enumerate(page_texts):
        match = re.search(r"Firearm Reference Number \(FRN\):\s*(\d+)", text)
        if match:
            frn_number = match.group(1)
            frn_groups[frn_number].append((idx, text))
            if frn_number == "128418":
                print(text)
        else:
            frn_groups[None].append((idx, text))

    def extract_value(text: str, label: str) -> str | None:
        # Get only the remainder of the label's line
        pattern = rf"^{re.escape(label)}\s*:\s*(.*)$"
        match = re.search(pattern, text, flags=re.IGNORECASE | re.MULTILINE)
        if match is None:
            return None
        remainder = match.group(1).strip()
        if remainder == "":
            return ""
        # If the remainder appears to be the beginning of another known label
        # (e.g., line-wrapped "Serial" for "Serial Numbering"), treat as empty
        remainder_upper = remainder.upper()
        for other_label in KNOWN_LABELS:
            if other_label.lower() == label.lower():
                continue
            first_word = other_label.split()[0].upper()
            if remainder_upper.startswith(first_word):
                return ""
        return remainder

    def extract_calibres(table_text: str, frn: str | None) -> list[str]:
        if frn is None:
            return []
        # Match lines like: "128418 - 2 9MM LUGER 32 143 Prohibited ..."
        # Capture calibre between the sequence number and the first numeric field thereafter
        pattern = rf"^\s*{re.escape(frn)}\s*-\s*\d+\s+(?P<calibre>.+?)\s+\d{{1,4}}(?:\s+\d{{1,4}})?\b"
        matches = re.finditer(pattern, table_text, flags=re.MULTILINE)
        calibres: list[str] = []
        for m in matches:
            calibre = m.group("calibre").strip()
            # Clean typical trailing punctuation/artifacts
            calibre = re.sub(r"\s{2,}", " ", calibre)
            calibres.append(calibre)
        # De-duplicate preserving order
        seen = set()
        unique_calibres: list[str] = []
        for c in calibres:
            if c not in seen:
                seen.add(c)
                unique_calibres.append(c)
        return unique_calibres

    def warn_if_missing(label: str, value) -> None:
        is_missing = value is None or (isinstance(value, str) and value.strip() == "")
        if is_missing:
            print(f"\033[93mWARNING: Missing {label}\033[0m")

    print("-" * 100)

    guns = []

    for frn, pages in frn_groups.items():
        combined_text = "\n".join(page_text for _, page_text in pages)
        manufacturer = extract_value(combined_text, "Manufacturer")
        make = extract_value(combined_text, "Make")
        model = extract_value(combined_text, "Model")
        action = extract_value(combined_text, "Action")
        legal_class = extract_value(combined_text, "Legal Classification")
        country = extract_value(combined_text, "Country of Manufacturer")
        normalized_country = country.upper() if country else ""
        country_code = countries.get(normalized_country, "Unknown")
        frn_type = extract_value(combined_text, "Type")

        manufacturer = make or manufacturer

        if country_code == "Unknown" and country != "":
            print(f"\033[93mWARNING: Unknown country code for '{country}'\033[0m")

        header = f"FRN: {frn}" if frn is not None else "FRN not found"

        warn_if_missing("FRN", frn)
        warn_if_missing("Type", frn_type)
        warn_if_missing("Manufacturer", manufacturer)
        warn_if_missing("Model", model)
        warn_if_missing("Action", action)
        warn_if_missing("Legal Classification", legal_class)
        warn_if_missing("Country of Manufacturer", country)

        calibres = set()
        for calibre in extract_calibres(combined_text, frn):
            calibre = calibre.replace("N/A", "").strip()
            calibre = calibre.split("/")
            for c in calibre:
                c = c.strip().replace(" X", "")
                if c == "" or c == "GAS" or c == "BB" or c == "ARROW":
                    continue
                calibres.add(c)

        gun = {
            "frn": frn,
            "type": frn_type,
            "manufacturer": manufacturer,
            "model": model,
            "action": action,
            "legal_class": legal_class,
            "country_code": country_code,
            "calibres": list(calibres),
            "pages": [page_idx for page_idx, _ in pages],
        }

        if frn == None:
            print(f"\033[93mWARNING: FRN is None\033[0m")
            continue

        guns.append(gun)

    with open("guns.json", "w", encoding="utf-8") as f:
        json.dump(guns, f, ensure_ascii=False, indent=2)

    # Also write to guns.jsonl
    with open("guns.jsonl", "w", encoding="utf-8") as f_jsonl:
        for gun in guns:
            f_jsonl.write(json.dumps(gun, ensure_ascii=False) + "\n")

    # Get all unique manufacturers from the generated guns list
    manufacturers = sorted(set(gun["manufacturer"] for gun in guns if gun.get("manufacturer")))
    
    with open("manufacturers.json", "w", encoding="utf-8") as mf:
        json.dump(manufacturers, mf, ensure_ascii=False, indent=2)

    # Get all unique calibres from the generated guns list
    calibres_set = set()
    for gun in guns:
        for calibre in gun.get("calibres", []):
            calibres_set.add(calibre)
    calibres = sorted(calibres_set)
    with open("calibres.json", "w", encoding="utf-8") as cf:
        json.dump(calibres, cf, ensure_ascii=False, indent=2)

    print(f"Printed {len(page_texts)} pages")