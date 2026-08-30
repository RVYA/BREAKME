import type TileShapeName from "../constants/tiles/tile-shapes"
import { TILE_SHAPES_BY_NAME } from "../constants/tiles/tile-shapes"
import type TileShape from "../models/tile/tile-shape"

export function getTileShapeFrom(name: TileShapeName): TileShape {
	return TILE_SHAPES_BY_NAME[name]
}
