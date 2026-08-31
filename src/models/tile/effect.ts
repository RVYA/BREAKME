import type { TILE_EFFECTS } from "#const/tiles/effects"
import type { TileShapeName } from "#models/tile/shape"
import type RarityLabel from "../rarity"

export type TileEffectName = (typeof TILE_EFFECTS)[number]["name"]

type TileEffect = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileEffect as default }
