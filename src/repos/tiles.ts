import type TileEffectName from "#const/tiles/effects"
import { TILE_EFFECTS_BY_NAME } from "#const/tiles/effects"
import type TileShapeName from "#const/tiles/shapes"
import { TILE_SHAPES_BY_NAME } from "#const/tiles/shapes"
import type TileVariantName from "#const/tiles/variants"
import { TILE_VARIANTS_BY_NAME } from "#const/tiles/variants"
import type TileEffect from "#models/tile/effect"
import type TileShape from "#models/tile/shape"
import type TileVariant from "#models/tile/variant"

export function getTileShapeFrom(name: TileShapeName): TileShape {
	return TILE_SHAPES_BY_NAME[name]
}

export function getTileVariantFrom(name?: TileVariantName): TileVariant | undefined {
	if (!name) return undefined
	else return TILE_VARIANTS_BY_NAME[name]
}

export function getTileEffectFrom(name?: TileEffectName): TileEffect | undefined {
	if (!name) return undefined
	else return TILE_EFFECTS_BY_NAME[name]
}
