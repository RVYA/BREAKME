import type Achievement from "#models/unlockable/achievement"
import type { AchievementName } from "#models/unlockable/achievement"

export const ACHIEVEMENTS = [
	{
		name: "First Break",
		description: "Break your first block.",
		conditions: [(state) => state.player.progress.totalTilesBroken >= 1],
	},
	{
		name: "Unstoppable Force",
		description: "Maintain a 7-day Git action streak.",
		conditions: [(state) => state.player.activity.currentStreak >= 7],
	},
] as const satisfies Achievement[]

export const ACHIEVEMENTS_BY_NAME = Object.fromEntries(
	ACHIEVEMENTS.map((achievement) => [achievement.name, achievement]),
) as unknown as Record<AchievementName, Achievement>
