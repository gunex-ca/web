import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

const frtV1: CollectionCreateSchema = {
  name: "frt_v1",
  fields: [
    { name: "id", type: "string" },
    { name: "frn", type: "string" },
    { name: "type", type: "string", facet: true },
    { name: "legal_class", type: "string", facet: true },
    { name: "manufacturer", type: "string", facet: true },
    { name: "country", type: "string", facet: true },
    { name: "country_code", type: "string", facet: true },
    { name: "model", type: "string", facet: true },
    { name: "action", type: "string", facet: true },
    { name: "calibres", type: "string[]", optional: true },
    { name: "pages", type: "int32[]", facet: true },
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

const listingV1: CollectionCreateSchema = {
  name: "listing_v1",
  enable_nested_fields: true,
  fields: [
    { name: "id", type: "string" },
    { name: "public_id", type: "string" },
    { name: "category", type: "string", facet: true },
    { name: "sub_category", type: "string", facet: true },

    { name: "seller_id", type: "string", facet: true },
    { name: "seller_username", type: "string", facet: true },
    { name: "seller_email", type: "string", facet: true },
    { name: "seller_phone", type: "string", facet: true },

    { name: "title", type: "string" },
    { name: "description_text", type: "string" },

    { name: "price", type: "float" },

    { name: "location", type: "geopoint" },
    { name: "province", type: "string", facet: true },
    { name: "municipality", type: "string", facet: true },

    { name: "status", type: "string", facet: true },

    { name: "created_at", type: "int32" },
    { name: "updated_at", type: "int32" },

    // firearms
    { name: "condition", type: "string", facet: true, optional: true },

    { name: "caliber", type: "string", facet: true, optional: true },
    { name: "manufacturer", type: "string", facet: true, optional: true },
    { name: "model", type: "string", facet: true, optional: true },
    { name: "country", type: "string", facet: true, optional: true },
    { name: "country_code", type: "string", facet: true, optional: true },
    { name: "action", type: "string", facet: true, optional: true },
    { name: "classification", type: "string", facet: true, optional: true },

    { name: "bow_type", type: "string", facet: true, optional: true },
    { name: "headed", type: "string", facet: true, optional: true },
  ],
};

export type ListingV1 = {
  id: string;
  public_id: string;
  category: string;
  sub_category: string;
  title: string;
  description_text: string;
  price: number;

  province: string;
  municipality: string;
};

export const schemas = [frtV1];
