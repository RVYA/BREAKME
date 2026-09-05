import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { verifyGameState } from "#state/integrity"
import DamageSystem, { type ChunkClearedEvent, type DamageEvent, type TileBreakEvent } from "#systems/damage/damage-system"
import ActionEvent from "#types/action-event"
import type GameState from "#types/game-state"
import Tile from "#types/tile/tile"

function createMockGameState(overrides?: Partial<GameState>): GameState {
	const tiles: Tile[] = Array.from({ length: 64 }, (_, i) => new Tile(i, "Base"))

	return {
		hash: "",
		player: {
			identity: {
				username: "testuser",
				baseSeed: "testseed123",
				createdAt: "2026-09-01T00:00:00.000Z",
			},
			progress: {
				chunkIndex: 0,
				tileIndex: 0,
				totalTilesBroken: 0,
			},
			activity: {
				currentStreak: 1,
				highestStreak: 1,
				lastActiveDate: "2026-09-01",
				mostDamage: 0,
			},
			inventory: {
				collectibles: [],
			},
		},
		currentChunk: {
			index: 0,
			tiles,
			createdAt: "2026-09-01T00:00:00.000Z",
			isCleared: false,
		},
		collectiblePool: {
			common: ["Test Collectible #1"],
		},
		pendingActions: [],
		...overrides,
	}
}

describe("DamageSystem", () => {
	it("returns empty array when pending actions are empty", () => {
		const state = createMockGameState()
		const system = new DamageSystem()

		const breakEvents = system.process(state)
		const list = Array.isArray(breakEvents) ? breakEvents : [breakEvents]

		assert.equal(list.length, 0)
	})

	it("applies partial damage to the active target tile without breaking", () => {
		const state = createMockGameState()
		const initialHp = state.currentChunk.tiles[0].currentHp
		state.pendingActions = [new ActionEvent("e1", "commit", "2026-09-01T12:00:00.000Z")]

		const system = new DamageSystem()
		const breakEvents = system.process(state)
		const list = Array.isArray(breakEvents) ? breakEvents : [breakEvents]

		assert.equal(list.length, 0)
		assert.equal(state.player.progress.tileIndex, 0)
		assert.equal(state.currentChunk.tiles[0].currentHp, initialHp - 1.0)
		assert.equal(state.currentChunk.tiles[0].isBroken, false)
		assert.equal(state.pendingActions.length, 0)
		assert.ok(verifyGameState(state))
	})

	it("breaks tile when damage equals or exceeds tile HP and emits TileBreakEvent", () => {
		const state = createMockGameState()
		state.currentChunk.tiles[0] = Tile.fromJSON({ index: 0, shape: "Base", currentHp: 1.0 })
		state.pendingActions = [new ActionEvent("e1", "commit", "2026-09-01T12:00:00.000Z")]

		const emitted: DamageEvent[] = []
		const system = new DamageSystem((event) => emitted.push(event))
		const breakEvents = system.process(state)
		const list = Array.isArray(breakEvents) ? breakEvents : [breakEvents]

		assert.equal(list.length, 1)
		assert.equal(emitted.length, 1)
		const first = list[0] as TileBreakEvent
		assert.equal(first.tile.index, 0)
		assert.equal(first.actionType, "commit")
		assert.equal(state.player.progress.tileIndex, 1)
		assert.equal(state.player.progress.totalTilesBroken, 1)
		assert.equal(state.currentChunk.tiles[0].currentHp, 0)
		assert.equal(state.currentChunk.tiles[0].isBroken, true)
		assert.ok(verifyGameState(state))
	})

	it("cascades overflow damage across multiple consecutive tiles", () => {
		const state = createMockGameState()
		state.currentChunk.tiles[0] = Tile.fromJSON({ index: 0, shape: "Base", currentHp: 2.0 })
		state.currentChunk.tiles[1] = Tile.fromJSON({ index: 1, shape: "Base", currentHp: 2.0 })
		state.currentChunk.tiles[2] = Tile.fromJSON({ index: 2, shape: "Base", currentHp: 5.0 })

		// Release event deals 5.0 base damage
		state.pendingActions = [new ActionEvent("e1", "release", "2026-09-01T12:00:00.000Z")]

		const system = new DamageSystem()
		const breakEvents = system.process(state)
		const list = Array.isArray(breakEvents) ? breakEvents : [breakEvents]

		assert.equal(list.length, 2)
		assert.equal(state.player.progress.tileIndex, 2)
		assert.equal(state.currentChunk.tiles[0].isBroken, true)
		assert.equal(state.currentChunk.tiles[1].isBroken, true)
		assert.equal(state.currentChunk.tiles[2].currentHp, 4.0)
		assert.equal(state.currentChunk.tiles[2].isBroken, false)
		assert.ok(verifyGameState(state))
	})

	it("stops and emits ChunkClearedEvent when chunk is cleared, preserving pending actions", () => {
		const state = createMockGameState()
		for (let i = 0; i < 64; i++) {
			state.currentChunk.tiles[i] = Tile.fromJSON({ index: i, shape: "Base", currentHp: 1.0 })
		}

		state.pendingActions = Array.from({ length: 70 }, (_, i) => new ActionEvent(`e${i}`, "commit", "2026-09-01T12:00:00.000Z"))

		const system = new DamageSystem()
		const rawEvents = system.process(state)
		const list = Array.isArray(rawEvents) ? rawEvents : [rawEvents]

		assert.equal(list.length, 65) // 64 TileBreakEvents + 1 ChunkClearedEvent
		const clearedEvent = list[64] as ChunkClearedEvent
		assert.equal(clearedEvent.chunkIndex, 0)
		assert.equal(clearedEvent.overflowDamage, 0)
		assert.equal(state.currentChunk.isCleared, true)
		assert.equal(state.pendingActions.length, 6)
		assert.ok(verifyGameState(state))
	})
})
