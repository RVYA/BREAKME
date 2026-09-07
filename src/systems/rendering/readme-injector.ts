import { COLLECTIBLES } from "#data/collectibles"
import type GameState from "#types/game-state"

export const START_MARKER = "<!-- BREAKME:START -->"
export const END_MARKER = "<!-- BREAKME:END -->"

export function renderUnlockablesHtml(collectibles: string[]): string {
	if (collectibles.length === 0) {
		return "KEEP BREAKING."
	}

	const items = collectibles.map((name) => {
		const def = COLLECTIBLES[name as keyof typeof COLLECTIBLES]
		if (!def) {
			return `<span>${name}</span>`
		}
		const rarityLabel = def.rarity.charAt(0).toUpperCase() + def.rarity.slice(1)
		const title = `${name} (${rarityLabel})`
		return `<span title="${title}">${def.symbol}</span>`
	})

	return items.join(" ")
}

export function generateReadmeSection(state: GameState, svgPath = "./BREAKME-board.svg"): string {
	const chunkIndex = String(state.player.progress.chunkIndex).padStart(3, "0")
	const tileIndex = String(state.player.progress.tileIndex).padStart(3, "0")
	const currentStreak = String(state.player.activity.currentStreak).padStart(3, "0")
	const totalBroken = String(state.player.progress.totalTilesBroken).padStart(3, "0")
	const totalCollectibles = Object.keys(COLLECTIBLES).length
	const collectedCount = state.player.inventory.collectibles.length
	const collectedFormatted = String(collectedCount).padStart(3, "0")
	const totalFormatted = String(totalCollectibles).padStart(3, "0")
	const unlockablesHtml = renderUnlockablesHtml(state.player.inventory.collectibles)

	return `${START_MARKER}
<div align="center">

## BREAKME.md

<table align="center" width="640" style="width: 100%; max-width: 640px;">
  <tr>
    <td align="center" width="25%">⛰️<i>CHUNK</i><b>#${chunkIndex}</b></td>
    <td align="center" width="25%">🪨<i>TILE</i><b>#${tileIndex}</b></td>
    <td align="center" width="25%">🔥<i>STREAK</i><b>#${currentStreak}</b></td>
    <td align="center" width="25%">⛏️<i>BROKEN</i><b>#${totalBroken}</b></td>
  </tr>
  <tr>
    <td colspan="4" align="center">
      <img src="${svgPath}" width="640" alt="BREAKME.md Board" />
    </td>
  </tr>
  <tr>
    <td colspan="4" align="center">
      COLLECTED (${collectedFormatted}/${totalFormatted}): ${unlockablesHtml}
    </td>
  </tr>
</table>

</div>
${END_MARKER}`
}

export function injectReadme(readmeContent: string, state: GameState, svgPath = "./BREAKME-board.svg"): string {
	const startIndex = readmeContent.indexOf(START_MARKER)
	const endIndex = readmeContent.indexOf(END_MARKER)

	if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
		return readmeContent
	}

	const section = generateReadmeSection(state, svgPath)
	const before = readmeContent.slice(0, startIndex)
	const after = readmeContent.slice(endIndex + END_MARKER.length)

	return `${before}${section}${after}`
}
