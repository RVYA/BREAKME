import type Tile from "./tile"

type Chunk = {
	index: number
	tiles: Tile[]
	createdAt: string
	isCleared?: boolean
}

export type { Chunk as default }
