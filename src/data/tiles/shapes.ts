import type RarityLabel from "#types/rarity"
import type TileShape from "#types/tile/shape"
import type { TileShapeName } from "#types/tile/shape"

export const TILE_SHAPES = [
	{
		name: "Base",
		baseHp: 4,
		rarity: "common",
	},
	{
		name: "Chipped",
		baseHp: 3,
		rarity: "common",
	},
	{
		name: "Half",
		baseHp: 2,
		rarity: "common",
	},
	{
		name: "Blob",
		baseHp: 5,
		rarity: "common",
	},
	{
		name: "Biscuit",
		baseHp: 4,
		rarity: "common",
	},
	{
		name: "Bread",
		baseHp: 6,
		rarity: "uncommon",
		spawnCondition: {
			minTileIndex: 16,
		},
	},
	{
		name: "Donut",
		baseHp: 5,
		rarity: "uncommon",
		spawnCondition: {
			minTileIndex: 24,
		},
	},
	{
		name: "Tulip",
		baseHp: 6,
		rarity: "uncommon",
		spawnCondition: {
			minTileIndex: 32,
		},
	},
	{
		name: "Water",
		baseHp: 7,
		rarity: "uncommon",
		spawnCondition: {
			minTileIndex: 40,
		},
	},
	{
		name: "Tree",
		baseHp: 8,
		rarity: "uncommon",
		spawnCondition: {
			minTileIndex: 48,
		},
	},
	{
		name: "Shield",
		baseHp: 12,
		rarity: "rare",
		spawnCondition: {
			minTileIndex: 56,
		},
	},
	{
		name: "Mountain",
		baseHp: 14,
		rarity: "rare",
		spawnCondition: {
			minTileIndex: 64,
		},
	},
	{
		name: "Jagged",
		baseHp: 10,
		rarity: "rare",
		spawnCondition: {
			minTileIndex: 72,
		},
	},
	{
		name: "Floral",
		baseHp: 11,
		rarity: "rare",
		spawnCondition: {
			minTileIndex: 80,
		},
	},
	{
		name: "Butterfly",
		baseHp: 9,
		rarity: "rare",
		spawnCondition: {
			minTileIndex: 88,
		},
	},
	{
		name: "Umbrella",
		baseHp: 16,
		rarity: "epic",
		spawnCondition: {
			minTileIndex: 96,
		},
	},
	{
		name: "Spark",
		baseHp: 18,
		rarity: "epic",
		spawnCondition: {
			minTileIndex: 104,
		},
	},
	{
		name: "Gem",
		baseHp: 20,
		rarity: "epic",
		spawnCondition: {
			minTileIndex: 112,
		},
	},
	{
		name: "Sapphire",
		baseHp: 25,
		rarity: "legendary",
		spawnCondition: {
			minTileIndex: 120,
		},
	},
	{
		name: "Sun",
		baseHp: 30,
		rarity: "legendary",
		spawnCondition: {
			minTileIndex: 124,
		},
	},
] as const satisfies TileShape[]

export const TILE_SHAPES_BY_NAME = Object.fromEntries(TILE_SHAPES.map((shape) => [shape.name, shape])) as Record<
	TileShapeName,
	TileShape
>

export const TILE_SHAPES_BY_RARITY = TILE_SHAPES.reduce(
	(acc, item) => {
		;(acc[item.rarity] ??= []).push(item.name)
		return acc
	},
	{} as Record<RarityLabel, TileShapeName[]>,
)
