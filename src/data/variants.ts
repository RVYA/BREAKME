import type RarityLabel from "#types/rarity"
import type { TileVariant, TileVariantName } from "#types/tile"

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

export const TILE_VARIANTS_BY_NAME = Object.fromEntries(
	TILE_VARIANTS.map((variant) => [variant.name, variant]),
) as Record<TileVariantName, TileVariant>

export const TILE_VARIANTS_BY_RARITY = TILE_VARIANTS.reduce(
	(acc, item) => {
		;(acc[item.rarity] ??= []).push(item.name)
		return acc
	},
	{} as Record<RarityLabel, TileVariantName[]>,
)
