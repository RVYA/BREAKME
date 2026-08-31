import { TILE_EFFECTS_BY_NAME } from "#const/tiles/effects.js"
import { TILE_SHAPES_BY_NAME } from "#const/tiles/shapes.js"
import { TILE_VARIANTS_BY_NAME } from "#const/tiles/variants.js"
import type TileEffect from "#models/tile/effect.js"
import type { TileEffectName } from "#models/tile/effect.js"
import type TileShape from "#models/tile/shape.js"
import type { TileShapeName } from "#models/tile/shape.js"
import type TileVariant from "#models/tile/variant.js"
import type { TileVariantName } from "#models/tile/variant.js"

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
