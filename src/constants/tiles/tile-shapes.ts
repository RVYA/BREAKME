import type TileShape from "#models/tile/tile-shape"

export const TILE_SHAPES = [
	{
		name: "Hidden",
		baseHp: 999_999_999,
		rarity: "common",
	},
	{
		name: "Base",
		baseHp: 4,
		rarity: "common",
	},
] as const satisfies TileShape[]

type TileShapeName = (typeof TILE_SHAPES)[number]["name"]
export type { TileShapeName as default }

export const TILE_SHAPES_BY_NAME = Object.fromEntries(TILE_SHAPES.map((shape) => [shape.name, shape])) as Record<
	TileShapeName,
	TileShape
>
