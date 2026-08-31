import type ActionItem from "./action-item"
import type Player from "./player"
import type Chunk from "./tile/chunk"

type GameState = {
	hash: string
	player: Player
	currentChunk: Chunk
	pendingActions: ActionItem[]
	lastProcessedCommitSha?: string
}

export type { GameState as default }
