import GitHubEventProvider from "#input/github"
import type EventProvider from "#input/provider"
import { loadOrInitializeState } from "#state/manager"
import { saveState } from "#state/store"
import DropSystem, { type CollectibleDropEvent } from "#systems/collectibles/drop-system"
import DamageSystem, { type TileBreakEvent } from "#systems/damage/damage-system"
import ChunkGenerator from "#systems/generation/chunk-generator"
import type ActionEvent from "#types/action-event"
import type GameState from "#types/game-state"

type EngineOptions = {
	username: string
	userId?: string
	statePath?: string
	token?: string
	provider?: EventProvider
	damageSystem?: DamageSystem
	dropSystem?: DropSystem
}

type EngineTurnResult = {
	breakEvents: TileBreakEvent[]
	dropEvents: CollectibleDropEvent[]
	actionsProcessed: number
}

export default class Engine {
	#options: EngineOptions
	#state?: GameState
	#isInitialRun = false
	#provider: EventProvider
	#damageSystem: DamageSystem
	#dropSystem: DropSystem

	constructor(options: EngineOptions) {
		this.#options = options
		this.#provider = options.provider ?? new GitHubEventProvider()
		this.#damageSystem = options.damageSystem ?? new DamageSystem()
		this.#dropSystem = options.dropSystem ?? new DropSystem()
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

	processTurn(secretKey?: string): EngineTurnResult {
		if (!this.#state) {
			throw new Error("Engine must be initialized before processing a turn. Call init() first.")
		}

		const actionsProcessed = this.#state.pendingActions.length
		if (actionsProcessed === 0) {
			this.#damageSystem.process(this.#state, { secretKey })
			return {
				breakEvents: [],
				dropEvents: [],
				actionsProcessed: 0,
			}
		}

		const breakEvents: TileBreakEvent[] = []
		let overflowDamage = 0

		const numericSeed = Number.parseInt(this.#state.player.identity.baseSeed, 16) >>> 0
		const chunkGenerator = new ChunkGenerator(numericSeed)

		while (this.#state.pendingActions.length > 0 || overflowDamage > 0) {
			const rawEvents = this.#damageSystem.process(this.#state, { secretKey, overflowDamage })
			const events = Array.isArray(rawEvents) ? rawEvents : [rawEvents]
			overflowDamage = 0

			for (const event of events) {
				if ("tile" in event) {
					breakEvents.push(event)
				} else if ("overflowDamage" in event) {
					overflowDamage = event.overflowDamage
				}
			}

			if (this.#state.currentChunk.isCleared) {
				this.#state.player.progress.chunkIndex += 1
				this.#state.player.progress.tileIndex = 0
				this.#state.currentChunk = chunkGenerator.generate(this.#state.player.progress.chunkIndex)
			}
		}

		const rawDropEvents = this.#dropSystem.process(this.#state, breakEvents)
		const dropEvents = Array.isArray(rawDropEvents) ? rawDropEvents : [rawDropEvents]

		return {
			breakEvents,
			dropEvents,
			actionsProcessed,
		}
	}

	async save(): Promise<void> {
		if (!this.#state) {
			throw new Error("Engine must be initialized before saving state. Call init() first.")
		}

		await saveState(this.#state, this.#options.statePath)
	}
}

export type { EngineOptions, EngineTurnResult }

