import type { Rarity } from "#types/rarity"

export const RARITY_DISTRIBUTION = [
	{ label: "common", threshold: 1.0 },
	{ label: "uncommon", threshold: 0.4 },
	{ label: "rare", threshold: 0.15 },
	{ label: "epic", threshold: 0.05 },
	{ label: "legendary", threshold: 0.01 },
] as const satisfies Rarity[]
