import ActionEvent from "#types/action-event"
import type GameState from "#types/game-state"
import Tile from "#types/tile/tile"
import { access, readFile, writeFile } from "node:fs/promises"

const DEFAULT_STATE_FILE = "state.json"

export function reviveGameState(raw: any): GameState {
	if (raw?.currentChunk?.tiles) {
		raw.currentChunk.tiles = raw.currentChunk.tiles.map((t: any) =>
			t instanceof Tile ? t : Tile.fromJSON(t),
		)
	}
	if (raw?.pendingActions) {
		raw.pendingActions = raw.pendingActions.map((a: any) =>
			a instanceof ActionEvent ? a : ActionEvent.fromJSON(a),
		)
	}
	return raw as GameState
}

export async function doesStateExist(filePath: string = DEFAULT_STATE_FILE): Promise<boolean> {
	try {
		await access(filePath)
		return true
	} catch {
		return false
	}
}

export async function loadState(filePath: string = DEFAULT_STATE_FILE): Promise<GameState | null> {
	try {
		const content = await readFile(filePath, "utf-8")
		const raw = JSON.parse(content)
		return reviveGameState(raw)
	} catch {
		return null
	}
}

export async function saveState(state: GameState, filePath: string = DEFAULT_STATE_FILE): Promise<void> {
	const json = JSON.stringify(state, null, 2)
	await writeFile(filePath, json, "utf-8")
}

export { DEFAULT_STATE_FILE }
