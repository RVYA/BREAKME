import { TILE_SHAPES_BY_NAME, TILE_SHAPES_BY_RARITY } from "#data/tiles/shapes"
import EntityGenerator from "#systems/entity-generator"
import type { TileShapeName } from "#types/tile/shape"

export type ShapeContext = {
	chunkIndex?: number
	tileIndex?: number
}

export default class ShapeGenerator extends EntityGenerator<TileShapeName, ShapeContext> {
	constructor(seed: number, key: string) {
		super(seed, key, TILE_SHAPES_BY_RARITY, undefined, (shapeName, context) => {
			const shape = TILE_SHAPES_BY_NAME[shapeName]
			if (!shape?.spawnCondition) return true
			const chunkIndex = context?.chunkIndex ?? 0
			const tileIndex = context?.tileIndex ?? 0
			if (shape.spawnCondition.minChunkIndex !== undefined && chunkIndex < shape.spawnCondition.minChunkIndex) {
				return false
			}
			if (shape.spawnCondition.minTileIndex !== undefined && tileIndex < shape.spawnCondition.minTileIndex) {
				return false
			}
			return true
		})
	}
}
