import type { TILE_VARIANTS } from "#data/tiles/variants"
import type RarityLabel from "#types/rarity"
import type { TileShapeName } from "./shape"

export type TileVariantName = (typeof TILE_VARIANTS)[number]["name"]

export type VariantSpawnCondition = {
	applicableShapes?: TileShapeName[]
	minChunkIndex?: number
	minTileIndex?: number
}

type TileVariant = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
	spawnCondition?: VariantSpawnCondition
}

export type { TileVariant as default }
