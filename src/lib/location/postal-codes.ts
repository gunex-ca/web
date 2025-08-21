import fs from "node:fs";
import path from "node:path";

export type PostalCodeEntry = {
  country: string;
  postalCode: string;
  city: string;
  province: string;
  provinceCode: string;
  latitude: number | null;
  longitude: number | null;
};

const DATA_FILE = path.join(process.cwd(), "CA_full.txt");

function parseLine(line: string): PostalCodeEntry | null {
  // CA\tT0A 0A0\tAbee\tAlberta\tAB\t\t\t\t54.1958\t-113.1506\t6
  const parts = line.split("\t");
  if (parts.length < 11) return null;
  const [country, postalCode, city, province, provinceCode] = parts;

  const lat = parts[9];
  const lon = parts[10];

  return {
    country: country ?? "",
    postalCode: postalCode ?? "",
    city: city ?? "",
    province: province ?? "",
    provinceCode: provinceCode ?? "",
    latitude: lat ? Number.parseFloat(lat) : null,
    longitude: lon ? Number.parseFloat(lon) : null,
  };
}

function getAllPostalCodes(): PostalCodeEntry[] {
  const file = fs.readFileSync(DATA_FILE, "utf8");
  const lines = file.split("\n").filter(Boolean);
  return lines
    .map(parseLine)
    .filter((entry): entry is PostalCodeEntry => !!entry);
}

export type Province = {
  name: string;
  code: string;
};

export function getProvinces(): Province[] {
  return [
    { name: "Alberta", code: "AB" },
    { name: "British Columbia", code: "BC" },
    { name: "Manitoba", code: "MB" },
    { name: "New Brunswick", code: "NB" },
    { name: "Newfoundland and Labrador", code: "NL" },
    { name: "Northwest Territories", code: "NT" },
    { name: "Nova Scotia", code: "NS" },
    { name: "Ncunavut", code: "NU" },
    { name: "Ontario", code: "ON" },
    { name: "Prince Edward Island", code: "PE" },
    { name: "Quebec", code: "QC" },
    { name: "Saskatchewan", code: "SK" },
    { name: "Yukon", code: "YT" },
  ];
}

export type City = {
  name: string;
  province: string;
  provinceCode: string;
};

export function getAllCities(): City[] {
  const file = fs.readFileSync(DATA_FILE, "utf8");
  const lines = file.split("\n").filter(Boolean);
  const citySet = new Set<string>();
  for (const line of lines) {
    const entry = parseLine(line);
    if (entry?.city && entry?.province && entry?.provinceCode) {
      const key = `${entry.city}|${entry.province}|${entry.provinceCode}`;
      citySet.add(key);
    }
  }
  return Array.from(citySet)
    .map((key) => {
      const [name, province, provinceCode] = key.split("|");
      return {
        name: name ?? "",
        province: province ?? "",
        provinceCode: provinceCode ?? "",
      };
    })
    .filter((city) => city.name && city.province && city.provinceCode);
}

const all = getAllPostalCodes();
const allObj: Record<string, PostalCodeEntry> = Object.fromEntries(
  all.flatMap((entry) => {
    const norm = entry.postalCode.replace(/\s+/g, "").toUpperCase();
    const prefix = norm.slice(0, 3);
    // Map both the full code and the 3-letter prefix to the entry
    return [
      [norm, entry],
      [prefix, entry],
    ];
  })
);

export function findPostalCode(code: string): PostalCodeEntry | undefined {
  const norm = code.replace(/\s+/g, "").toUpperCase();
  return allObj[norm] ?? allObj[norm.slice(0, 3)];
}
