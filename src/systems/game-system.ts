import type GameState from "#types/game-state"

export type EventHandler<TEvent> = (event: TEvent) => void

export default abstract class GameSystem<TEvent, TContext = void> {
	#eventHandler?: EventHandler<TEvent>

	constructor(eventHandler?: EventHandler<TEvent>) {
		this.#eventHandler = eventHandler
	}

	protected emit(event: TEvent | TEvent[]): void {
		if (!this.#eventHandler) return

		if (Array.isArray(event)) {
			for (const item of event) {
				this.#eventHandler(item)
			}
		} else {
			this.#eventHandler(event)
		}
	}

	protected abstract processState(state: GameState, context?: TContext): TEvent | TEvent[]

	process(state: GameState, context?: TContext): TEvent | TEvent[] {
		const result = this.processState(state, context)
		this.emit(result)
		return result
	}
}
