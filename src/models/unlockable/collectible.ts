import type { COLLECTIBLES } from "#const/unlockables/collectibles"
import type { ActionType } from "#models/action-item"
import type RarityLabel from "../rarity"
import type { TileEffectName } from "../tile/effect"
import type { TileShapeName } from "../tile/shape"
import type { TileVariantName } from "../tile/variant"

export type CollectibleName = (typeof COLLECTIBLES)[number]["name"]

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
