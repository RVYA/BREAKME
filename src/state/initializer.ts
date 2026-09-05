import { COLLECTIBLES_BY_RARITY } from "#data/collectibles"
import { signGameState } from "#state/integrity"
import ChunkGenerator from "#systems/generation/chunk-generator"
import type { CollectiblePool } from "#types/collectible"
import type GameState from "#types/game-state"
import murmur3_32 from "#utils/murmur3-32"

type CreateInitialStateOptions = {
	username: string
	uuid?: string
	timestamp?: string
	secretKey?: string
}

export function createInitialCollectiblePool(): CollectiblePool {
	const pool: CollectiblePool = {}
	for (const [rarity, items] of Object.entries(COLLECTIBLES_BY_RARITY)) {
		if (items && items.length > 0) {
			pool[rarity as keyof CollectiblePool] = [...items]
		}
	}
	return pool
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
				mostDamage: 0,
			},
			inventory: {
				collectibles: [],
			},
		},
		currentChunk: initialChunk,
		collectiblePool: createInitialCollectiblePool(),
		pendingActions: [],
	}

	return signGameState(state, options.secretKey ?? baseSeed)
}

export type { CreateInitialStateOptions }
