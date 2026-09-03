import { loadOrInitializeState } from "#state/manager"
import type GameState from "#types/game-state"

type EngineOptions = {
	username: string
	userId?: string
	statePath?: string
	token?: string
}

export default class Engine {
	#options: EngineOptions
	#state?: GameState
	#isInitialRun = false

	constructor(options: EngineOptions) {
		this.#options = options
	}

	get state(): GameState | undefined {
		return this.#state
	}

	get isInitialRun(): boolean {
		return this.#isInitialRun
	}

	async init(): Promise<GameState> {
		const result = await loadOrInitializeState(
			{
				username: this.#options.username,
				uuid: this.#options.userId,
			},
			this.#options.statePath,
		)
		this.#state = result.state
		this.#isInitialRun = result.isInitialRun
		return this.#state
	}
}

export type { EngineOptions }
