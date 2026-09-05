import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createInitialCollectiblePool } from "#state/initializer"
import CollectibleGenerator from "#systems/generation/collectible-generator"
import type { CollectiblePool } from "#types/collectible"

describe("CollectibleGenerator", () => {
	it("returns undefined when presence roll fails with 0% generation chance", () => {
		const pool = createInitialCollectiblePool()
		const generator = new CollectibleGenerator(12345, "drop_test", pool, 0.0)

		const result = generator.generate({ tileIndex: 5, actionType: "commit" })
		assert.equal(result, undefined)
	})

	it("generates a valid collectible with 100% generation chance", () => {
		const pool = createInitialCollectiblePool()
		const generator = new CollectibleGenerator(12345, "drop_test", pool, 1.0)

		const result = generator.generate({ tileIndex: 5, actionType: "commit" })
		assert.ok(result)
		assert.ok(typeof result === "string")
	})

	it("respects spawn conditions such as minTileIndex", () => {
		const pool: CollectiblePool = {
			uncommon: ["Test Collectible #3"],
		}
		const generator = new CollectibleGenerator(12345, "drop_test", pool, 1.0)

		const invalidResult = generator.generate({ tileIndex: 0 })
		assert.equal(invalidResult, undefined)

		const validResult = generator.generate({ tileIndex: 5 })
		assert.equal(validResult, "Test Collectible #3")
	})

	it("produces deterministic collectible rolls for identical seeds", () => {
		const pool = createInitialCollectiblePool()
		const gen1 = new CollectibleGenerator(99999, "drop_test", pool, 1.0)
		const gen2 = new CollectibleGenerator(99999, "drop_test", pool, 1.0)

		const result1 = gen1.generate({ tileIndex: 5 })
		const result2 = gen2.generate({ tileIndex: 5 })

		assert.equal(result1, result2)
	})
})
