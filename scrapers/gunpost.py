import requests
from bs4 import BeautifulSoup
from typing import TypedDict, Optional
import re
from datetime import datetime
import json


def get_gunpost_ads(url="https://www.gunpost.ca/ads", page=1):
    response = requests.get(f"{url}?page={page-1}")
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    ads = soup.find_all("div", class_="views-row")
    return ads


class GunpostAd(TypedDict):
    title: str
    url: str
    price: Optional[str]
    postal_code: Optional[str]
    description: Optional[str]
    date: Optional[datetime]


def extract_postal_code(location: Optional[str]) -> Optional[str]:
    """
    Extract a Canadian postal code (full or partial) from a location string.
    Returns the first match found, or None if no match.
    """
    if not location:
        return None

    patterns = [
        r"\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d\b",
        r"\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\b",
        r"\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]",
    ]
    for pattern in patterns:
        match = re.search(pattern, location)
        if match:
            return match.group(0).replace(" ", "")
    return None


def parse_post_date(date_text: str):
    """
    Parse a Gunpost date string into a datetime if possible, otherwise return None.
    Accepts formats like "Posted: 2024-06-18", "Posted: June 18, 2024", or "Aug 19, 2025 - 11:34 PM".
    """
    match = re.search(r"Posted:\s*(.+)", date_text)
    date_str = match.group(1).strip() if match else date_text

    # Try parsing as "Aug 19, 2025 - 11:34 PM" first
    for fmt in ("%b %d, %Y - %I:%M %p", "%Y-%m-%d", "%b %d, %Y"):
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue

    return None


key_map = {
    "bullet diameter": "caliber",
}

conditions_map = {
    "Excellent": "Excellent",
    "Good": "Good",
    "Fair": "Fair",
    "Poor": "Poor",
    "New": "New",
}

categories_map = {
    "OpticsRifle Scopes": "optics-rifle-scopes",
    "OpticsMiscellaneous": "optics-miscellaneous",
    "OpticsLaser Sights": "optics-laser-sights",
    "ServicesGun Shows/Events": "services-gun-shows-events",
    "OpticsRed Dot / Reflex Sight": "optics-red-dot-reflex-sight",
    "Airgun & AirsoftAir Rifles": "airgun-airsoft-air-pistols",
    "Firearm Components, Accessories, & ToolsIron/Open Sights": "firearm-components-accessories-tools-iron-open-sights",
    "FirearmsRifles": "firearms-rifles",
    "FirearmsShotguns": "firearms-shotguns",
    "FirearmsHandguns": "firearms-handguns",
    "BladesSwords": "blades-swords",
    "BladesKnives": "blades-knives",
    "BladesMachetes": "blades-machetes",
    "BladesSpears": "blades-spears",
    "BladesAxes": "blades-axes",
    "BladesPolearms": "blades-polearms",
    "BladesOther": "blades-other",
}

caliber = {
    "(multi-caliber gun)": "Multi-Caliber",
    "(other)": "Other",
    "10 ga": "10 GA",
    "10 mm auto": "10MM AUTO",
    "12 ga": "12 GA",
    "16 ga": "16 GA",
    "17 HMR": "17 HMR",
    "17 HM2 (MACH 2)": "17 HM2 (MACH 2)",
    "17 Hornet": "17 HORNET",
    "17 Rem. Fireball": "17 REM. FIREBALL",
    "17 WSM": "17 WSM",
    "20 ga": "20 GA",
    "204 Ruger": "204 RUGER",
    "21 Sharp": "21 SHARP",
    "218 Bee": "218 BEE",
    "22 Hornet": "22 HORNET",
    "22 LR": "22 LR",
    "22 Mag.": "22 MAG",
    "22 Win. Auto": "22 WIN. AUTO",
    "22-250": "22-250",
    "220 Swift": "220 SWIFT",
    "222 Rem.": "222 REM",
    "223 Rem.": "223 REM",
    "223 WSSM": "223 WSSM",
    "223 Wylde": "223 WYLDE",
    "224 Valkyrie": "224 VALKYRIE",
    "240 Wby. Mag.": "240 WBY MAG",
    "243 Win.": "243 WIN",
    "25 ACP": "25 ACP",
    "25 RF": "25 RF",
    "25-06": "25-06",
    "25-20 Win.": "25-20 WIN",
    "25-35 Win.": "25-35 WIN",
    "250 Sav./250-3000": "250 SAV/250-3000",
    "257 Roberts": "257 ROBERTS",
    "257 Wby. Mag.": "257 WBY MAG",
    "26 Nosler": "26 NOSLER",
    "260 Rem.": "260 REM",
    "264 Win. Mag.": "264 WIN MAG",
    "270 Gibbs": "270 GIBBS",
    "270 Wby. Mag.": "270 WBY MAG",
    "270 Win.": "270 WIN",
    "270 WSM": "270 WSM",
    "275 Rigby": "275 RIGBY",
    "28 ga": "28 GA",
    "28 Nosler": "28 NOSLER",
    "280 Rem.": "280 REM",
    "280 Ackley Improved": "280 ACKLEY IMPROVED",
    "284 Win.": "284 WIN",
    "30 Carbine": "30 CARBINE",
    "30 Nosler": "30 NOSLER",
    "30 Luger/7.65x21": "30 LUGER/7.65X21",
    "30-06": "30-06",
    "30-30 Win.": "30-30 WIN",
    "30-378 Wby. Mag.": "30-378 WBY MAG",
    "30-40 Krag": "30-40 KRAG",
    "300 AAC Blackout": "300 AAC BLACKOUT",
    "300 H&H Mag.": "300 H&H MAG",
    "300 PRC": "300 PRC",
    "300 RCM": "300 RCM",
    "300 RSAUM": "300 RSAUM",
    "300 RUM": "300 RUM",
    "300 Savage": "300 SAVAGE",
    "300 Wby. Mag.": "300 WBY MAG",
    "300 Win. Mag.": "300 WIN MAG",
    "300 WSM": "300 WSM",
    "303 Brit.": "303 BRIT",
    "303 Sav.": "303 SAV",
    "307 Win.": "307 WIN",
    "308 Marlin Express": "308 MARLIN EXPRESS",
    "308 Norma Mag.": "308 NORMA MAG",
    "308 Win./7.62x51": "308 WIN/7.62X51",
    "32 ACP": "32 ACP",
    "32 cal. muzzle loader": "32 CAL MUZZLE LOADER",
    "32 RF": "32 RF",
    "32 S&W long": "32 S&W LONG",
    "32 S&W short": "32 S&W SHORT",
    "32 Spl.": "32 SPL",
    "32-20": "32-20",
    "32-40": "32-40",
    "325 WSM": "325 WSM",
    "338 Fed.": "338 FED",
    "338 Lapua": "338 LAPUA",
    "338 Mar. Exp.": "338 MAR EXP",
    "338 RUM": "338 RUM",
    "338 Win. Mag.": "338 WIN MAG",
    "338-378 Wby. Mag.": "338-378 WBY MAG",
    "340 Wby. Mag.": "340 WBY MAG",
    "348 Win.": "348 WIN",
    "35 Rem.": "35 REM",
    "35 Whelen": "35 WHELEN",
    "350 Legend": "350 LEGEND",
    "350 Rem. Mag.": "350 REM MAG",
    "356 Win.": "356 WIN",
    "357 Mag.": "357 MAG",
    "357 Sig.": "357 SIG",
    "358 Nor. Mag.": "358 NOR MAG",
    "358 Win.": "358 WIN",
    "36 cal. muzzle loader": "36 CAL MUZZLE LOADER",
    "375 EnABELR": "375 ENABELR",
    "375 H&H Mag.": "375 H&H MAG",
    "375 Ruger": "375 RUGER",
    "375 RUM": "375 RUM",
    "375 Win.": "375 WIN",
    "38 LC": "38 LC",
    "38 RF": "38 RF",
    "38 S&W": "38 S&W",
    "38 Spl.": "38 SPL",
    "38 Super": "38 SUPER",
    "38-40 Win.": "38-40 WIN",
    "38-44 UMC": "38-44 UMC",
    "38-55 Win.": "38-55 WIN",
    "380 ACP": "380 ACP",
    "40 S&W": "40 S&W",
    "404 Jeffery": "404 JEFFERY",
    "41 LC": "41 LC",
    "41 Rem. Mag.": "41 REM MAG",
    "41 RF": "41 RF",
    "410 ga": "410 GA",
    "416 Barrett": "416 BARRETT",
    "416 Rem. Mag.": "416 REM MAG",
    "416 Rigby": "416 RIGBY",
    "416 Ruger": "416 RUGER",
    "416 Taylor": "416 TAYLOR",
    "416 Wby. Mag.": "416 WBY MAG",
    "44 Auto Mag.": "44 AUTO MAG",
    "44 cal. muzzle loader": "44 CAL MUZZLE LOADER",
    "44 Mag.": "44 MAG",
    "44 Russian": "44 RUSSIAN",
    "44 Spl.": "44 SPL",
    "44-40": "44-40",
    "444 Marlin": "444 MARLIN",
    "45 ACP": "45 ACP",
    "45 cal. muzzle loader": "45 CAL MUZZLE LOADER",
    "45 LC": "45 LC",
    "45-70 Govt.": "45-70 GOVT",
    "45-90 Sharps": "45-90 SHARPS",
    "45-120": "45-120",
    "450 Bushmaster": "450 BUSHMASTER",
    "450 Marlin": "450 MARLIN",
    "450 Nitro Express": "450 NITRO EXPRESS",
    "450 Rigby": "450 RIGBY",
    "454 Casull": "454 CASULL",
    "455 Eley": "455 ELEY",
    "455 Webley": "455 WEBLEY",
    "458 Lott": "458 LOTT",
    "458 Socom": "458 SOCOM",
    "458 Win. Mag.": "458 WIN MAG",
    "460 S&W": "460 S&W",
    "460 Wby. Mag.": "460 WBY MAG",
    "5.56 NATO/223 Rem.": "5.56 NATO/223 REM",
    "5.7x28mm": "5.7X28MM",
    "50 AE": "50 AE",
    "50 Beowulf": "50 BEOWULF",
    "50 BMG": "50 BMG",
    "50 cal. muzzle loader": "50 CAL MUZZLE LOADER",
    "50-70 Govt.": "50-70 GOVT",
    "50-90 Sharps": "50-90 SHARPS",
    "500 Nitro Express": "500 NITRO EXPRESS",
    "500 S&W Mag.": "500 S&W MAG",
    "54 cal. muzzle loader": "54 CAL MUZZLE LOADER",
    "58 cal. muzzle loader": "58 CAL MUZZLE LOADER",
    "6x45": "6X45",
    "6mm ARC": "6MM ARC",
    "6mm BR": "6MM BR",
    "6 mm Creedmoor": "6MM CREEDMOOR",
    "6 mm PPC": "6MM PPC",
    "6 mm Rem.": "6MM REM",
    "6.5 Creedmoor": "6.5 CREEDMOOR",
    "6.5 Grendel": "6.5 GRENDEL",
    "6.5 PRC": "6.5 PRC",
    "6.5 SAUM": "6.5 SAUM",
    "6.5-06": "6.5-06",
    "6.5x284": "6.5X284",
    "6.5x300 Wby. Mag.": "6.5X300 WBY MAG",
    "6.5x47": "6.5X47",
    "6.5x52 Carcano": "6.5X52 CARCANO",
    "6.5x54": "6.5X54",
    "6.5X55": "6.5X55",
    "6.8 SPC": "6.8 SPC",
    "6.8 Western": "6.8 WESTERN",
    "69 cal. muzzle loader": "69 CAL MUZZLE LOADER",
    "7x57 Mauser": "7X57 MAUSER",
    "7x65r": "7X65R",
    "7mm PRC": "7MM PRC",
    "7 mm Rem. Mag.": "7MM REM MAG",
    "7 mm RUM": "7MM RUM",
    "7 mm SAUM": "7MM SAUM",
    "7 mm STW": "7MM STW",
    "7 mm Wby. Mag.": "7MM WBY MAG",
    "7 mm WSM": "7MM WSM",
    "7 mm-08": "7MM-08",
    "7.5x55": "7.5X55",
    "7.62x25": "7.62X25",
    "7.62x39": "7.62X39",
    "7.62x54r": "7.62X54R",
    "7.63x25": "7.63X25",
    "8x56r": "8X56R",
    "8x68 S": "8X68 S",
    "8 mm Mauser (8x57)": "8MM MAUSER (8X57)",
    "8 mm Rem. Mag.": "8MM REM MAG",
    "8 mm-06": "8MM-06",
    "9x18 Ultra": "9X18 ULTRA",
    "9x57 Mauser": "9X57 MAUSER",
    "9 mm Luger": "9MM LUGER",
    "9 mm Makarov": "9MM MAKAROV",
    "9.3x62": "9.3X62",
    "9.3x64 Benneke": "9.3X64 BENNEKE",
    "9.3x72R": "9.3X72R",
}

def map_properties(properties: dict) -> tuple[str, dict]:
    category = ""
    properties_normalized = {}
    for key, value in properties.items():
        key = key.lower()
        key = key_map.get(key, key)

        if key == "category":
            category = categories_map.get(value, "")
            if not category:
                print(f"Unknown category: {value}")
            continue

        if key == "caliber":
            if value not in caliber:
                print(f"Unknown caliber: {value}")
            value = caliber.get(value, value)

        properties_normalized[key] = value

    return category, properties_normalized


if __name__ == "__main__":
    ads = get_gunpost_ads()
    for ad in ads:
        first_link = ad.find("a", href=True)
        
        if not (first_link and first_link['href'].startswith('/')):
            continue

        post_date = ad.find("span", class_="node__pubdate")
        if not post_date:
            print(f"Failed to find post date: {post_date} -- {first_link}")
            continue

        date = parse_post_date(post_date.text.strip())
        if isinstance(date, datetime):
            date = date.isoformat()

        if not date:
            print(f"Failed to parse date: {first_link} -- {post_date}")
            continue

        ad_url = f"https://www.gunpost.ca{first_link['href']}"
        response = requests.get(ad_url)
        ad_soup = BeautifulSoup(response.text, "html.parser")

        price_div = ad_soup.find("div", class_="price")
        price = price_div.text.strip()

        post_location = ad_soup.find("div", class_="post-location")
        location = post_location.text.strip().upper()
        postalcode = extract_postal_code(location)

        title_h1 = ad_soup.find("h1", class_="node__title")
        title = title_h1.text.strip() if title_h1 else ""

        username_div = ad_soup.find("div", class_="member-name")
        username = username_div.text.strip()

        description_div = ad_soup.find("div", class_="body")
        description = description_div.find("div", class_="field__item")

        properties = {}
        details = ad_soup.find_all("div", class_="firearm-details")
        # Parse firearm details into properties dictionary
        for detail in details:
            dl = detail.find("dl")
            if not dl:
                continue
            dt_tags = dl.find_all("dt")
            for dt in dt_tags:
                key = dt.get_text(strip=True)
                dd = dt.find_next_sibling("dd")
                if not dd:
                    continue
                # If dd contains a div.field__item-wrapper, extract its text, else use dd's text
                item_wrapper = dd.find("span", class_="field__item-wrapper")
                if item_wrapper:
                    value = item_wrapper.get_text(strip=True)
                else:
                    # Remove any <i> tags (like the angle-right icon)
                    for i_tag in dd.find_all("i"):
                        i_tag.decompose()
                    value = dd.get_text(strip=True)
                properties[key] = value

        category, properties_normalized = map_properties(properties)
        gunpost_ad: GunpostAd = {
            "externalId": ad_url,
            "username": username,
            "title": title,
            "url": ad_url,
            "price": price,
            "date": str(date),
            "postalCode": postalcode,
            "description": str(description),
            "properties": properties_normalized,
            "category": category,
        }

        print(json.dumps(
            gunpost_ad,
            indent=2,
            ensure_ascii=False,
        ))
        print("-"*100)