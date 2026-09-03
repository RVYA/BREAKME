import type { TILE_EFFECTS } from "#data/effects"
import type { TILE_SHAPES } from "#data/shapes"
import type { TILE_VARIANTS } from "#data/variants"
import type RarityLabel from "#types/rarity"

export type TileShapeName = (typeof TILE_SHAPES)[number]["name"]
export type TileVariantName = (typeof TILE_VARIANTS)[number]["name"]
export type TileEffectName = (typeof TILE_EFFECTS)[number]["name"]

export type TileShape = {
	name: string
	baseHp: number
	rarity: RarityLabel
}

export type TileVariant = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type TileEffect = {
	name: string
	hpMultiplier: number
	rarity: RarityLabel
	applicableTo?: TileShapeName[]
}

export type Tile = {
	index: number
	shape: TileShapeName
	variant?: TileVariantName
	effect?: TileEffectName
	maxHp: number
	currentHp: number
	isBroken: boolean
}

export type Chunk = {
	index: number
	tiles: Tile[]
	createdAt: string
	isCleared?: boolean
}
