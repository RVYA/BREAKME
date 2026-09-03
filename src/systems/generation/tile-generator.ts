import Tile from "#types/tile/tile"
import EffectGenerator from "#systems/generation/effect-generator"
import ShapeGenerator from "#systems/generation/shape-generator"
import VariantGenerator from "#systems/generation/variant-generator"

export default class TileGenerator {
	#shapeGenerator: ShapeGenerator
	#variantGenerator: VariantGenerator
	#effectGenerator: EffectGenerator

	constructor(seed: number, chunkIndex: number) {
		const key = `chunk_${chunkIndex}`
		this.#shapeGenerator = new ShapeGenerator(seed, `${key}_shape`)
		this.#variantGenerator = new VariantGenerator(seed, `${key}_variant`)
		this.#effectGenerator = new EffectGenerator(seed, `${key}_effect`)
	}

	generate(index: number): Tile {
		const shape = this.#shapeGenerator.generate() ?? "Base"
		const variant = this.#variantGenerator.generate(shape)
		const effect = this.#effectGenerator.generate(shape)

		return new Tile(index, shape, variant, effect)
	}
}
