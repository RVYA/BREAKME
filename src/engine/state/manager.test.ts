import assert from "node:assert/strict"
import { rm } from "node:fs/promises"
import { afterEach, describe, it } from "node:test"

import { createInitialGameState } from "#engine/state/initializer"
import { signGameState, verifyGameState } from "#engine/state/integrity"
import { loadOrInitializeState } from "#engine/state/manager"
import { doesStateExist, saveState } from "#engine/state/store"

const TEST_FILE = "state.test.json"

describe("State Management & Integrity", () => {
	afterEach(async () => {
		try {
			await rm(TEST_FILE)
		} catch {
			// file may not exist
		}
	})

	it("creates initial game state with valid HMAC hash", () => {
		const state = createInitialGameState({
			username: "RVYA",
			uuid: "46376183",
			timestamp: "2026-08-31T20:00:00.000Z",
		})

		assert.ok(state.hash.length > 0)
		assert.equal(verifyGameState(state), true)
	})

	it("detects tampering when state data is modified without re-signing", () => {
		const state = createInitialGameState({
			username: "RVYA",
			uuid: "46376183",
			timestamp: "2026-08-31T20:00:00.000Z",
		})

		assert.equal(verifyGameState(state), true)

		state.player.progress.totalTilesBroken = 999
		assert.equal(verifyGameState(state), false)

		signGameState(state)
		assert.equal(verifyGameState(state), true)
	})

	it("initializes fresh state on first run and loads existing signed state on subsequent run", async () => {
		assert.equal(await doesStateExist(TEST_FILE), false)

		const boot1 = await loadOrInitializeState(
			{
				username: "RVYA",
				uuid: "46376183",
				timestamp: "2026-08-31T20:00:00.000Z",
			},
			TEST_FILE,
		)

		assert.equal(boot1.isInitialRun, true)
		assert.equal(boot1.isValid, true)
		assert.equal(boot1.state.player.identity.username, "RVYA")

		boot1.state.player.progress.totalTilesBroken = 5
		signGameState(boot1.state)
		await saveState(boot1.state, TEST_FILE)

		assert.equal(await doesStateExist(TEST_FILE), true)

		const boot2 = await loadOrInitializeState(
			{
				username: "RVYA",
				uuid: "46376183",
			},
			TEST_FILE,
		)

		assert.equal(boot2.isInitialRun, false)
		assert.equal(boot2.isValid, true)
		assert.equal(boot2.state.player.progress.totalTilesBroken, 5)
	})
})
