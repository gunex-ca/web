import jsonGuns from "../../../frt/guns.json";

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

export const guns = jsonGuns as Gun[];

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
