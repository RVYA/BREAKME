import assert from "node:assert/strict"
import { describe, it } from "node:test"
import TileGenerator from "#systems/generation/tile-generator"

describe("TileGenerator", () => {
	it("generates a valid Tile with dynamic Max HP calculation", () => {
		const generator = new TileGenerator(12345, 0)
		const tile = generator.generate(0)

		assert.equal(tile.index, 0)
		assert.ok(tile.shape.name.length > 0)
		assert.ok(tile.maxHp > 0)
		assert.equal(tile.currentHp, tile.maxHp)
		assert.equal(tile.isBroken, false)
	})

	it("produces deterministic tile sequences for the same seed and chunkIndex", () => {
		const gen1 = new TileGenerator(99999, 1)
		const gen2 = new TileGenerator(99999, 1)

		for (let i = 0; i < 16; i++) {
			const tile1 = gen1.generate(i)
			const tile2 = gen2.generate(i)

			assert.equal(tile1.index, tile2.index)
			assert.equal(tile1.shape.name, tile2.shape.name)
			assert.equal(tile1.variant?.name, tile2.variant?.name)
			assert.equal(tile1.effect?.name, tile2.effect?.name)
			assert.equal(tile1.maxHp, tile2.maxHp)
		}
	})

	it("produces different sequences for different seeds or chunk indices", () => {
		const genA = new TileGenerator(11111, 0)
		const genB = new TileGenerator(22222, 0)

		const tilesA = Array.from({ length: 16 }, (_, i) => genA.generate(i))
		const tilesB = Array.from({ length: 16 }, (_, i) => genB.generate(i))

		const shapesOrVariantsDiffer = tilesA.some(
			(tileA, i) =>
				tileA.variant?.name !== tilesB[i].variant?.name ||
				tileA.effect?.name !== tilesB[i].effect?.name ||
				tileA.maxHp !== tilesB[i].maxHp,
		)

		assert.equal(shapesOrVariantsDiffer, true)
	})
})
