import assert from "node:assert/strict"
import { describe, it } from "node:test"
import ChunkGenerator, { DEFAULT_CHUNK_SIZE } from "#systems/generation/chunk-generator"

describe("ChunkGenerator", () => {
	it("generates a Chunk with default size and correct initial metadata", () => {
		const generator = new ChunkGenerator(12345)
		const timestamp = "2026-08-31T20:00:00.000Z"
		const chunk = generator.generate(0, timestamp)

		assert.equal(chunk.index, 0)
		assert.equal(chunk.createdAt, timestamp)
		assert.equal(chunk.isCleared, false)
		assert.equal(chunk.tiles.length, DEFAULT_CHUNK_SIZE)
		assert.equal(chunk.tiles[0].index, 0)
		assert.equal(chunk.tiles[DEFAULT_CHUNK_SIZE - 1].index, DEFAULT_CHUNK_SIZE - 1)
	})

	it("supports custom chunk size", () => {
		const customSize = 32
		const generator = new ChunkGenerator(12345, customSize)
		const chunk = generator.generate(1)

		assert.equal(chunk.tiles.length, customSize)
		assert.equal(chunk.index, 1)
	})

	it("produces deterministic chunks for the same seed, index, and timestamp", () => {
		const gen1 = new ChunkGenerator(54321)
		const gen2 = new ChunkGenerator(54321)
		const timestamp = "2026-08-31T20:00:00.000Z"

		const chunk1 = gen1.generate(3, timestamp)
		const chunk2 = gen2.generate(3, timestamp)

		assert.deepEqual(chunk1.index, chunk2.index)
		assert.deepEqual(chunk1.createdAt, chunk2.createdAt)
		assert.equal(chunk1.tiles.length, chunk2.tiles.length)

		for (let i = 0; i < chunk1.tiles.length; i++) {
			assert.equal(chunk1.tiles[i].shape.name, chunk2.tiles[i].shape.name)
			assert.equal(chunk1.tiles[i].variant?.name, chunk2.tiles[i].variant?.name)
			assert.equal(chunk1.tiles[i].effect?.name, chunk2.tiles[i].effect?.name)
			assert.equal(chunk1.tiles[i].maxHp, chunk2.tiles[i].maxHp)
		}
	})

	it("generates different tile layouts for different chunk indices", () => {
		const generator = new ChunkGenerator(54321)

		const chunk0 = generator.generate(0)
		const chunk1 = generator.generate(1)

		const layoutDiffers = chunk0.tiles.some(
			(tile, i) =>
				tile.variant?.name !== chunk1.tiles[i].variant?.name ||
				tile.effect?.name !== chunk1.tiles[i].effect?.name ||
				tile.maxHp !== chunk1.tiles[i].maxHp,
		)

		assert.equal(layoutDiffers, true)
	})
})
