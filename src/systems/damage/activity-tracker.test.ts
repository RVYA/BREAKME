import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
	evaluateActivityUpdate,
	getUtcDayDifference,
	toUtcDateString,
} from "#systems/damage/activity-tracker"
import type { PlayerActivity } from "#types/player"

describe("ActivityTracker", () => {
	it("parses UTC date strings and calculates day difference correctly", () => {
		assert.equal(toUtcDateString("2026-09-04T23:50:00.000Z"), "2026-09-04")
		assert.equal(getUtcDayDifference("2026-09-01", "2026-09-02"), 1)
		assert.equal(getUtcDayDifference("2026-09-01", "2026-09-05"), 4)
		assert.equal(getUtcDayDifference("2026-09-01", "2026-09-01"), 0)
	})

	it("initializes streak on first active event", () => {
		const initial: PlayerActivity = {
			currentStreak: 0,
			highestStreak: 0,
			lastActiveDate: "",
			mostDamage: 0,
		}

		const updated = evaluateActivityUpdate(initial, ["2026-09-01T12:00:00.000Z"], 5.0)
		assert.equal(updated.currentStreak, 1)
		assert.equal(updated.highestStreak, 1)
		assert.equal(updated.lastActiveDate, "2026-09-01")
		assert.equal(updated.mostDamage, 5.0)
	})

	it("maintains streak when active on the same UTC day", () => {
		const initial: PlayerActivity = {
			currentStreak: 3,
			highestStreak: 5,
			lastActiveDate: "2026-09-01",
			mostDamage: 10.0,
		}

		const updated = evaluateActivityUpdate(initial, ["2026-09-01T20:00:00.000Z"], 8.0)
		assert.equal(updated.currentStreak, 3)
		assert.equal(updated.highestStreak, 5)
		assert.equal(updated.lastActiveDate, "2026-09-01")
		assert.equal(updated.mostDamage, 10.0)
	})

	it("increments streak when active on consecutive UTC days", () => {
		const initial: PlayerActivity = {
			currentStreak: 3,
			highestStreak: 3,
			lastActiveDate: "2026-09-01",
			mostDamage: 10.0,
		}

		const updated = evaluateActivityUpdate(initial, ["2026-09-02T08:00:00.000Z"], 15.0)
		assert.equal(updated.currentStreak, 4)
		assert.equal(updated.highestStreak, 4)
		assert.equal(updated.lastActiveDate, "2026-09-02")
		assert.equal(updated.mostDamage, 15.0)
	})

	it("resets streak to 1 when a gap greater than 1 day occurs", () => {
		const initial: PlayerActivity = {
			currentStreak: 5,
			highestStreak: 10,
			lastActiveDate: "2026-09-01",
			mostDamage: 20.0,
		}

		const updated = evaluateActivityUpdate(initial, ["2026-09-04T10:00:00.000Z"], 5.0)
		assert.equal(updated.currentStreak, 1)
		assert.equal(updated.highestStreak, 10)
		assert.equal(updated.lastActiveDate, "2026-09-04")
		assert.equal(updated.mostDamage, 20.0)
	})

	it("handles multiple event days across a single batch", () => {
		const initial: PlayerActivity = {
			currentStreak: 1,
			highestStreak: 1,
			lastActiveDate: "2026-09-01",
			mostDamage: 0,
		}

		const updated = evaluateActivityUpdate(
			initial,
			["2026-09-02T10:00:00.000Z", "2026-09-03T11:00:00.000Z", "2026-09-03T15:00:00.000Z"],
			12.0,
		)
		assert.equal(updated.currentStreak, 3)
		assert.equal(updated.highestStreak, 3)
		assert.equal(updated.lastActiveDate, "2026-09-03")
		assert.equal(updated.mostDamage, 12.0)
	})
})
