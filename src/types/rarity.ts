type RarityLabel = "common" | "uncommon" | "rare" | "epic" | "legendary"

export type Rarity = {
	label: RarityLabel
	threshold: number
}

export type { RarityLabel as default }
