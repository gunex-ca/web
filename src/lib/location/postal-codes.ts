export type PostalCodeEntry = {
  country: string;
  postalCode: string;
  city: string;
  province: string;
  provinceCode: string;
  latitude: number | null;
  longitude: number | null;
};

// Check if we're in a Node.js environment
const isNodeEnvironment =
  typeof process !== "undefined" && process.versions?.node;

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
  if (!isNodeEnvironment) {
    // In Edge Runtime or browser, return empty array
    // This is a fallback that allows the code to run but without postal code data
    console.warn("Postal code lookup not available in Edge Runtime");
    return [];
  }

  try {
    // Dynamic import to avoid bundling Node.js modules in Edge Runtime
    const fs = require("node:fs");
    const path = require("node:path");
    const DATA_FILE = path.join(process.cwd(), "CA_full.txt");

    const file = fs.readFileSync(DATA_FILE, "utf8");
    const lines = file.split("\n").filter(Boolean);
    return lines
      .map(parseLine)
      .filter((entry): entry is PostalCodeEntry => !!entry);
  } catch (error) {
    console.warn("Failed to load postal codes:", error);
    return [];
  }
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
  if (!isNodeEnvironment) {
    console.warn("City lookup not available in Edge Runtime");
    return [];
  }

  try {
    const fs = require("node:fs");
    const path = require("node:path");
    const DATA_FILE = path.join(process.cwd(), "CA_full.txt");

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
  } catch (error) {
    console.warn("Failed to load cities:", error);
    return [];
  }
}

// Lazy initialization to avoid loading data at module import time
let allObj: Record<string, PostalCodeEntry> | null = null;

function initializePostalCodes(): Record<string, PostalCodeEntry> {
  if (allObj !== null) {
    return allObj;
  }

  const all = getAllPostalCodes();
  allObj = Object.fromEntries(
    all.flatMap((entry) => {
      const norm = entry.postalCode.replace(/\s+/g, "").toUpperCase();
      const prefix = norm.slice(0, 3);
      // Map both the full code and the 3-letter prefix to the entry
      return [
        [norm, entry],
        [prefix, entry],
      ];
    }),
  );

  return allObj;
}

export function findPostalCode(code: string): PostalCodeEntry | undefined {
  const postalCodes = initializePostalCodes();
  const norm = code.replace(/\s+/g, "").toUpperCase();
  return postalCodes[norm] ?? postalCodes[norm.slice(0, 3)];
}
