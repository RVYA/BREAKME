import { TILE_SHAPES_BY_RARITY } from "#data/tiles/shapes"
import EntityGenerator from "#systems/entity-generator"
import type { TileShapeName } from "#types/tile/shape"

export default class ShapeGenerator extends EntityGenerator<TileShapeName> {
	constructor(seed: number, key: string) {
		super(seed, key, TILE_SHAPES_BY_RARITY)
	}
}
