import type ActionEvent from "#types/action-event"
import type GameState from "#types/game-state"
import type Tile from "#types/tile/tile"

type EvaluationContext = {
	tile?: Tile
	action?: ActionEvent
}

type AchievementCondition = (state: GameState, context?: EvaluationContext) => boolean

type Achievement = {
	name: string
	description: string
	conditions: readonly AchievementCondition[]
}

export type { AchievementCondition, Achievement as default, EvaluationContext }
