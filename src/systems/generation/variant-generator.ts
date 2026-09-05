import { TILE_VARIANTS_BY_NAME, TILE_VARIANTS_BY_RARITY } from "#data/tiles/variants"
import EntityGenerator from "#systems/entity-generator"
import type { TileVariantName } from "#types/tile/variant"

const DEFAULT_VARIANT_GENERATION_CHANCE = 0.35

export default class VariantGenerator extends EntityGenerator<TileVariantName> {
	constructor(seed: number, key: string, generationChance: number = DEFAULT_VARIANT_GENERATION_CHANCE) {
		super(seed, key, TILE_VARIANTS_BY_RARITY, generationChance, (variantName, shape) => {
			const variant = TILE_VARIANTS_BY_NAME[variantName]
			return !variant?.applicableTo || (shape ? variant.applicableTo.includes(shape) : true)
		})
	}
}
