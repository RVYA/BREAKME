import type RarityLabel from "#types/rarity"
import type TileShape from "#types/tile/shape"
import type { TileShapeName } from "#types/tile/shape"

export const TILE_SHAPES = [
	/*{
		name: "Hidden",
		baseHp: 999_999_999,
		rarity: "common",
	},*/
	{
		name: "Base",
		baseHp: 4,
		rarity: "common",
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
