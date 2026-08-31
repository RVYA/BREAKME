import type Tile from "./tile"

type Chunk = {
	index: number
	tiles: Tile[]
	generatedAt: string
	isCleared?: boolean
}

export type { Chunk as default }
