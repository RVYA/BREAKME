import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
	calculateBaseDamage,
	calculateFinalDamage,
	calculateStreakMultiplier,
} from "#systems/damage/damage-calculator"

describe("DamageCalculator", () => {
	it("calculates base damage according to action weights", () => {
		assert.equal(calculateBaseDamage("commit", 1), 1.0)
		assert.equal(calculateBaseDamage("commit", 5), 5.0)
		assert.equal(calculateBaseDamage("mergeCommit", 1), 2.0)
		assert.equal(calculateBaseDamage("pullRequest", 1), 3.0)
		assert.equal(calculateBaseDamage("issue", 1), 1.5)
		assert.equal(calculateBaseDamage("release", 1), 5.0)
		assert.equal(calculateBaseDamage("deployment", 1), 2.5)
		assert.equal(calculateBaseDamage("branchCreate", 1), 0.0)
		assert.equal(calculateBaseDamage("tagCreate", 1), 0.0)
	})

	it("calculates streak multiplier correctly with cap at 4.0x", () => {
		assert.equal(calculateStreakMultiplier(0), 1.0)
		assert.equal(calculateStreakMultiplier(1), 1.0)
		assert.equal(calculateStreakMultiplier(2), 1.1)
		assert.equal(calculateStreakMultiplier(11), 2.0)
		assert.equal(calculateStreakMultiplier(31), 4.0)
		assert.equal(calculateStreakMultiplier(100), 4.0)
	})

	it("calculates final damage combining base damage, streak, and record multipliers", () => {
		assert.equal(calculateFinalDamage(10, 1), 10.0)
		assert.equal(calculateFinalDamage(10, 2), 11.0)
		assert.equal(calculateFinalDamage(10, 11, 1.25), 25.0)
		assert.equal(calculateFinalDamage(10, 31, 1.55), 62.0)
	})
})
