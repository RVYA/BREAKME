import type { ActionType } from "#types/action-event"
import type RarityLabel from "#types/rarity"
import type { TileEffectName } from "#types/tile/effect"
import type { TileShapeName } from "#types/tile/shape"
import type { TileVariantName } from "#types/tile/variant"

type SpawnCondition = {
	applicableShapes?: TileShapeName[]
	applicableVariants?: TileVariantName[]
	applicableEffects?: TileEffectName[]
	minTileIndex?: number
	minChunkIndex?: number
	gitActionTypes?: ActionType[]
}

type Collectible = {
	name: string
	description: string
	rarity: RarityLabel
	spawnCondition?: SpawnCondition
}

export type { Collectible as default, SpawnCondition }
