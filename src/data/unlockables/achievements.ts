import type Achievement from "#types/unlockables/achievement"

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
