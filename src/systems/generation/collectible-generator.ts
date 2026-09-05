import { COLLECTIBLES } from "#data/collectibles"
import EntityGenerator from "#systems/entity-generator"
import type { ActionType } from "#types/action-event"
import type { CollectibleName, CollectiblePool, SpawnCondition } from "#types/collectible"
import type RarityLabel from "#types/rarity"
import type { TileEffectName } from "#types/tile/effect"
import type { TileShapeName } from "#types/tile/shape"
import type { TileVariantName } from "#types/tile/variant"

export type CollectibleContext = {
	shape?: TileShapeName
	variant?: TileVariantName
	effect?: TileEffectName
	tileIndex?: number
	chunkIndex?: number
	actionType?: ActionType
}

const DEFAULT_COLLECTIBLE_DROP_CHANCE = 0.25

export default class CollectibleGenerator extends EntityGenerator<CollectibleName, CollectibleContext> {
	constructor(
		seed: number,
		key: string,
		pool: CollectiblePool,
		generationChance: number = DEFAULT_COLLECTIBLE_DROP_CHANCE,
	) {
		super(
			seed,
			key,
			pool as Record<RarityLabel, CollectibleName[]>,
			generationChance,
			(name, context) => {
				const def = COLLECTIBLES[name]
				if (!def || !def.spawnCondition) return true
				const cond: SpawnCondition = def.spawnCondition

				if (cond.applicableShapes && (!context?.shape || !cond.applicableShapes.includes(context.shape))) {
					return false
				}
				if (
					cond.applicableVariants &&
					(!context?.variant || !cond.applicableVariants.includes(context.variant))
				) {
					return false
				}
				if (
					cond.applicableEffects &&
					(!context?.effect || !cond.applicableEffects.includes(context.effect))
				) {
					return false
				}
				if (
					cond.minTileIndex !== undefined &&
					(context?.tileIndex === undefined || context.tileIndex < cond.minTileIndex)
				) {
					return false
				}
				if (
					cond.minChunkIndex !== undefined &&
					(context?.chunkIndex === undefined || context.chunkIndex < cond.minChunkIndex)
				) {
					return false
				}
				if (
					cond.gitActionTypes &&
					(!context?.actionType || !cond.gitActionTypes.includes(context.actionType))
				) {
					return false
				}

				return true
			},
		)
	}
}
