import type TileShapeName from "#const/tiles/shapes"
import { TILE_SHAPES_BY_NAME } from "#const/tiles/shapes"
import type TileVariantName from "#const/tiles/variants"
import { TILE_VARIANTS_BY_NAME } from "#const/tiles/variants"
import type TileShape from "#models/tile/shape"
import type TileVariant from "#models/tile/variant"

export function getTileShapeFrom(name: TileShapeName): TileShape {
	return TILE_SHAPES_BY_NAME[name]
}

export function getTileVariantFrom(name?: TileVariantName): TileVariant | undefined {
	if (!name) return undefined
	else return TILE_VARIANTS_BY_NAME[name]
}
