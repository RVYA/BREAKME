import type TileVariant from "#models/tile/variant"

export const TILE_VARIANTS = [
	{
		name: "Dirt",
		hpMultiplier: 1.1,
		rarity: "common",
		applicableTo: undefined,
	},
	{
		name: "Gold",
		hpMultiplier: 1.5,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Broken",
		hpMultiplier: 0.75,
		rarity: "uncommon",
		applicableTo: undefined,
	},
] as const satisfies TileVariant[]

type TileVariantName = (typeof TILE_VARIANTS)[number]["name"]
export type { TileVariantName as default }

export const TILE_VARIANTS_BY_NAME = Object.fromEntries(
	TILE_VARIANTS.map((variant) => [variant.name, variant]),
) as Record<TileVariantName, TileVariant>
