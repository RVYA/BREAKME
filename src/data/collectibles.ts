import type Collectible from "#types/collectible"
import type { CollectibleName } from "#types/collectible"
import type RarityLabel from "#types/rarity"

export const COLLECTIBLES = {
	"Test Collectible #1": {
		symbol: "📦",
		description: "Let's see if everything works.",
		rarity: "common",
		spawnCondition: undefined,
	},
	"Test Collectible #2": {
		symbol: "💎",
		description: "Let's see if everything *extra* works.",
		rarity: "common",
		spawnCondition: undefined,
	},
	"Test Collectible #3": {
		symbol: "🏆",
		description: "Ya da ya da.",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 2 },
	},
} as const satisfies Record<string, Collectible>

export const COLLECTIBLES_BY_RARITY = (Object.entries(COLLECTIBLES) as [CollectibleName, Collectible][]).reduce(
	(acc, [name, item]) => {
		;(acc[item.rarity] ??= []).push(name)
		return acc
	},
	{} as Record<RarityLabel, CollectibleName[]>,
)
