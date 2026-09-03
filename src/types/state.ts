import type { ActionItem } from "#types/action"
import type { Player } from "#types/player"
import type { Chunk } from "#types/tile"

type GameState = {
	hash: string
	player: Player
	currentChunk: Chunk
	pendingActions: ActionItem[]
	lastProcessedCommitSha?: string
}

export type { GameState as default, GameState }
