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
		const title = `${name} (${rarityLabel}) — ${def.description}`
		return `<span title="${title}">${def.symbol}</span>`
	})

	return items.join(" ")
}

export function generateReadmeSection(state: GameState, svgPath = "./BREAKME-board.svg"): string {
	const chunkIndex = state.player.progress.chunkIndex
	const tileIndex = state.player.progress.tileIndex
	const currentStreak = state.player.activity.currentStreak
	const totalBroken = String(state.player.progress.totalTilesBroken).padStart(3, "0")
	const unlockablesHtml = renderUnlockablesHtml(state.player.inventory.collectibles)

	return `${START_MARKER}
<div align="center" style="width: 100%;">

## BREAKME.md

<table align="center" width="100%" style="width: 100%; table-layout: fixed;">
  <tr>
    <td width="50%" align="left" valign="middle">
      UNLOCKED: ${unlockablesHtml}
    </td>
    <td width="50%" align="center" valign="middle">
      <img src="${svgPath}" width="480" alt="BREAKME.md Board" />
    </td>
  </tr>
</table>

<p>CHUNK#${chunkIndex} • TILE#${tileIndex} • 🔥STREAK#${currentStreak} • BROKEN#${totalBroken}</p>

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
