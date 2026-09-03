import type { ActionItem, ActionType } from "#types/action"
import type RarityLabel from "#types/rarity"
import type { GameState } from "#types/state"
import type { Tile, TileEffectName, TileShapeName, TileVariantName } from "#types/tile"

type EvaluationContext = {
	tile?: Tile
	action?: ActionItem
}

type AchievementCondition = (state: GameState, context?: EvaluationContext) => boolean

type Achievement = {
	name: string
	description: string
	conditions: readonly AchievementCondition[]
}

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

export type {
	Achievement,
	AchievementCondition,
	Collectible,
	Achievement as default,
	EvaluationContext,
	SpawnCondition,
}
