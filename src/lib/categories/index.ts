import { z } from "zod";

// Category/property field DSL + Zod validation builder

export type SelectOption = { value: string; label: string };

export type BaseField = {
  id: string;
  label: string;
  required?: boolean;
};

export type TextField = BaseField & {
  type: "text";
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
};

export type NumberField = BaseField & {
  type: "number";
  min?: number;
  max?: number;
};

export type BooleanField = BaseField & {
  type: "boolean";
};

export type SelectField = BaseField & {
  type: "select" | "multiselect";
  options?: SelectOption[];
  // Dependent select: options depend on another field's value
  dependsOnFieldId?: string;
  optionsByParent?: Record<string, SelectOption[]>;
};

export type PropertyField =
  | TextField
  | NumberField
  | BooleanField
  | SelectField;

export type PropertySchemaSpec = {
  fields: PropertyField[];
};

function buildFieldSchema(field: PropertyField): z.ZodTypeAny {
  switch (field.type) {
    case "text": {
      let s = z.string();
      if (typeof field.minLength === "number") s = s.min(field.minLength);
      if (typeof field.maxLength === "number") s = s.max(field.maxLength);
      if (field.pattern) s = s.regex(field.pattern);
      return field.required ? s : s.optional();
    }
    case "number": {
      let s = z.number({
        invalid_type_error: `${field.label} must be a number`,
      });
      if (typeof field.min === "number") s = s.min(field.min);
      if (typeof field.max === "number") s = s.max(field.max);
      return field.required ? s : s.optional();
    }
    case "boolean": {
      const s = z.boolean();
      return field.required ? s : s.optional();
    }
    case "select":
    case "multiselect": {
      // Validate allowed options at runtime to keep this fully data-driven
      const allowed = new Set((field.options ?? []).map((o) => o.value));

      const baseString = z
        .string()
        .refine((v) => (allowed.size === 0 ? true : allowed.has(v)), {
          message: `${field.label} has an invalid value`,
        });

      const s = field.type === "multiselect" ? z.array(baseString) : baseString;
      return field.required ? s : s.optional();
    }
    default: {
      // Exhaustive check to aid maintainability
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
}

export function buildPropertiesZod(
  spec: PropertySchemaSpec
): z.ZodEffects<z.ZodObject<Record<string, z.ZodTypeAny>>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const f of spec.fields) {
    shape[f.id] = buildFieldSchema(f);
  }

  // Cross-field validation for dependent selects
  return z.object(shape).superRefine((data, ctx) => {
    for (const field of spec.fields) {
      if (
        (field.type === "select" || field.type === "multiselect") &&
        field.dependsOnFieldId
      ) {
        const parentValue = data[field.dependsOnFieldId];
        const currentValue = data[field.id];

        if (currentValue === undefined) continue;

        const optionsByParent = field.optionsByParent ?? {};
        const optionsForParent = Array.isArray(optionsByParent[parentValue])
          ? optionsByParent[parentValue]
          : [];
        const allowed = new Set(optionsForParent.map((o) => o.value));

        if (field.type === "select") {
          if (
            typeof currentValue === "string" &&
            allowed.size > 0 &&
            !allowed.has(currentValue)
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field.id],
              message: `${field.label} is not valid for selected ${field.dependsOnFieldId}`,
            });
          }
        } else {
          if (Array.isArray(currentValue) && allowed.size > 0) {
            for (const v of currentValue) {
              if (!allowed.has(v)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  path: [field.id],
                  message: `${field.label} contains an invalid option for selected ${field.dependsOnFieldId}`,
                });
                break;
              }
            }
          }
        }
      }
    }
  });
}

type SubcategoryDef = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  properties: PropertySchemaSpec;
};

type CategoryDef = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  subcategories: Record<string, SubcategoryDef>;
};

type CategoriesDef = Record<string, CategoryDef>;

export const CATEGORIES = {
  FIREARMS: {
    id: "firearms",
    name: "Firearms",
    description: "Firearms",
    slug: "firearms",
    subcategories: {
      RIFLES: {
        id: "rifles",
        name: "Rifles",
        description: "Rifles",
        slug: "rifles",

        properties: {
          fields: [
            {
              id: "manufacturer",
              label: "Manufacturer",
              type: "select",
              required: true,
              options: [
                { value: "remington", label: "Remington" },
                { value: "ruger", label: "Ruger" },
                { value: "sako", label: "Sako" },
              ],
            },
            {
              id: "model",
              label: "Model",
              type: "select",
              required: true,
              dependsOnFieldId: "manufacturer",
              optionsByParent: {
                remington: [
                  { value: "700", label: "700" },
                  { value: "870", label: "870" },
                ],
                ruger: [
                  { value: "10_22", label: "10/22" },
                  { value: "american", label: "American" },
                ],
                sako: [
                  { value: "s20", label: "S20" },
                  { value: "85", label: "85" },
                ],
              },
            },
            {
              id: "caliber",
              label: "Caliber",
              type: "select",
              required: true,
              options: [
                { value: "223_rem", label: ".223 Rem" },
                { value: "308_win", label: ".308 Win" },
                { value: "65_cm", label: "6.5 Creedmoor" },
              ],
            },
            {
              id: "action",
              label: "Action",
              type: "select",
              required: true,
              options: [
                { value: "bolt", label: "Bolt" },
                { value: "semi_auto", label: "Semi-auto" },
                { value: "pump", label: "Pump" },
                { value: "lever", label: "Lever" },
              ],
            },
            {
              id: "barrel_length_in",
              label: "Barrel length (in)",
              type: "number",
              min: 1,
              max: 48,
              required: false,
            },
          ],
        },
      },
    },
  },
} as const satisfies CategoriesDef;

// Compiled Zod schemas per category/subcategory for validating listing.properties
export const CATEGORY_PROPERTY_SCHEMAS = {
  firearms: {
    rifles: buildPropertiesZod(
      CATEGORIES.FIREARMS.subcategories.RIFLES.properties
    ),
  },
} as const;

export type CategorySlug = keyof typeof CATEGORY_PROPERTY_SCHEMAS; // e.g. "firearms"

export function validateCategoryProperties(options: {
  category: CategorySlug;
  subcategory: string;
  data: unknown;
}) {
  const { category, subcategory, data } = options;
  const categorySchemas = CATEGORY_PROPERTY_SCHEMAS[category];
  const schema = (categorySchemas as Record<string, z.ZodSchema | undefined>)[
    subcategory
  ];
  if (!schema) {
    return { success: true as const, data };
  }
  const parsed = schema.safeParse(data);
  return parsed.success
    ? { success: true as const, data: parsed.data }
    : { success: false as const, issues: parsed.error.issues };
}
