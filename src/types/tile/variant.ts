import type { TILE_VARIANTS } from "#data/tiles/variants"
import type RarityLabel from "#types/rarity"
import type { TileShapeName } from "./shape"

export type TileVariantName = (typeof TILE_VARIANTS)[number]["name"]

type TileVariant = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileVariant as default }
