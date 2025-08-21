const getGuns = () => {
  try {
    const fs = require("node:fs");
    const path = require("node:path");
    const DATA_FILE = path.join(process.cwd(), "frt/guns.json");

    const file = fs.readFileSync(DATA_FILE, "utf8");
    const data = JSON.parse(file);

    return data as Gun[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

type Gun = {
  frn: string;
  type: string;
  manufacturer: string;
  model: string;
  action: string;
  legal_class: string;
  country_code: string;
  calibres: string[];
  pages: number[];
};

export const guns = getGuns();

export const getCalibres = (manufacturer: string, model: string) => {
  return guns
    .filter((g) => g.manufacturer === manufacturer && g.model === model)
    .map((c) => ({ label: c, value: c }));
};

export const manufacturers = [...new Set(guns.map((g) => g.manufacturer))];
export const calibers = [...new Set(guns.flatMap((g) => g.calibres))];
export const actions = [...new Set(guns.map((g) => g.action))];
export const legalClasses = [...new Set(guns.map((g) => g.legal_class))];
export const countries = [...new Set(guns.map((g) => g.country_code))];
export const types = [...new Set(guns.map((g) => g.type))];
export const models = [...new Set(guns.map((g) => g.model))];
