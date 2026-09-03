import GitHubEventProvider from "#input/github"
import type EventProvider from "#input/provider"
import { loadOrInitializeState } from "#state/manager"
import type ActionEvent from "#types/action-event"
import type GameState from "#types/game-state"

type EngineOptions = {
	username: string
	userId?: string
	statePath?: string
	token?: string
	provider?: EventProvider
}

export default class Engine {
	#options: EngineOptions
	#state?: GameState
	#isInitialRun = false
	#provider: EventProvider

	constructor(options: EngineOptions) {
		this.#options = options
		this.#provider = options.provider ?? new GitHubEventProvider()
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

	async fetchEvents(): Promise<ActionEvent[]> {
		if (!this.#state) {
			throw new Error("Engine must be initialized before fetching events. Call init() first.")
		}

		const mode = this.#isInitialRun ? "init" : "cron"
		const since = this.#isInitialRun ? undefined : this.#state.player.activity.lastActiveDate || undefined

		const events = await this.#provider.fetchEvents({
			username: this.#options.username,
			token: this.#options.token,
			mode,
			since,
		})

		this.#state.pendingActions.push(...events)
		return events
	}
}

export type { EngineOptions }
