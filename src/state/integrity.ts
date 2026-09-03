import { createHmac } from "node:crypto"

import type GameState from "#types/game-state"

export function computeStateHash(cleanState: Omit<GameState, "hash">, secretKey: string): string {
	const canonicalJson = JSON.stringify(cleanState)
	return createHmac("sha256", secretKey).update(canonicalJson).digest("hex")
}

export function signGameState(state: GameState, secretKey: string = state.player.identity.baseSeed): GameState {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { hash: _, ...cleanState } = state

	state.hash = computeStateHash(cleanState, secretKey)
	return state
}

export function verifyGameState(state: GameState, secretKey: string = state.player.identity.baseSeed): boolean {
	const { hash, ...cleanState } = state
	if (!hash) return false

	const expectedHash = computeStateHash(cleanState, secretKey)
	return hash === expectedHash
}
