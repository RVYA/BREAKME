import { COLLECTIBLES } from "#data/collectibles"
import type { TileBreakEvent } from "#systems/damage/damage-system"
import GameSystem, { type EventHandler } from "#systems/game-system"
import CollectibleGenerator from "#systems/generation/collectible-generator"
import type { CollectibleName } from "#types/collectible"
import type GameState from "#types/game-state"
import type RarityLabel from "#types/rarity"
import type { TileEffectName } from "#types/tile/effect"
import type { TileShapeName } from "#types/tile/shape"
import type { TileVariantName } from "#types/tile/variant"

export type CollectibleDropEvent = {
	collectible: CollectibleName
	rarity: RarityLabel
}

export default class DropSystem extends GameSystem<CollectibleDropEvent, TileBreakEvent | TileBreakEvent[]> {
	#baseDropChance: number

	constructor(baseDropChance = 0.25, eventHandler?: EventHandler<CollectibleDropEvent>) {
		super(eventHandler)
		this.#baseDropChance = baseDropChance
	}

	protected processState(
		state: GameState,
		context?: TileBreakEvent | TileBreakEvent[],
	): CollectibleDropEvent[] {
		if (!context) return []

		const breakEvents = Array.isArray(context) ? context : [context]
		if (breakEvents.length === 0) return []

		const pool = state.collectiblePool
		if (!pool || Object.keys(pool).length === 0) return []

		const numericSeed = Number.parseInt(state.player.identity.baseSeed, 16) >>> 0
		const generator = new CollectibleGenerator(numericSeed, "collectible_drop", pool, this.#baseDropChance)
		const dropEvents: CollectibleDropEvent[] = []

		for (const breakEvent of breakEvents) {
			const candidate = generator.generate({
				shape: breakEvent.tile.shape.name as TileShapeName,
				variant: breakEvent.tile.variant?.name as TileVariantName,
				effect: breakEvent.tile.effect?.name as TileEffectName,
				tileIndex: breakEvent.tileIndex,
				chunkIndex: breakEvent.chunkIndex,
				actionType: breakEvent.actionType,
			})

			if (!candidate) continue

			const def = COLLECTIBLES[candidate]
			if (!def) continue

			const rarity = def.rarity
			const tierPool = pool[rarity]
			if (tierPool) {
				const itemIndex = tierPool.indexOf(candidate)
				if (itemIndex !== -1) {
					tierPool.splice(itemIndex, 1)
				}
				if (tierPool.length === 0) {
					Reflect.deleteProperty(pool, rarity)
				}
			}

			state.player.inventory.collectibles.push(candidate)
			dropEvents.push({
				collectible: candidate,
				rarity,
			})
		}

		return dropEvents
	}
}
