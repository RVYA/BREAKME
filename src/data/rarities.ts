import type { Rarity } from "#types/rarity"

export const RARITY_DISTRIBUTION = [
	{ label: "legendary", threshold: 0.01 }, // 1%
	{ label: "epic", threshold: 0.05 }, // 4%
	{ label: "rare", threshold: 0.15 }, // 10%
	{ label: "uncommon", threshold: 0.4 }, // 25%
	{ label: "common", threshold: 1.0 }, // 60%
] as const satisfies Rarity[]
