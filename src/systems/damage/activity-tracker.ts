import type { PlayerActivity } from "#types/player"

function toUtcDateString(timestamp: string): string {
	const date = new Date(timestamp)
	if (Number.isNaN(date.getTime())) {
		return ""
	}
	return date.toISOString().slice(0, 10)
}

function getUtcDayDifference(prevDateStr: string, nextDateStr: string): number {
	const prev = new Date(`${prevDateStr}T00:00:00.000Z`).getTime()
	const next = new Date(`${nextDateStr}T00:00:00.000Z`).getTime()
	const msPerDay = 24 * 60 * 60 * 1000
	return Math.round((next - prev) / msPerDay)
}

function evaluateActivityUpdate(
	currentActivity: PlayerActivity,
	eventTimestamps: string[],
	turnDamage = 0,
): PlayerActivity {
	let currentStreak = currentActivity.currentStreak
	let highestStreak = currentActivity.highestStreak
	let lastActiveDate = currentActivity.lastActiveDate
	const mostDamage = Math.max(currentActivity.mostDamage, turnDamage)

	const validDates = eventTimestamps
		.map(toUtcDateString)
		.filter((d) => d.length === 10)
		.sort()

	const uniqueDates = [...new Set(validDates)]

	for (const eventDay of uniqueDates) {
		if (!lastActiveDate) {
			currentStreak = 1
			highestStreak = Math.max(highestStreak, currentStreak)
			lastActiveDate = eventDay
			continue
		}

		const diff = getUtcDayDifference(lastActiveDate, eventDay)

		if (diff === 0) {
			continue
		}

		if (diff === 1) {
			currentStreak += 1
			highestStreak = Math.max(highestStreak, currentStreak)
			lastActiveDate = eventDay
		} else if (diff > 1) {
			currentStreak = 1
			lastActiveDate = eventDay
		}
	}

	return {
		currentStreak,
		highestStreak,
		lastActiveDate,
		mostDamage,
	}
}

export { evaluateActivityUpdate, getUtcDayDifference, toUtcDateString }
