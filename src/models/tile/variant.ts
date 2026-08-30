import type TileShapeName from "#const/tiles/shapes.js"
import type RarityLabel from "../rarity"

type TileVariant = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileVariant as default }
