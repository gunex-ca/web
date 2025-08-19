export type Subcategory = {
  id: string;
  name: string;
  parent: { id: string; name: string };
};

export type Category = {
  id: string;
  name: string;
  children: Subcategory[];
};

type CategoryInput = {
  id: string;
  name: string;
};

function makeCategory(
  input: CategoryInput,
  subcategories: CategoryInput[]
): Category {
  const id = input.id;
  const category = { id, name: input.name };
  const children: Subcategory[] = subcategories.map((child) => {
    return { id: child.id, name: child.name, parent: category };
  });
  return { ...category, children };
}

export const categories: Category[] = [
  makeCategory({ name: "Firearms", id: "firearms" }, [
    { name: "Rifles", id: "firearms-rifles" },
    { name: "Shotguns", id: "firearms-shotguns" },
    { name: "Handguns", id: "firearms-handguns" },
    { name: "Muzzleloaders", id: "firearms-muzzleloaders" },
    { name: "Replicas or Deactivated", id: "firearms-replicas-or-deactivated" },
    { name: "Flame Thrower", id: "firearms-flame-thrower" },
    {
      name: "Blank Gun/Starter Pistol",
      id: "firearms-blank-gun-starter-pistol",
    },
    { name: "Flare Gun", id: "firearms-flare-gun" },
  ]),
  makeCategory(
    {
      name: "Firearm Components, Accessories, & Tools",
      id: "firearm-components-accessories-tools",
    },
    [
      { name: "Barrels", id: "firearm-components-accessories-tools-barrels" },
      {
        name: "Conversion Kits (caliber change)",
        id: "firearm-components-accessories-tools-conversion-kits-caliber-change",
      },
      {
        name: "Choke Tubes",
        id: "firearm-components-accessories-tools-choke-tubes",
      },
      {
        name: "Muzzle Brakes & Flash Supp.",
        id: "firearm-components-accessories-tools-muzzle-brakes-flash-supp",
      },
      {
        name: "Stocks & Grips",
        id: "firearm-components-accessories-tools-stocks-grips",
      },
      {
        name: "Magazines & Clips",
        id: "firearm-components-accessories-tools-magazines-clips",
      },
      {
        name: "Iron/Open Sights",
        id: "firearm-components-accessories-tools-iron-open-sights",
      },
      { name: "Slings", id: "firearm-components-accessories-tools-slings" },
      { name: "Swivels", id: "firearm-components-accessories-tools-swivels" },
      { name: "Bipods", id: "firearm-components-accessories-tools-bipods" },
      {
        name: "Firearm Care",
        id: "firearm-components-accessories-tools-firearm-care",
      },
      { name: "Tools", id: "firearm-components-accessories-tools-tools" },
      {
        name: "Miscellaneous",
        id: "firearm-components-accessories-tools-miscellaneous",
      },
    ]
  ),
  makeCategory({ name: "Shooting & Range Gear", id: "shooting-range-gear" }, [
    { name: "Holsters", id: "shooting-range-gear-holsters" },
    { name: "Range Bags", id: "shooting-range-gear-range-bags" },
    { name: "Shooting Rests", id: "shooting-range-gear-shooting-rests" },
    {
      name: "Tac Belts & Belt Attachments",
      id: "shooting-range-gear-tac-belts-belt-attachments",
    },
    {
      name: "Tac Vests & Vest Attachments",
      id: "shooting-range-gear-tac-vests-vest-attachments",
    },
    { name: "Body Armour", id: "shooting-range-gear-body-armour" },
    { name: "Chronographs", id: "shooting-range-gear-chronographs" },
    { name: "Helmets", id: "shooting-range-gear-helmets" },
    { name: "Ear Protection", id: "shooting-range-gear-ear-protection" },
    { name: "Eye Protection", id: "shooting-range-gear-eye-protection" },
    { name: "Miscellaneous", id: "shooting-range-gear-miscellaneous" },
  ]),
  makeCategory({ name: "Airgun & Airsoft", id: "airgun-airsoft" }, [
    { name: "Air Pistols", id: "airgun-airsoft-air-pistols" },
    { name: "Air Rifles", id: "airgun-airsoft-air-rifles" },
    { name: "Paintball Guns", id: "airgun-airsoft-paintball-guns" },
    {
      name: "Paintball Accessories",
      id: "airgun-airsoft-paintball-accessories",
    },
    { name: "Accessories", id: "airgun-airsoft-accessories" },
    {
      name: "Pellets & BBs (projectiles)",
      id: "airgun-airsoft-pellets-bb-projectiles",
    },
    { name: "Miscellaneous", id: "airgun-airsoft-miscellaneous" },
  ]),
  makeCategory({ name: "Archery", id: "archery" }, [
    { name: "Bows", id: "archery-bows" },
    { name: "Bow Maintenance", id: "archery-bow-maintenance" },
    { name: "Arrows & Broadheads", id: "archery-arrows-broadheads" },
    { name: "Bow Accessories", id: "archery-bow-accessories" },
    { name: "Miscellaneous", id: "archery-miscellaneous" },
  ]),
  makeCategory({ name: "Optics", id: "optics" }, [
    { name: "Rifle Scopes", id: "optics-rifle-scopes" },
    { name: "Handgun Scopes", id: "optics-handgun-scopes" },
    { name: "Crossbow Scopes", id: "optics-crossbow-scopes" },
    { name: "Red Dot / Reflex Sight", id: "optics-red-dot-reflex-sight" },
    { name: "Laser Sights", id: "optics-laser-sights" },
    { name: "Spotting Scopes", id: "optics-spotting-scopes" },
    { name: "Binoculars/Monoculars", id: "optics-binoculars-monoculars" },
    { name: "Range Finders", id: "optics-range-finders" },
    { name: "Rings/Bases/Mounts", id: "optics-rings-bases-mounts" },
    { name: "Miscellaneous", id: "optics-miscellaneous" },
  ]),
  makeCategory({ name: "Ammunition", id: "ammunition" }, [
    { name: "Live Ammo", id: "ammunition-live-ammo" },
    { name: "Blanks", id: "ammunition-blanks" },
    { name: "Dummy Rounds", id: "ammunition-dummy-rounds" },
    { name: "Miscellaneous", id: "ammunition-miscellaneous" },
  ]),
  makeCategory({ name: "Reloading", id: "reloading" }, [
    { name: "Lead Casting Tools", id: "reloading-lead-casting-tools" },
    { name: "Bullets & Brass", id: "reloading-bullets-brass" },
    { name: "Smokeless Powder", id: "reloading-smokeless-powder" },
    { name: "Primers", id: "reloading-primers" },
    { name: "Shotshell Reloading", id: "reloading-shotshell-reloading" },
    { name: "Presses", id: "reloading-presses" },
    { name: "Dies", id: "reloading-dies" },
    {
      name: "Powder Handling & Scales",
      id: "reloading-powder-handling-scales",
    },
    { name: "Tumblers", id: "reloading-tumblers" },
    { name: "Tools & Accessories", id: "reloading-tools-accessories" },
    { name: "Miscellaneous", id: "reloading-miscellaneous" },
  ]),
  makeCategory(
    { name: "Muzzleloading Supplies", id: "muzzleloading-supplies" },
    [
      { name: "Flints", id: "muzzleloading-flints" },
      { name: "Powder & Caps", id: "muzzleloading-powder-caps" },
      { name: "Sabots & Lead Balls", id: "muzzleloading-sabots-lead-balls" },
      { name: "Cleaning", id: "muzzleloading-cleaning" },
      { name: "Accessories", id: "muzzleloading-accessories" },
      { name: "Miscellaneous", id: "muzzleloading-miscellaneous" },
    ]
  ),
  makeCategory({ name: "Targets", id: "targets" }, [
    { name: "Paper Targets", id: "targets-paper-targets" },
    { name: "Gongs", id: "targets-gongs" },
    { name: "Tannerite", id: "targets-tannerite" },
    { name: "Throwers (skeet)", id: "targets-throwers-skeet" },
    { name: "Clays", id: "targets-clays" },
    { name: "Archery Targets", id: "targets-archery-targets" },
    {
      name: "Moving / Motorized Targets",
      id: "targets-moving-motorized-targets",
    },
    { name: "Miscellaneous", id: "targets-miscellaneous" },
  ]),
  makeCategory({ name: "Cases & Storage", id: "cases-storage" }, [
    { name: "Hard Cases", id: "cases-storage-hard-cases" },
    { name: "Soft Cases", id: "cases-storage-soft-cases" },
    { name: "Racks", id: "cases-storage-racks" },
    { name: "Safes or Cabinets", id: "cases-storage-safes-or-cabinets" },
    { name: "Locks", id: "cases-storage-locks" },
    { name: "Ammo Cans", id: "cases-storage-ammo-cans" },
    { name: "Accessories", id: "cases-storage-accessories" },
    { name: "Miscellaneous", id: "cases-storage-miscellaneous" },
  ]),
  makeCategory({ name: "Hunting", id: "hunting" }, [
    { name: "Decoys", id: "hunting-decoys" },
    { name: "Game Calls", id: "hunting-game-calls" },
    { name: "Trail Cameras", id: "hunting-trail-cameras" },
    { name: "Treestands", id: "hunting-treestands" },
    { name: "Blinds", id: "hunting-blinds" },
    { name: "Packs", id: "hunting-packs" },
    { name: "Clothing", id: "hunting-clothing" },
    { name: "Ghillie Suits", id: "hunting-ghillie-suits" },
    { name: "Trapping Supplies", id: "hunting-trapping-supplies" },
    {
      name: "Fishing Rods / Reels / Tackle",
      id: "hunting-fishing-rods-reels-tackle",
    },
    {
      name: "Taxidermy (mounts/hides/antlers)",
      id: "hunting-taxidermy-mounts-hides-antlers",
    },
    { name: "Miscellaneous", id: "hunting-miscellaneous" },
  ]),
  makeCategory({ name: "Blades", id: "blades" }, [
    { name: "Knives & Tools", id: "blades-knives-tools" },
    { name: "Bayonets", id: "blades-bayonets" },
    { name: "Swords", id: "blades-swords" },
    { name: "Sharpeners", id: "blades-sharpeners" },
    { name: "Sheaths", id: "blades-sheaths" },
    { name: "Miscellaneous", id: "blades-miscellaneous" },
  ]),
  makeCategory({ name: "Books", id: "books" }, [
    { name: "Reloading Manuals", id: "books-reloading-manuals" },
    { name: "Firearm Literature", id: "books-firearm-literature" },
    { name: "Hunting Literature", id: "books-hunting-literature" },
    { name: "Military Literature", id: "books-military-literature" },
  ]),
  makeCategory({ name: "Services", id: "services" }, [
    { name: "Taxidermy", id: "services-taxidermy" },
    { name: "Gun Smithing", id: "services-gun-smithing" },
    { name: "Firearms Training", id: "services-firearms-training" },
    { name: "Gun Shows/Events", id: "services-gun-shows-events" },
    {
      name: "Hunting Outfitters / Guides",
      id: "services-hunting-outfitters-guides",
    },
  ]),
];

// Fast lookup by URL slug
export const CATEGORY: Record<string, Category | Subcategory> =
  Object.fromEntries([
    ...categories.map((cat) => [cat.id, cat]),
    ...categories.flatMap((cat) =>
      cat.children.map((child) => [child.id, child])
    ),
  ]);

export type { Category as ListingCategory, Subcategory as ListingSubcategory };
