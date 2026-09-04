import { signGameState } from "#state/integrity"
import { evaluateActivityUpdate } from "#systems/damage/activity-tracker"
import { calculateBaseDamage, calculateFinalDamage } from "#systems/damage/damage-calculator"
import ChunkGenerator from "#systems/generation/chunk-generator"
import type GameState from "#types/game-state"
import type Tile from "#types/tile/tile"
import murmur3_32 from "#utils/murmur3-32"

type DamageTurnResult = {
	damageDealt: number
	tilesBroken: number
	chunksCompleted: number
	brokenTiles: Tile[]
	actionsProcessed: number
}

export default class DamageSystem {
	processTurn(state: GameState, secretKey?: string): DamageTurnResult {
		const pendingActions = state.pendingActions
		if (!pendingActions || pendingActions.length === 0) {
			return {
				damageDealt: 0,
				tilesBroken: 0,
				chunksCompleted: 0,
				brokenTiles: [],
				actionsProcessed: 0,
			}
		}

		const eventTimestamps = pendingActions.map((a) => a.timestamp)
		state.player.activity = evaluateActivityUpdate(state.player.activity, eventTimestamps, 0)

		let totalDamage = 0
		let tilesBroken = 0
		let chunksCompleted = 0
		const brokenTiles: Tile[] = []
		const actionsProcessed = pendingActions.length

		const numericSeed = murmur3_32(state.player.identity.baseSeed)
		const chunkGenerator = new ChunkGenerator(numericSeed)

		for (const action of pendingActions) {
			const baseDamage = calculateBaseDamage(action.type)
			let remainingDamage = calculateFinalDamage(baseDamage, state.player.activity.currentStreak)
			totalDamage = Math.round((totalDamage + remainingDamage) * 100) / 100

			while (remainingDamage > 0) {
				let currentTileIndex = state.player.progress.tileIndex
				let currentChunk = state.currentChunk

				if (currentTileIndex >= currentChunk.tiles.length) {
					currentChunk.isCleared = true
					state.player.progress.chunkIndex += 1
					state.player.progress.tileIndex = 0
					currentTileIndex = 0
					chunksCompleted += 1
					state.currentChunk = chunkGenerator.generate(state.player.progress.chunkIndex)
					currentChunk = state.currentChunk
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
					tilesBroken += 1
					brokenTiles.push(tile)
					state.player.progress.tileIndex += 1

					if (state.player.progress.tileIndex >= currentChunk.tiles.length) {
						currentChunk.isCleared = true
						state.player.progress.chunkIndex += 1
						state.player.progress.tileIndex = 0
						chunksCompleted += 1
						state.currentChunk = chunkGenerator.generate(state.player.progress.chunkIndex)
					}
				}
			}
		}

		state.player.activity.mostDamage = Math.max(state.player.activity.mostDamage, totalDamage)
		state.pendingActions = []

		signGameState(state, secretKey ?? state.player.identity.baseSeed)

		return {
			damageDealt: totalDamage,
			tilesBroken,
			chunksCompleted,
			brokenTiles,
			actionsProcessed,
		}
	}
}

export type { DamageTurnResult }
