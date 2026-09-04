import assert from "node:assert/strict"
import { promises as fs } from "node:fs"
import { afterEach, beforeEach, describe, it } from "node:test"

import Engine from "#engine"
import type { FetchEventsOptions } from "#input/provider"
import { saveState } from "#state/store"
import ActionEvent from "#types/action-event"

const TEST_DIR = "test-scratch-engine"
const TEST_STATE_FILE = `${TEST_DIR}/state.json`

describe("Engine (Phases 1 & 2: State, Initialization & Event Ingestion)", () => {
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

	it("fetches and appends events into pendingActions in init mode", async () => {
		const mockProvider = {
			name: "mock-provider",
			async fetchEvents(options: FetchEventsOptions) {
				assert.equal(options.mode, "init")
				assert.equal(options.username, "octocat")
				return [
					new ActionEvent("evt-1", "commit", "2026-08-31T21:00:00.000Z"),
					new ActionEvent("evt-2", "pullRequest", "2026-08-31T21:05:00.000Z"),
				]
			},
		}

		const engine = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
			provider: mockProvider,
		})

		await engine.init()
		const fetched = await engine.fetchEvents()

		assert.equal(fetched.length, 2)
		assert.equal(engine.state?.pendingActions.length, 2)
		assert.equal(engine.state?.pendingActions[0].id, "evt-1")
		assert.equal(engine.state?.pendingActions[1].id, "evt-2")
	})

	it("fetches and appends events in cron mode with since timestamp", async () => {
		const mockProvider = {
			name: "mock-provider",
			async fetchEvents(options: FetchEventsOptions) {
				assert.equal(options.mode, "cron")
				assert.equal(options.since, "2026-08-31T20:00:00.000Z")
				return [new ActionEvent("evt-3", "issue", "2026-08-31T21:10:00.000Z")]
			},
		}

		// Pre-create existing state with lastActiveDate
		const engine1 = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
		})
		const state1 = await engine1.init()
		state1.player.activity.lastActiveDate = "2026-08-31T20:00:00.000Z"
		await saveState(state1, TEST_STATE_FILE)

		const engine2 = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
			provider: mockProvider,
		})

		await engine2.init()
		const fetched = await engine2.fetchEvents()

		assert.equal(fetched.length, 1)
		assert.equal(engine2.state?.pendingActions.length, 1)
		assert.equal(engine2.state?.pendingActions[0].id, "evt-3")
	})

	it("throws an error if fetchEvents is called before init", async () => {
		const engine = new Engine({
			username: "octocat",
			statePath: TEST_STATE_FILE,
		})

		await assert.rejects(async () => {
			await engine.fetchEvents()
		}, /Engine must be initialized before fetching events/)
	})
})
