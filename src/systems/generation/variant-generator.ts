import { TILE_VARIANTS_BY_NAME, TILE_VARIANTS_BY_RARITY } from "#data/tiles/variants"
import EntityGenerator from "#systems/entity-generator"
import type { TileShapeName } from "#types/tile/shape"
import type { TileVariantName } from "#types/tile/variant"

const DEFAULT_VARIANT_GENERATION_CHANCE = 0.35

export type VariantContext =
	| TileShapeName
	| {
			shape?: TileShapeName
			chunkIndex?: number
			tileIndex?: number
	  }

export default class VariantGenerator extends EntityGenerator<TileVariantName, VariantContext> {
	constructor(seed: number, key: string, generationChance: number = DEFAULT_VARIANT_GENERATION_CHANCE) {
		super(seed, key, TILE_VARIANTS_BY_RARITY, generationChance, (variantName, context) => {
			const variant = TILE_VARIANTS_BY_NAME[variantName]
			if (!variant) return false

			const shapeName = typeof context === "string" ? context : context?.shape
			const chunkIndex = typeof context === "object" ? context.chunkIndex ?? 0 : 0
			const tileIndex = typeof context === "object" ? context.tileIndex ?? 0 : 0

			const applicableShapes = variant.spawnCondition?.applicableShapes ?? variant.applicableTo
			if (applicableShapes && shapeName && !applicableShapes.includes(shapeName)) {
				return false
			}

			if (variant.spawnCondition?.minChunkIndex !== undefined && chunkIndex < variant.spawnCondition.minChunkIndex) {
				return false
			}
			if (variant.spawnCondition?.minTileIndex !== undefined && tileIndex < variant.spawnCondition.minTileIndex) {
				return false
			}

			return true
		})
	}
}
