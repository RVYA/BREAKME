import { ACHIEVEMENTS } from "#const/unlockables/achievements"
import type ActionItem from "#models/action-item"
import type GameState from "#models/game-state"
import type Tile from "#models/tile/tile"

export type AchievementName = (typeof ACHIEVEMENTS)[number]["name"]

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

export type { AchievementCondition, Achievement as default, EvaluationContext }
