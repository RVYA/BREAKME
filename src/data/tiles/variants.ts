import type RarityLabel from "#types/rarity"
import type TileVariant from "#types/tile/variant"
import type { TileVariantName } from "#types/tile/variant"

export const TILE_VARIANTS = [
	{
		name: "Dirt",
		hpMultiplier: 1.1,
		rarity: "common",
		applicableTo: undefined,
	},
	{
		name: "Wood",
		hpMultiplier: 1.2,
		rarity: "common",
		applicableTo: undefined,
	},
	{
		name: "Candy",
		hpMultiplier: 0.9,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 16,
		},
	},
	{
		name: "Broken",
		hpMultiplier: 0.75,
		rarity: "uncommon",
		applicableTo: undefined,
	},
	{
		name: "Zebra",
		hpMultiplier: 1.25,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 32,
		},
	},
	{
		name: "Gold",
		hpMultiplier: 1.5,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 48,
		},
	},
	{
		name: "Metal",
		hpMultiplier: 1.75,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 64,
		},
	},
	{
		name: "Sunburn",
		hpMultiplier: 2.0,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 96,
		},
	},
	{
		name: "Radiated",
		hpMultiplier: 2.2,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 104,
		},
	},
	{
		name: "BlackHole",
		hpMultiplier: 3.0,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 120,
		},
	},
	{
		name: "Moss",
		hpMultiplier: 1.15,
		rarity: "common",
		applicableTo: undefined,
	},
	{
		name: "Sandstone",
		hpMultiplier: 0.95,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 12,
		},
	},
	{
		name: "Copper",
		hpMultiplier: 1.3,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 28,
		},
	},
	{
		name: "Amethyst",
		hpMultiplier: 1.6,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 50,
		},
	},
	{
		name: "Glacier",
		hpMultiplier: 1.65,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 60,
		},
	},
	{
		name: "Obsidian",
		hpMultiplier: 1.8,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 75,
		},
	},
	{
		name: "Magma",
		hpMultiplier: 2.1,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 90,
		},
	},
	{
		name: "CyberNeon",
		hpMultiplier: 2.25,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 100,
		},
	},
	{
		name: "Plasma",
		hpMultiplier: 2.4,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 110,
		},
	},
	{
		name: "Holographic",
		hpMultiplier: 3.2,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 122,
		},
	},
	{
		name: "Supernova",
		hpMultiplier: 3.5,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 126,
		},
	},
	{
		name: "Blueprint",
		hpMultiplier: 1.1,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 24,
		},
	},
	{
		name: "Coral",
		hpMultiplier: 1.15,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 36,
		},
	},
	{
		name: "Terminal",
		hpMultiplier: 1.2,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 20,
		},
	},
	{
		name: "Amber",
		hpMultiplier: 1.25,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 30,
		},
	},
	{
		name: "RoseGold",
		hpMultiplier: 1.35,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 44,
		},
	},
	{
		name: "Jade",
		hpMultiplier: 1.55,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 52,
		},
	},
	{
		name: "Abyssal",
		hpMultiplier: 1.6,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 58,
		},
	},
	{
		name: "Circuit",
		hpMultiplier: 1.65,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 62,
		},
	},
	{
		name: "Quicksilver",
		hpMultiplier: 1.65,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 65,
		},
	},
	{
		name: "Aurora",
		hpMultiplier: 1.7,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 68,
		},
	},
	{
		name: "Ember",
		hpMultiplier: 1.7,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 72,
		},
	},
	{
		name: "Damascus",
		hpMultiplier: 1.75,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 78,
		},
	},
	{
		name: "Glitch",
		hpMultiplier: 1.75,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 70,
		},
	},
	{
		name: "Bismuth",
		hpMultiplier: 1.85,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 82,
		},
	},
	{
		name: "SolarFlare",
		hpMultiplier: 2.15,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 94,
		},
	},
	{
		name: "Toxic",
		hpMultiplier: 2.15,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 92,
		},
	},
	{
		name: "Vaporwave",
		hpMultiplier: 2.2,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 98,
		},
	},
	{
		name: "Nebula",
		hpMultiplier: 2.3,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 105,
		},
	},
	{
		name: "Mithril",
		hpMultiplier: 3.1,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 118,
		},
	},
	{
		name: "DarkMatter",
		hpMultiplier: 3.3,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 124,
		},
	},
	{
		name: "Terracotta",
		hpMultiplier: 1.15,
		rarity: "common",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 10,
		},
	},
	{
		name: "Sakura",
		hpMultiplier: 1.2,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 18,
		},
	},
	{
		name: "PolkaDot",
		hpMultiplier: 1.25,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 34,
		},
	},
	{
		name: "Camo",
		hpMultiplier: 1.3,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 40,
		},
	},
	{
		name: "Bandana",
		hpMultiplier: 1.35,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 46,
		},
	},
	{
		name: "Seigaiha",
		hpMultiplier: 1.4,
		rarity: "uncommon",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 48,
		},
	},
	{
		name: "Honeycomb",
		hpMultiplier: 1.5,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 54,
		},
	},
	{
		name: "Shibori",
		hpMultiplier: 1.55,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 56,
		},
	},
	{
		name: "Monstera",
		hpMultiplier: 1.6,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 66,
		},
	},
	{
		name: "Marble",
		hpMultiplier: 1.7,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 74,
		},
	},
	{
		name: "Tortoise",
		hpMultiplier: 1.75,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 80,
		},
	},
	{
		name: "Tartan",
		hpMultiplier: 1.8,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 84,
		},
	},
	{
		name: "Houndstooth",
		hpMultiplier: 1.85,
		rarity: "rare",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 88,
		},
	},
	{
		name: "Leopard",
		hpMultiplier: 2.1,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 95,
		},
	},
	{
		name: "Zellige",
		hpMultiplier: 2.25,
		rarity: "epic",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 102,
		},
	},
	{
		name: "Kintsugi",
		hpMultiplier: 3.25,
		rarity: "legendary",
		applicableTo: undefined,
		spawnCondition: {
			minTileIndex: 125,
		},
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
