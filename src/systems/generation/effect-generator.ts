import { TILE_EFFECTS_BY_NAME, TILE_EFFECTS_BY_RARITY } from "#data/tiles/effects"
import EntityGenerator from "#systems/entity-generator"
import type { TileEffectName } from "#types/tile/effect"

const DEFAULT_EFFECT_GENERATION_CHANCE = 0.15

export default class EffectGenerator extends EntityGenerator<TileEffectName> {
	constructor(seed: number, key: string, generationChance: number = DEFAULT_EFFECT_GENERATION_CHANCE) {
		super(seed, key, TILE_EFFECTS_BY_RARITY, generationChance, (effectName, shape) => {
			const effect = TILE_EFFECTS_BY_NAME[effectName]
			return !effect?.applicableTo || (shape ? effect.applicableTo.includes(shape) : true)
		})
	}
}
