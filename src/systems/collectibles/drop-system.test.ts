import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createInitialGameState } from "#state/initializer"
import DropSystem, { type CollectibleDropEvent } from "#systems/collectibles/drop-system"
import type { TileBreakEvent } from "#systems/damage/damage-system"
import Tile from "#types/tile/tile"

function createMockBreakEvent(overrides?: Partial<TileBreakEvent>): TileBreakEvent {
	return {
		tile: new Tile(0, "Base"),
		chunkIndex: 0,
		tileIndex: 0,
		actionType: "commit",
		...overrides,
	}
}

describe("DropSystem", () => {
	it("returns empty array when presence roll fails with 0% drop chance", () => {
		const state = createInitialGameState({ username: "testuser" })
		const dropSystem = new DropSystem(0.0)
		const breakEvent = createMockBreakEvent()

		const result = dropSystem.process(state, breakEvent)
		const list = Array.isArray(result) ? result : [result]

		assert.equal(list.length, 0)
		assert.equal(state.player.inventory.collectibles.length, 0)
	})

	it("evaluates drop, adds to player inventory, and removes from collectiblePool", () => {
		const state = createInitialGameState({ username: "testuser" })
		const dropSystem = new DropSystem(1.0)
		const breakEvent = createMockBreakEvent({ tileIndex: 5 })

		const initialCommonCount = state.collectiblePool.common?.length ?? 0
		assert.ok(initialCommonCount > 0)

		const result = dropSystem.process(state, breakEvent)
		const list = Array.isArray(result) ? result : [result]

		assert.equal(list.length, 1)
		const drop = list[0]
		assert.equal(state.player.inventory.collectibles.length, 1)
		assert.equal(state.player.inventory.collectibles[0], drop.collectible)
		assert.ok(!state.collectiblePool[drop.rarity]?.includes(drop.collectible))
	})

	it("completely deletes the rarity key from collectiblePool when depleted", () => {
		const state = createInitialGameState({ username: "testuser" })
		state.collectiblePool = {
			common: ["Test Collectible #1"],
		}

		const dropSystem = new DropSystem(1.0)
		const breakEvent = createMockBreakEvent()

		const result = dropSystem.process(state, breakEvent)
		const list = Array.isArray(result) ? result : [result]

		assert.equal(list.length, 1)
		assert.equal(list[0].collectible, "Test Collectible #1")
		assert.equal(state.player.inventory.collectibles.length, 1)
		assert.equal("common" in state.collectiblePool, false)
		assert.equal(state.collectiblePool.common, undefined)
	})

	it("cascades to lower rarity when higher rarity tier is missing or depleted", () => {
		const state = createInitialGameState({ username: "testuser" })
		state.collectiblePool = {
			common: ["Test Collectible #1"],
		}

		const dropSystem = new DropSystem(1.0)
		const breakEvent = createMockBreakEvent()

		const result = dropSystem.process(state, breakEvent)
		const list = Array.isArray(result) ? result : [result]

		assert.equal(list.length, 1)
		assert.equal(list[0].collectible, "Test Collectible #1")
		assert.equal(list[0].rarity, "common")
	})

	it("enforces spawnCondition criteria like minTileIndex", () => {
		const state = createInitialGameState({ username: "testuser" })
		state.collectiblePool = {
			uncommon: ["Test Collectible #3"],
		}

		const dropSystem = new DropSystem(1.0)

		const invalidResult = dropSystem.process(state, createMockBreakEvent({ tileIndex: 0 }))
		const invalidList = Array.isArray(invalidResult) ? invalidResult : [invalidResult]
		assert.equal(invalidList.length, 0)

		const validResult = dropSystem.process(state, createMockBreakEvent({ tileIndex: 5 }))
		const validList = Array.isArray(validResult) ? validResult : [validResult]
		assert.equal(validList.length, 1)
		assert.equal(validList[0].collectible, "Test Collectible #3")
	})

	it("returns empty array when entire pool is empty", () => {
		const state = createInitialGameState({ username: "testuser" })
		state.collectiblePool = {}

		const dropSystem = new DropSystem(1.0)
		const result = dropSystem.process(state, createMockBreakEvent())
		const list = Array.isArray(result) ? result : [result]

		assert.equal(list.length, 0)
	})

	it("emits individual CollectibleDropEvent to registered handler", () => {
		const state = createInitialGameState({ username: "testuser" })
		state.collectiblePool = {
			common: ["Test Collectible #1"],
		}

		const emitted: CollectibleDropEvent[] = []
		const dropSystem = new DropSystem(1.0, (event) => emitted.push(event))

		dropSystem.process(state, [createMockBreakEvent()])

		assert.equal(emitted.length, 1)
		assert.equal(emitted[0].collectible, "Test Collectible #1")
	})
})
