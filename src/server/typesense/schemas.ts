import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

const frtV1: CollectionCreateSchema = {
  name: "frt_v1",
  fields: [
    { name: "id", type: "string" },
    { name: "frn", type: "string" },
    { name: "type", type: "string" },
    { name: "legal_class", type: "string" },
    { name: "manufacturer", type: "string" },
    { name: "country", type: "string" },
    { name: "country_code", type: "string" },
    { name: "model", type: "string" },
    { name: "action", type: "string" },
    { name: "calibres", type: "string[]", optional: true },
    { name: "pages", type: "int32[]" },
    { name: "images", type: "string[]", optional: true },
  ],
};

export type FRTV1 = {
  id: string;
  frn: string;
  type: string;
  legal_class: string;
  manufacturer: string;
  model: string;
  country: string;
  action: string;
  country_code: string;
  calibres: string[];
  pages: number[];
  images: string[];
};

export const schemas = [frtV1];
