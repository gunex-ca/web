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
    // Core listing identifiers
    { name: "id", type: "string" },
    { name: "public_id", type: "string" },

    // Category classification
    { name: "category", type: "string", facet: true },
    { name: "sub_category", type: "string", facet: true },

    // Seller information
    { name: "seller_id", type: "string", facet: true, optional: true },
    { name: "seller_rating", type: "float", optional: true },
    { name: "seller_reviews", type: "int64", optional: true },
    { name: "views", type: "int64" },
    { name: "favorites", type: "int64" },

    // Content fields
    { name: "title", type: "string" },
    { name: "description_text", type: "string" },

    // Pricing
    { name: "price", type: "float" },

    // Location data
    { name: "location", type: "geopoint", optional: true },
    { name: "province", type: "string", facet: true, optional: true },
    { name: "city", type: "string", facet: true, optional: true },
    { name: "postal_code", type: "string", facet: true, optional: true },

    // Listing metadata
    { name: "status", type: "string", facet: true },
    { name: "display_ordering", type: "int64" },
    { name: "created_at", type: "int64" },
    { name: "updated_at", type: "int64" },

    // Images
    { name: "image_count", type: "int32", optional: true },
    { name: "has_images", type: "bool", facet: true },

    // External platform data
    { name: "external_platform", type: "string", facet: true, optional: true },
    { name: "external_url", type: "string", optional: true },

    // Category-specific properties for firearms
    { name: "condition", type: "string", facet: true, optional: true },
    { name: "caliber", type: "string", facet: true, optional: true },
    { name: "manufacturer", type: "string", facet: true, optional: true },
    { name: "model", type: "string", facet: true, optional: true },
    { name: "action", type: "string", facet: true, optional: true },
    { name: "classification", type: "string", facet: true, optional: true },
    { name: "handed", type: "string", facet: true, optional: true },

    // Category-specific properties for bows
    { name: "bow_type", type: "string", facet: true, optional: true },
    { name: "draw_weight", type: "string", facet: true, optional: true },
    { name: "draw_length", type: "string", facet: true, optional: true },

    // Category-specific properties for ammunition
    { name: "ammo_type", type: "string", facet: true, optional: true },
    { name: "grain_weight", type: "string", facet: true, optional: true },
    { name: "bullet_type", type: "string", facet: true, optional: true },
    { name: "case_type", type: "string", facet: true, optional: true },

    // Generic properties for other categories
    { name: "brand", type: "string", facet: true, optional: true },
    { name: "size", type: "string", facet: true, optional: true },
    { name: "color", type: "string", facet: true, optional: true },
    { name: "material", type: "string", facet: true, optional: true },
  ],
};

export type ListingV1 = {
  // Core listing identifiers
  id: string;
  public_id: string;

  // Category classification
  category: string;
  sub_category: string;

  // Seller information
  seller_id?: string;
  seller_rating?: number;
  seller_reviews?: number;
  views: number;
  favorites: number;

  // Content fields
  title: string;
  description_text: string;

  // Pricing
  price: number;

  // Location data
  location?: [number, number]; // [lat, lng]
  province?: string;
  city?: string;
  postal_code?: string;

  // Listing metadata
  status: string;
  display_ordering: number;
  created_at: number;
  updated_at: number;

  // Images
  image_count?: number;
  has_images: boolean;

  // External platform data
  external_platform?: string;
  external_url?: string;

  // Category-specific properties for firearms
  condition?: string;
  caliber?: string;
  manufacturer?: string;
  model?: string;
  action?: string;
  classification?: string;
  handed?: string;

  // Category-specific properties for bows
  bow_type?: string;
  draw_weight?: string;
  draw_length?: string;

  // Category-specific properties for ammunition
  ammo_type?: string;
  grain_weight?: string;
  bullet_type?: string;
  case_type?: string;

  // Generic properties for other categories
  brand?: string;
  size?: string;
  color?: string;
  material?: string;
};

export const schemas = [frtV1, listingV1];
