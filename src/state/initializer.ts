import { signGameState } from "#state/integrity"

import type { GameState } from "#types/state"
import murmur3_32 from "#utils/murmur3-32"

type CreateInitialStateOptions = {
	username: string
	uuid?: string
	timestamp?: string
	secretKey?: string
}

export function createInitialGameState(options: CreateInitialStateOptions): GameState {
	const createdAt = options.timestamp ?? new Date().toISOString()

	const id = options.uuid ?? options.username
	const baseSeed = murmur3_32(`${id}_${createdAt}`).toString(16)

	const state: GameState = {
		hash: "",
		player: {
			identity: {
				username: options.username,
				baseSeed,
				createdAt,
			},
			progress: {
				chunkIndex: 0,
				tileIndex: 0,
				totalTilesBroken: 0,
			},
			activity: {
				currentStreak: 0,
				highestStreak: 0,
				lastActiveDate: "",
				mostCommits: 0,
				mostDamage: 0,
			},
			inventory: {
				collectibles: [],
				achievements: [],
			},
		},
		currentChunk: {
			index: 0,
			tiles: [],
			createdAt,
			isCleared: false,
		},
		pendingActions: [],
	}

	return signGameState(state, options.secretKey ?? baseSeed)
}

export type { CreateInitialStateOptions }
