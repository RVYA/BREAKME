import type TileShapeName from "#const/tiles/shapes.js"
import type RarityLabel from "../rarity"

type TileEffect = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type { TileEffect as default }
