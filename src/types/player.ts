import type Collectible from "#types/collectible"

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
	mostDamage: number
}

type PlayerInventory = {
	collectibles: Collectible[]
}

type Player = {
	identity: PlayerIdentity
	progress: PlayerProgress
	activity: PlayerActivity
	inventory: PlayerInventory
}

export type { Player as default, Player, PlayerActivity, PlayerIdentity, PlayerInventory, PlayerProgress }
