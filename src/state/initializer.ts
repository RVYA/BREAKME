import { signGameState } from "#state/integrity"
import ChunkGenerator from "#systems/generation/chunk-generator"

import type GameState from "#types/game-state"
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
	const numericSeed = murmur3_32(baseSeed)
	const chunkGenerator = new ChunkGenerator(numericSeed)
	const initialChunk = chunkGenerator.generate(0, createdAt)

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
		currentChunk: initialChunk,
		pendingActions: [],
	}

	return signGameState(state, options.secretKey ?? baseSeed)
}

export type { CreateInitialStateOptions }
