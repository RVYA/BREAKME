import { ACHIEVEMENTS_BY_NAME } from "#const/unlockables/achievements"
import type Achievement from "#models/unlockable/achievement"
import type { AchievementName } from "#models/unlockable/achievement"

export function getAchievementFrom(name: AchievementName): Achievement {
	return ACHIEVEMENTS_BY_NAME[name]
}
