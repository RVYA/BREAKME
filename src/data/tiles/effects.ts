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
	{
		name: "Armored",
		hpMultiplier: 2.5,
		rarity: "epic",
		applicableTo: undefined,
	},
	{
		name: "Brittle",
		hpMultiplier: 0.5,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Chained",
		hpMultiplier: 1.75,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Barbed",
		hpMultiplier: 1.3,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Encased",
		hpMultiplier: 1.9,
		rarity: "epic",
		applicableTo: undefined,
	},
	{
		name: "Levitating",
		hpMultiplier: 1.1,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Stasis",
		hpMultiplier: 1.85,
		rarity: "epic",
		applicableTo: undefined,
	},
	{
		name: "Echo",
		hpMultiplier: 0.7,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Overcharged",
		hpMultiplier: 3.5,
		rarity: "legendary",
		applicableTo: undefined,
	},
	{
		name: "Vampiric",
		hpMultiplier: 1.45,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Blessed",
		hpMultiplier: 1.5,
		rarity: "legendary",
		applicableTo: undefined,
	},
	{
		name: "Volatile",
		hpMultiplier: 0.85,
		rarity: "rare",
		applicableTo: undefined,
	},
	{
		name: "Phase",
		hpMultiplier: 1.65,
		rarity: "epic",
		applicableTo: undefined,
	},
	{
		name: "Cursed",
		hpMultiplier: 1.35,
		rarity: "rare",
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
