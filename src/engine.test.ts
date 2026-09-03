import assert from "node:assert/strict"
import { promises as fs } from "node:fs"
import { afterEach, beforeEach, describe, it } from "node:test"
import { saveState } from "#state/store"
import Engine from "#engine"

const TEST_DIR = "test-scratch-engine"
const TEST_STATE_FILE = `${TEST_DIR}/state.json`

describe("Engine (Phase 1: State & Initialization)", () => {
	beforeEach(async () => {
		await fs.mkdir(TEST_DIR, { recursive: true })
	})

	afterEach(async () => {
		await fs.rm(TEST_DIR, { recursive: true, force: true })
	})

	it("initializes a fresh game state with populated chunk #0", async () => {
		const engine = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
		})

		const state = await engine.init()

		assert.equal(engine.isInitialRun, true)
		assert.equal(state.player.identity.username, "octocat")
		assert.equal(state.currentChunk.index, 0)
		assert.equal(state.currentChunk.tiles.length, 16)
		assert.ok(state.hash.length > 0)
	})

	it("loads existing state on subsequent run", async () => {
		const engine1 = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
		})
		const state1 = await engine1.init()

		await saveState(state1, TEST_STATE_FILE)

		const engine2 = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
		})
		const state2 = await engine2.init()

		assert.equal(engine2.isInitialRun, false)
		assert.equal(state2.player.identity.baseSeed, state1.player.identity.baseSeed)
	})
})
