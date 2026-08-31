import type { TILE_VARIANTS } from "#const/tiles/variants"
import type { TileShapeName } from "#models/tile/shape"
import type RarityLabel from "../rarity"

export type TileVariantName = (typeof TILE_VARIANTS)[number]["name"]

type TileVariant = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileVariant as default }
