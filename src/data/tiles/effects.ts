import type RarityLabel from "#types/rarity"
import type TileEffect from "#types/tile/effect"
import type { TileEffectName } from "#types/tile/effect"

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

export const TILE_EFFECTS_BY_NAME = Object.fromEntries(TILE_EFFECTS.map((effect) => [effect.name, effect])) as Record<
	TileEffectName,
	TileEffect
>

export const TILE_EFFECTS_BY_RARITY = TILE_EFFECTS.reduce(
	(acc, item) => {
		;(acc[item.rarity] ??= []).push(item.name)
		return acc
	},
	{} as Record<RarityLabel, TileEffectName[]>,
)
