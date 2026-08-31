import type { TILE_SHAPES } from "#const/tiles/shapes"
import type RarityLabel from "../rarity"

export type TileShapeName = (typeof TILE_SHAPES)[number]["name"]

type TileShape = {
	name: string
	baseHp: number
	rarity: RarityLabel
}
export type { TileShape as default }
