import type { TILE_EFFECTS } from "#data/tiles/effects"
import type RarityLabel from "#types/rarity"
import type { TileShapeName } from "./shape"

export type TileEffectName = (typeof TILE_EFFECTS)[number]["name"]

type TileEffect = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileEffect as default }
