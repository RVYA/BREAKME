import type Achievement from "#types/unlockables/achievement"
import type Collectible from "#types/unlockables/collectible"

type PlayerIdentity = {
	baseSeed: string
	username: string
	createdAt: string
}

type PlayerProgress = {
	chunkIndex: number
	tileIndex: number
	totalTilesBroken: number
}

type PlayerActivity = {
	currentStreak: number
	highestStreak: number
	lastActiveDate: string
	mostCommits: number
	mostDamage: number
}

type PlayerInventory = {
	collectibles: Collectible[]
	achievements: Achievement[]
}

type Player = {
	identity: PlayerIdentity
	progress: PlayerProgress
	activity: PlayerActivity
	inventory: PlayerInventory
}

export type { Player as default, Player, PlayerActivity, PlayerIdentity, PlayerInventory, PlayerProgress }
