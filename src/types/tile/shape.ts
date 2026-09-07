import type { TILE_SHAPES } from "#data/tiles/shapes"
import type RarityLabel from "#types/rarity"

export type TileShapeName = (typeof TILE_SHAPES)[number]["name"]

export type ShapeSpawnCondition = {
	minChunkIndex?: number
	minTileIndex?: number
}

type TileShape = {
	name: string
	baseHp: number
	rarity: RarityLabel
	spawnCondition?: ShapeSpawnCondition
}

export type { TileShape as default }
