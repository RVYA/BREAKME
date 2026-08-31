import type Collectible from "#models/unlockable/collectible"

export const COLLECTIBLES = [
	{
		name: "Test Collectible #1",
		description: "Let's see if everything works.",
		rarity: "common",
		spawnCondition: undefined,
	},
	{
		name: "Test Collectible #2",
		description: "Let's see if everything *extra* works.",
		rarity: "common",
		spawnCondition: undefined,
	},
	{
		name: "Test Collectible #3",
		description: "Ya da ya da.",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 2 },
	},
] as const satisfies Collectible[]
