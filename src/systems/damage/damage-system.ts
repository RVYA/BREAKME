import { signGameState } from "#state/integrity"
import { evaluateActivityUpdate } from "#systems/damage/activity-tracker"
import { calculateBaseDamage, calculateFinalDamage } from "#systems/damage/damage-calculator"
import GameSystem from "#systems/game-system"
import type { ActionType } from "#types/action-event"
import type GameState from "#types/game-state"
import type Tile from "#types/tile/tile"

export type TileBreakEvent = {
	tile: Tile
	chunkIndex: number
	tileIndex: number
	actionType: ActionType
}

export type ChunkClearedEvent = {
	chunkIndex: number
	overflowDamage: number
}

export type DamageEvent = TileBreakEvent | ChunkClearedEvent

export type DamageContext = {
	secretKey?: string
	overflowDamage?: number
	actionType?: ActionType
}

export default class DamageSystem extends GameSystem<DamageEvent, DamageContext> {
	protected processState(state: GameState, context?: DamageContext): DamageEvent[] {
		const events: DamageEvent[] = []
		let totalDamage = 0

		if (context?.overflowDamage && context.overflowDamage > 0) {
			let remainingDamage = context.overflowDamage
			const actionType = context.actionType ?? "commit"

			while (remainingDamage > 0) {
				const currentTileIndex = state.player.progress.tileIndex
				const currentChunk = state.currentChunk

				if (currentTileIndex >= currentChunk.tiles.length) {
					currentChunk.isCleared = true
					events.push({
						chunkIndex: state.player.progress.chunkIndex,
						overflowDamage: remainingDamage,
					})
					signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)
					return events
				}

				const tile = currentChunk.tiles[currentTileIndex]
				const hpBefore = tile.currentHp

				if (remainingDamage < hpBefore) {
					tile.applyDamage(remainingDamage)
					remainingDamage = 0
				} else {
					tile.applyDamage(hpBefore)
					remainingDamage = Math.round((remainingDamage - hpBefore) * 100) / 100
					state.player.progress.totalTilesBroken += 1

					const breakEvent: TileBreakEvent = {
						tile,
						chunkIndex: state.player.progress.chunkIndex,
						tileIndex: currentTileIndex,
						actionType,
					}
					events.push(breakEvent)
					state.player.progress.tileIndex += 1

					if (state.player.progress.tileIndex >= currentChunk.tiles.length) {
						currentChunk.isCleared = true
						events.push({
							chunkIndex: state.player.progress.chunkIndex,
							overflowDamage: remainingDamage,
						})
						signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)
						return events
					}
				}
			}
		}

		const pendingActions = state.pendingActions
		if (!pendingActions || pendingActions.length === 0) {
			signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)
			return events
		}

		const eventTimestamps = pendingActions.map((a) => a.timestamp)
		state.player.activity = evaluateActivityUpdate(state.player.activity, eventTimestamps, 0)

		while (state.pendingActions.length > 0) {
			const action = state.pendingActions[0]
			const baseDamage = calculateBaseDamage(action.type)
			let remainingDamage = calculateFinalDamage(baseDamage, state.player.activity.currentStreak)
			totalDamage = Math.round((totalDamage + remainingDamage) * 100) / 100

			while (remainingDamage > 0) {
				const currentTileIndex = state.player.progress.tileIndex
				const currentChunk = state.currentChunk

				if (currentTileIndex >= currentChunk.tiles.length) {
					currentChunk.isCleared = true
					state.pendingActions.shift()
					events.push({
						chunkIndex: state.player.progress.chunkIndex,
						overflowDamage: remainingDamage,
					})
					state.player.activity.mostDamage = Math.max(state.player.activity.mostDamage, totalDamage)
					signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)
					return events
				}

				const tile = currentChunk.tiles[currentTileIndex]
				const hpBefore = tile.currentHp

				if (remainingDamage < hpBefore) {
					tile.applyDamage(remainingDamage)
					remainingDamage = 0
				} else {
					tile.applyDamage(hpBefore)
					remainingDamage = Math.round((remainingDamage - hpBefore) * 100) / 100
					state.player.progress.totalTilesBroken += 1

					const breakEvent: TileBreakEvent = {
						tile,
						chunkIndex: state.player.progress.chunkIndex,
						tileIndex: currentTileIndex,
						actionType: action.type,
					}
					events.push(breakEvent)
					state.player.progress.tileIndex += 1

					if (state.player.progress.tileIndex >= currentChunk.tiles.length) {
						currentChunk.isCleared = true
						state.pendingActions.shift()
						events.push({
							chunkIndex: state.player.progress.chunkIndex,
							overflowDamage: remainingDamage,
						})
						state.player.activity.mostDamage = Math.max(state.player.activity.mostDamage, totalDamage)
						signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)
						return events
					}
				}
			}

			state.pendingActions.shift()
		}

		state.player.activity.mostDamage = Math.max(state.player.activity.mostDamage, totalDamage)
		signGameState(state, context?.secretKey ?? state.player.identity.baseSeed)

		return events
	}
}
