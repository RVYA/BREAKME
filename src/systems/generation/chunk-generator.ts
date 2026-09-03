import type Chunk from "#types/tile/chunk"
import TileGenerator from "#systems/generation/tile-generator"

const DEFAULT_CHUNK_SIZE = 16

export default class ChunkGenerator {
	#seed: number
	#chunkSize: number

	constructor(seed: number, chunkSize: number = DEFAULT_CHUNK_SIZE) {
		this.#seed = seed
		this.#chunkSize = chunkSize
	}

	generate(chunkIndex: number, timestamp: string = new Date().toISOString()): Chunk {
		const tileGenerator = new TileGenerator(this.#seed, chunkIndex)
		const tiles = Array.from({ length: this.#chunkSize }, (_, i) => tileGenerator.generate(i))

		return {
			index: chunkIndex,
			tiles,
			createdAt: timestamp,
			isCleared: false,
		}
	}
}

export { DEFAULT_CHUNK_SIZE }
