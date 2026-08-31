import type GameState from "#models/game-state"
import type { CreateInitialStateOptions } from "./initializer"
import { createInitialGameState } from "./initializer"
import { verifyGameState } from "./integrity"
import { DEFAULT_STATE_FILE, doesStateExist, loadState } from "./store"

type RunResult = {
	state: GameState
	isInitialRun: boolean
	isValid?: boolean
}

export async function loadOrInitializeState(
	options: CreateInitialStateOptions,
	filePath: string = DEFAULT_STATE_FILE,
): Promise<RunResult> {
	const exists = await doesStateExist(filePath)

	if (exists) {
		const state = await loadState(filePath)
		if (state) {
			const isValid = verifyGameState(state, options.secretKey ?? state.player.identity.baseSeed)
			return { state, isInitialRun: false, isValid }
		}
	}

	const state = createInitialGameState(options)
	return { state, isInitialRun: true, isValid: true }
}

export type { RunResult }
