import type { COLLECTIBLES } from "#data/collectibles"
import type { ActionType } from "#types/action-event"
import type RarityLabel from "#types/rarity"
import type { TileEffectName } from "#types/tile/effect"
import type { TileShapeName } from "#types/tile/shape"
import type { TileVariantName } from "#types/tile/variant"

export type CollectibleName = keyof typeof COLLECTIBLES

export type CollectiblePool = Partial<Record<RarityLabel, CollectibleName[]>>

type SpawnCondition = {
	applicableShapes?: TileShapeName[]
	applicableVariants?: TileVariantName[]
	applicableEffects?: TileEffectName[]
	minTileIndex?: number
	minChunkIndex?: number
	gitActionTypes?: ActionType[]
}

type Collectible = {
	symbol: string
	description: string
	rarity: RarityLabel
	spawnCondition?: SpawnCondition
}

export type { Collectible as default, Collectible, SpawnCondition }

