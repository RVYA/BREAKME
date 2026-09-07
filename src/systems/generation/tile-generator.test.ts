import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { TILE_SHAPES_BY_NAME } from "#data/tiles/shapes"
import ShapeGenerator from "#systems/generation/shape-generator"
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

describe("ShapeGenerator", () => {
	it("generates valid shape names from registered shapes catalog", () => {
		const generator = new ShapeGenerator(42, "test_shape")
		const shapeName = generator.generate()

		assert.ok(shapeName)
		assert.ok(TILE_SHAPES_BY_NAME[shapeName])
	})

	it("produces deterministic shape rolls for identical seeds", () => {
		const gen1 = new ShapeGenerator(12345, "shape_roll")
		const gen2 = new ShapeGenerator(12345, "shape_roll")

		for (let i = 0; i < 20; i++) {
			assert.equal(gen1.generate({ tileIndex: i }), gen2.generate({ tileIndex: i }))
		}
	})

	it("respects minTileIndex spawnCondition criteria", () => {
		const generator = new ShapeGenerator(999, "conditioned_shape")
		for (let i = 0; i < 50; i++) {
			const shapeName = generator.generate({ tileIndex: 0 })
			if (shapeName) {
				const shape = TILE_SHAPES_BY_NAME[shapeName]
				if (shape.spawnCondition?.minTileIndex !== undefined) {
					assert.ok(shape.spawnCondition.minTileIndex <= 0)
				}
			}
		}
	})

	it("unlocks advanced shapes at higher tile indices", () => {
		const generator = new ShapeGenerator(777, "advanced_shape")
		const rolledAtHighIndex: string[] = []

		for (let i = 0; i < 100; i++) {
			const shape = generator.generate({ tileIndex: 125 })
			if (shape) rolledAtHighIndex.push(shape)
		}

		assert.ok(rolledAtHighIndex.length > 0)
	})
})
