import type TileEffect from "#models/tile/effect"

export const TILE_EFFECTS = [
	{
		name: "Negative",
		hpMultiplier: 1.0,
		rarity: "legendary",
		applicableTo: undefined,
	},
	{
		name: "Shiny",
		hpMultiplier: 1.0,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Hot",
		hpMultiplier: 1.0,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Cold",
		hpMultiplier: 1.0,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Wet",
		hpMultiplier: 1.0,
		rarity: "uncommon",
		applicableTo: undefined,
	},
] as const satisfies TileEffect[]

type TileEffectName = (typeof TILE_EFFECTS)[number]["name"]
export type { TileEffectName as default }

export const TILE_EFFECTS_BY_NAME = Object.fromEntries(
	TILE_EFFECTS.map((effect) => [effect.name, effect]),
) as Record<TileEffectName, TileEffect>
