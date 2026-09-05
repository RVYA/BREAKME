import { loadSvgDefs } from "#systems/rendering/asset-loader"
import { BOARD_HEIGHT, BOARD_WIDTH, TOTAL_CELLS, getCellPosition } from "#systems/rendering/layout"
import { loadGameBoardStyles } from "#systems/rendering/style-loader"
import type GameState from "#types/game-state"
import type Chunk from "#types/tile/chunk"

function isGameState(target: Chunk | GameState): target is GameState {
	return "currentChunk" in target
}

export async function renderSvg(target: Chunk | GameState): Promise<string> {
	const chunk = isGameState(target) ? target.currentChunk : target
	const [styles, defs] = await Promise.all([loadGameBoardStyles(), loadSvgDefs()])

	const unbrokenTiles = chunk.tiles.filter((tile) => !tile.isBroken)
	const cellElements: string[] = []

	const charPos = getCellPosition(0)
	cellElements.push(
		`\t<g class="grid-cell" transform="translate(${charPos.x}, ${charPos.y})">\n\t\t<use href="#char-base" class="player fg" />\n\t</g>`,
	)

	for (let i = 0; i < TOTAL_CELLS - 1; i++) {
		const cellIndex = i + 1
		const pos = getCellPosition(cellIndex)

		if (i < unbrokenTiles.length) {
			const tile = unbrokenTiles[i]
			const shapeId = `tile-${tile.shape.name.toLowerCase()}`
			const bodyClass = tile.variant ? `variant-${tile.variant.name.toLowerCase()}` : "fg"
			const effectElement = tile.effect
				? `\n\t\t<use href="#${shapeId}" class="effect-${tile.effect.name.toLowerCase()}" fill="none" />`
				: ""

			cellElements.push(
				`\t<g class="grid-cell" transform="translate(${pos.x}, ${pos.y})">\n\t\t<use href="#${shapeId}" class="${bodyClass}" />${effectElement}\n\t</g>`,
			)
		} else {
			cellElements.push(
				`\t<g class="grid-cell" transform="translate(${pos.x}, ${pos.y})">\n\t\t<use href="#tile-hidden" class="accent" />\n\t</g>`,
			)
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}" width="100%" height="100%">
${defs}
<style>
${styles}
</style>
<rect width="${BOARD_WIDTH}" height="${BOARD_HEIGHT}" rx="8" ry="8" class="bg" />
${cellElements.join("\n")}
</svg>`
}

export { BOARD_HEIGHT, BOARD_WIDTH, TOTAL_CELLS, getCellPosition }
