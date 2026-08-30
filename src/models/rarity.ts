type RarityLabel = "common" | "uncommon" | "rare" | "epic" | "legendary"
export type { RarityLabel as default }

export type Rarity = {
	label: RarityLabel
	spawnRate: number
}
