import slugify from "slugify";

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
  parentId: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  children: Subcategory[];
};

function makeCategory(name: string, subcategoryNames: string[]): Category {
  const slug = slugify(name, { lower: true });
  const id = slug;
  const children: Subcategory[] = subcategoryNames.map((childName) => {
    const childSlug = slugify(childName, { lower: true });
    return {
      id: `${slug}:${childSlug}`,
      name: childName,
      slug: childSlug,
      parentId: id,
    };
  });
  return { id, name, slug, children };
}

export const categories: Category[] = [
  makeCategory("Firearms", [
    "Rifles",
    "Shotguns",
    "Handguns",
    "Muzzleloaders",
    "Replicas or Deactivated",
    "Flame Thrower",
    "Blank Gun/Starter Pistol",
    "Flare Gun",
  ]),
  makeCategory("Firearm Components, Accessories, & Tools", [
    "Barrels",
    "Conversion Kits (caliber change)",
    "Choke Tubes",
    "Muzzle Brakes & Flash Supp.",
    "Stocks & Grips",
    "Magazines & Clips",
    "Iron/Open Sights",
    "Slings",
    "Swivels",
    "Bipods",
    "Firearm Care",
    "Tools",
    "Miscellaneous",
  ]),
  makeCategory("Shooting & Range Gear", [
    "Holsters",
    "Range Bags",
    "Shooting Rests",
    "Tac Belts & Belt Attachments",
    "Tac Vests & Vest Attachments",
    "Body Armour",
    "Chronographs",
    "Helmets",
    "Ear Protection",
    "Eye Protection",
    "Miscellaneous",
  ]),
  makeCategory("Airgun & Airsoft", [
    "Air Pistols",
    "Air Rifles",
    "Paintball Guns",
    "Paintball Accessories",
    "Accessories",
    "Pellets & BBs (projectiles)",
    "Miscellaneous",
  ]),
  makeCategory("Archery", [
    "Bows",
    "Bow Maintenance",
    "Arrows & Broadheads",
    "Bow Accessories",
    "Miscellaneous",
  ]),
  makeCategory("Optics", [
    "Rifle Scopes",
    "Handgun Scopes",
    "Crossbow Scopes",
    "Red Dot / Reflex Sight",
    "Laser Sights",
    "Spotting Scopes",
    "Binoculars/Monoculars",
    "Range Finders",
    "Rings/Bases/Mounts",
    "Miscellaneous",
  ]),
  makeCategory("Ammunition", [
    "Live Ammo",
    "Blanks",
    "Dummy Rounds",
    "Miscellaneous",
  ]),
  makeCategory("Reloading", [
    "Lead Casting Tools",
    "Bullets & Brass",
    "Smokeless Powder",
    "Primers",
    "Shotshell Reloading",
    "Presses",
    "Dies",
    "Powder Handling & Scales",
    "Tumblers",
    "Tools & Accessories",
    "Miscellaneous",
  ]),
  makeCategory("Muzzleloading Supplies", [
    "Flints",
    "Powder & Caps",
    "Sabots & Lead Balls",
    "Cleaning",
    "Accessories",
    "Miscellaneous",
  ]),
  makeCategory("Targets", [
    "Paper Targets",
    "Gongs",
    "Tannerite",
    "Throwers (skeet)",
    "Clays",
    "Archery Targets",
    "Moving / Motorized Targets",
    "Miscellaneous",
  ]),
  makeCategory("Cases & Storage", [
    "Hard Cases",
    "Soft Cases",
    "Racks",
    "Safes or Cabinets",
    "Locks",
    "Ammo Cans",
    "Accessories",
    "Miscellaneous",
  ]),
  makeCategory("Hunting", [
    "Decoys",
    "Game Calls",
    "Trail Cameras",
    "Treestands",
    "Blinds",
    "Packs",
    "Clothing",
    "Ghillie Suits",
    "Trapping Supplies",
    "Fishing Rods / Reels / Tackle",
    "Taxidermy (mounts/hides/antlers)",
    "Miscellaneous",
  ]),
  makeCategory("Blades", [
    "Knives & Tools",
    "Bayonets",
    "Swords",
    "Sharpeners",
    "Sheaths",
    "Miscellaneous",
  ]),
  makeCategory("Books", [
    "Reloading Manuals",
    "Firearm Literature",
    "Hunting Literature",
    "Military Literature",
  ]),
  makeCategory("Services", [
    "Taxidermy",
    "Gun Smithing",
    "Firearms Training",
    "Gun Shows/Events",
    "Hunting Outfitters / Guides",
  ]),
];

// Fast lookup by URL slug
export const CATEGORY: Record<string, Category> = Object.fromEntries(
  categories.map((cat) => [cat.slug, cat])
);

export type { Category as ListingCategory, Subcategory as ListingSubcategory };
