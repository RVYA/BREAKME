import { COLLECTIBLES } from "#data/collectibles"
import type GameState from "#types/game-state"

export const START_MARKER = "<!-- BREAKME:START -->"
export const END_MARKER = "<!-- BREAKME:END -->"

export function renderUnlockablesHtml(collectibles: string[]): string {
	if (collectibles.length === 0) {
		return "<p><i>KEEP BREAKING.</i></p>"
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

	return `<p>${items.join(" ")}</p>`
}

export function generateReadmeSection(state: GameState, svgPath = "./BREAKME-board.svg"): string {
	const chunkIndex = state.player.progress.chunkIndex
	const tileIndex = state.player.progress.tileIndex
	const currentStreak = state.player.activity.currentStreak
	const totalBroken = state.player.progress.totalTilesBroken
	const unlockablesHtml = renderUnlockablesHtml(state.player.inventory.collectibles)

	return `${START_MARKER}
<table>
  <tr>
    <td valign="top" width="55%">
      <h3>⛏️ BREAKME.md</h3>
      <p>
        <b>Chunk:</b> #${chunkIndex} &nbsp;|&nbsp; <b>Tile:</b> ${tileIndex}/63<br/>
        <b>Streak:</b> 🔥 ${currentStreak} day(s) &nbsp;|&nbsp; <b>Total Broken:</b> ${totalBroken}
      </p>
      <h4>✨ Unlockables</h4>
      ${unlockablesHtml}
    </td>
    <td valign="top" align="center" width="45%">
      <img src="${svgPath}" width="205" alt="BREAKME.md Board" />
    </td>
  </tr>
</table>
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
