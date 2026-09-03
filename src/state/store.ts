import type { GameState } from "#types/state"
import { access, readFile, writeFile } from "node:fs/promises"

const DEFAULT_STATE_FILE = "state.json"

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
		return JSON.parse(content) as GameState
	} catch {
		return null
	}
}

export async function saveState(state: GameState, filePath: string = DEFAULT_STATE_FILE): Promise<void> {
	const json = JSON.stringify(state, null, 2)
	await writeFile(filePath, json, "utf-8")
}

export { DEFAULT_STATE_FILE }
