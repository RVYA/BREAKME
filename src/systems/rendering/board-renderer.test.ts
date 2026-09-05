import assert from "node:assert/strict"
import { describe, it } from "node:test"
import ChunkGenerator from "#systems/generation/chunk-generator"
import {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	getCellPosition,
	renderSvg,
} from "#systems/rendering/board-renderer"
import type GameState from "#types/game-state"
import Tile from "#types/tile/tile"

describe("Board Renderer (System)", () => {
	it("renders a valid SVG root element with 205x205 viewBox, defs, and bundled stylesheet", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)

		assert.ok(svg.startsWith("<svg"))
		assert.ok(svg.endsWith("</svg>"))
		assert.equal(BOARD_WIDTH, 205)
		assert.equal(BOARD_HEIGHT, 205)
		assert.ok(svg.includes(`viewBox="0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}"`))
		assert.ok(svg.includes('id="char-base"'))
		assert.ok(svg.includes('id="tile-base"'))
		assert.ok(svg.includes('id="tile-hidden"'))
		assert.ok(svg.includes('class="bg"'))
		assert.ok(svg.includes(".variant-broken"))
		assert.ok(svg.includes(".effect-shiny"))
	})

	it("always renders character sprite at cell 0 (first grid cell at 5, 5)", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)
		const pos0 = getCellPosition(0)

		assert.equal(pos0.x, 5)
		assert.equal(pos0.y, 5)
		assert.ok(
			svg.includes(
				`<g class="grid-cell" transform="translate(${pos0.x}, ${pos0.y})">\n\t\t<use href="#char-base" class="player fg" />\n\t</g>`,
			),
		)
		assert.ok(svg.includes("@keyframes player-sway"))
		assert.ok(svg.includes(".player"))
	})

	it("renders all remaining unbroken tiles as revealed tiles when chunk is intact", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)

		const totalCells = svg.match(/<g class="grid-cell"/g)
		assert.equal(totalCells?.length, 64)

		const hiddenTiles = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenTiles?.length ?? 0, 0)
	})

	it("renders character plus remaining unbroken tiles, and fills remaining missing cells with hidden placeholders", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)

		for (let i = 0; i < 23; i++) {
			chunk.tiles[i].applyDamage(chunk.tiles[i].maxHp)
		}

		const unbrokenCount = chunk.tiles.filter((t) => !t.isBroken).length
		assert.equal(unbrokenCount, 41)

		const svg = await renderSvg(chunk)
		const totalCells = svg.match(/<g class="grid-cell"/g)
		assert.equal(totalCells?.length, 64)

		const hiddenTiles = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenTiles?.length, 64 - 1 - unbrokenCount)
	})

	it("attaches variant and effect styling to visible tile cells", async () => {
		const tiles: Tile[] = [new Tile(0, "Base", "Gold", "Shiny")]

		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('class="variant-gold"'))
		assert.ok(svg.includes('class="effect-shiny"'))

		const totalCells = svg.match(/<g class="grid-cell"/g)
		assert.equal(totalCells?.length, 64)

		const hiddenMatches = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenMatches?.length, 62)
	})

	it("renders all unbroken tiles with variant and effect styling without fog of war cutoff", async () => {
		const tiles = Array.from({ length: 12 }, (_, i) => new Tile(i, "Base", "Gold", "Shiny"))

		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		const variantMatches = svg.match(/class="variant-gold"/g)
		assert.equal(variantMatches?.length, 12)

		const effectMatches = svg.match(/class="effect-shiny"/g)
		assert.equal(effectMatches?.length, 12)

		const hiddenMatches = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenMatches?.length, 63 - 12)

		const totalCells = svg.match(/<g class="grid-cell"/g)
		assert.equal(totalCells?.length, 64)
	})

	it("renders correctly from a GameState object", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)

		const gameState: GameState = {
			hash: "mockhash",
			player: {
				identity: { username: "testuser", baseSeed: "seed123", createdAt: "2026-08-31T20:00:00.000Z" },
				progress: { chunkIndex: 0, tileIndex: 0, totalTilesBroken: 0 },
				activity: {
					currentStreak: 1,
					highestStreak: 1,
					lastActiveDate: "2026-09-04",
					mostDamage: 0,
				},
				inventory: { collectibles: [] },
			},
			currentChunk: chunk,
			collectiblePool: {},
			pendingActions: [],
		}

		const svg = await renderSvg(gameState)
		assert.ok(svg.includes('class="fg"'))
		const cellMatches = svg.match(/<g class="grid-cell"/g)
		assert.equal(cellMatches?.length, 64)
	})
})
