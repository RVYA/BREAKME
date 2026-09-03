import type ActionEvent from "#types/action-event"
import type Player from "#types/player"
import type Chunk from "#types/tile/chunk"

type GameState = {
	hash: string
	player: Player
	currentChunk: Chunk
	pendingActions: ActionEvent[]
	lastProcessedCommitSha?: string
}

export type { GameState as default }
