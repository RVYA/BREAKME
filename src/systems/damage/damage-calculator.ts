import type { ActionType } from "#types/action-event"

const ACTION_BASE_WEIGHTS: Record<ActionType, number> = {
	commit: 1.0,
	mergeCommit: 2.0,
	branchCreate: 0.0,
	tagCreate: 0.0,
	pullRequest: 3.0,
	issue: 1.5,
	release: 5.0,
	deployment: 2.5,
}

const MAX_STREAK_BONUS = 3.0
const STREAK_BONUS_PER_DAY = 0.1

function calculateStreakMultiplier(streak: number): number {
	if (streak <= 1) return 1.0
	const bonus = Math.min((streak - 1) * STREAK_BONUS_PER_DAY, MAX_STREAK_BONUS)
	return Math.round((1.0 + bonus) * 100) / 100
}

function calculateBaseDamage(actionType: ActionType, count = 1): number {
	const weight = ACTION_BASE_WEIGHTS[actionType] ?? 1.0
	return Math.round(count * weight * 100) / 100
}

function calculateFinalDamage(baseDamage: number, streak = 1, recordMultiplier = 1.0): number {
	const streakMultiplier = calculateStreakMultiplier(streak)
	const rawDamage = baseDamage * streakMultiplier * recordMultiplier
	return Math.round(rawDamage * 100) / 100
}

export { ACTION_BASE_WEIGHTS, calculateBaseDamage, calculateFinalDamage, calculateStreakMultiplier }
