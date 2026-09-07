import assert from "node:assert/strict"
import { describe, it } from "node:test"
import ChunkGenerator from "#systems/generation/chunk-generator"
import {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	MARGIN_X,
	MARGIN_Y,
	PLAYER_SCALE,
	TILE_SCALE,
	VISIBLE_TILE_SLOTS,
	renderSvg,
} from "#systems/rendering/board-renderer"
import type GameState from "#types/game-state"
import Tile from "#types/tile/tile"

describe("Board Renderer (System)", () => {
	it("renders a valid SVG root element with 328x164 viewBox, defs, and bundled stylesheet", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)

		assert.ok(svg.startsWith("<svg"))
		assert.ok(svg.endsWith("</svg>"))
		assert.equal(BOARD_WIDTH, 328)
		assert.equal(BOARD_HEIGHT, 164)
		assert.ok(svg.includes(`viewBox="0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}"`))
		assert.ok(svg.includes('id="char-base"'))
		assert.ok(svg.includes('id="tile-base"'))
		assert.ok(svg.includes('id="tile-hidden"'))
		assert.ok(svg.includes('class="bg"'))
		assert.ok(svg.includes(".variant-broken"))
		assert.ok(svg.includes(".effect-shiny"))
	})

	it("always renders 4x player character sprite at cell (6, 4) with scale(1.8)", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)

		assert.equal(MARGIN_X, 6)
		assert.equal(MARGIN_Y, 4)
		assert.equal(PLAYER_SCALE, 1.8)
		assert.equal(TILE_SCALE, 0.8)
		assert.ok(
			svg.includes(
				`<g class="grid-cell player-cell" transform="translate(${MARGIN_X}, ${MARGIN_Y}) scale(${PLAYER_SCALE})">\n\t\t<use href="#char-base" class="player fg" />\n\t</g>`,
			),
		)
		assert.ok(svg.includes("@keyframes player-sway"))
		assert.ok(svg.includes(".player"))
	})

	it("renders all 124 visible slots as revealed tiles when chunk is intact", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)
		const svg = await renderSvg(chunk)

		const totalCells = svg.match(/<g class="grid-cell/g)
		assert.equal(totalCells?.length, 1 + VISIBLE_TILE_SLOTS)

		const hiddenTiles = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenTiles?.length ?? 0, 0)
	})

	it("renders character plus visible unbroken tiles, and fills remaining missing cells with hidden placeholders", async () => {
		const generator = new ChunkGenerator(12345)
		const chunk = generator.generate(0)

		for (let i = 0; i < 23; i++) {
			chunk.tiles[i].applyDamage(chunk.tiles[i].maxHp)
		}

		const unbrokenCount = chunk.tiles.filter((t) => !t.isBroken).length
		assert.equal(unbrokenCount, 128 - 23) // 105 unbroken

		const svg = await renderSvg(chunk)
		const totalCells = svg.match(/<g class="grid-cell/g)
		assert.equal(totalCells?.length, 1 + VISIBLE_TILE_SLOTS)

		const hiddenTiles = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenTiles?.length, VISIBLE_TILE_SLOTS - unbrokenCount)
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

		const totalCells = svg.match(/<g class="grid-cell/g)
		assert.equal(totalCells?.length, 1 + VISIBLE_TILE_SLOTS)

		const hiddenMatches = svg.match(/<use href="#tile-hidden" class="accent" \/>/g)
		assert.equal(hiddenMatches?.length, VISIBLE_TILE_SLOTS - 1)
	})

	it("renders all unbroken tiles with variant and effect styling", async () => {
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
		assert.equal(hiddenMatches?.length, VISIBLE_TILE_SLOTS - 12)

		const totalCells = svg.match(/<g class="grid-cell/g)
		assert.equal(totalCells?.length, 1 + VISIBLE_TILE_SLOTS)
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
		const cellMatches = svg.match(/<g class="grid-cell/g)
		assert.equal(cellMatches?.length, 1 + VISIBLE_TILE_SLOTS)
	})

	it("includes all registered tile shapes in defs and renders distinct shapes", async () => {
		const tiles = [
			new Tile(0, "Bread"),
			new Tile(1, "Donut"),
			new Tile(2, "Sun"),
			new Tile(3, "Sapphire"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('id="tile-bread"'))
		assert.ok(svg.includes('id="tile-donut"'))
		assert.ok(svg.includes('id="tile-sun"'))
		assert.ok(svg.includes('id="tile-sapphire"'))
		assert.ok(svg.includes('href="#tile-bread"'))
		assert.ok(svg.includes('href="#tile-donut"'))
		assert.ok(svg.includes('href="#tile-sun"'))
		assert.ok(svg.includes('href="#tile-sapphire"'))
	})

	it("renders tiles with new variant gradient styles and includes gradient defs", async () => {
		const tiles = [
			new Tile(0, "Base", "Radiated"),
			new Tile(1, "Base", "Sunburn"),
			new Tile(2, "Base", "Zebra"),
			new Tile(3, "Base", "Metal"),
			new Tile(4, "Base", "Wood"),
			new Tile(5, "Base", "Candy"),
			new Tile(6, "Base", "BlackHole"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('id="gradient-radiated"'))
		assert.ok(svg.includes('id="gradient-sunburn"'))
		assert.ok(svg.includes('id="gradient-zebra"'))
		assert.ok(svg.includes('id="gradient-metal"'))
		assert.ok(svg.includes('id="gradient-wood"'))
		assert.ok(svg.includes('id="gradient-candy"'))
		assert.ok(svg.includes('id="gradient-blackhole"'))

		assert.ok(svg.includes('class="variant-radiated"'))
		assert.ok(svg.includes('class="variant-sunburn"'))
		assert.ok(svg.includes('class="variant-zebra"'))
		assert.ok(svg.includes('class="variant-metal"'))
		assert.ok(svg.includes('class="variant-wood"'))
		assert.ok(svg.includes('class="variant-candy"'))
		assert.ok(svg.includes('class="variant-blackhole"'))
	})

	it("renders all 11 additional gradient variants with valid SVG defs and classes", async () => {
		const tiles = [
			new Tile(0, "Base", "Moss"),
			new Tile(1, "Base", "Sandstone"),
			new Tile(2, "Base", "Copper"),
			new Tile(3, "Base", "Amethyst"),
			new Tile(4, "Base", "Glacier"),
			new Tile(5, "Base", "Obsidian"),
			new Tile(6, "Base", "Magma"),
			new Tile(7, "Base", "CyberNeon"),
			new Tile(8, "Base", "Plasma"),
			new Tile(9, "Base", "Holographic"),
			new Tile(10, "Base", "Supernova"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('id="gradient-moss"'))
		assert.ok(svg.includes('id="gradient-sandstone"'))
		assert.ok(svg.includes('id="gradient-copper"'))
		assert.ok(svg.includes('id="gradient-amethyst"'))
		assert.ok(svg.includes('id="gradient-glacier"'))
		assert.ok(svg.includes('id="gradient-obsidian"'))
		assert.ok(svg.includes('id="gradient-magma"'))
		assert.ok(svg.includes('id="gradient-cyberneon"'))
		assert.ok(svg.includes('id="gradient-plasma"'))
		assert.ok(svg.includes('id="gradient-holographic"'))
		assert.ok(svg.includes('id="gradient-supernova"'))

		assert.ok(svg.includes('class="variant-moss"'))
		assert.ok(svg.includes('class="variant-sandstone"'))
		assert.ok(svg.includes('class="variant-copper"'))
		assert.ok(svg.includes('class="variant-amethyst"'))
		assert.ok(svg.includes('class="variant-glacier"'))
		assert.ok(svg.includes('class="variant-obsidian"'))
		assert.ok(svg.includes('class="variant-magma"'))
		assert.ok(svg.includes('class="variant-cyberneon"'))
		assert.ok(svg.includes('class="variant-plasma"'))
		assert.ok(svg.includes('class="variant-holographic"'))
		assert.ok(svg.includes('class="variant-supernova"'))
	})

	it("renders all 20 computational, mineral, and cosmic variants with valid defs and classes", async () => {
		const tiles = [
			new Tile(0, "Base", "Blueprint"),
			new Tile(1, "Base", "Coral"),
			new Tile(2, "Base", "Terminal"),
			new Tile(3, "Base", "Amber"),
			new Tile(4, "Base", "RoseGold"),
			new Tile(5, "Base", "Jade"),
			new Tile(6, "Base", "Abyssal"),
			new Tile(7, "Base", "Circuit"),
			new Tile(8, "Base", "Quicksilver"),
			new Tile(9, "Base", "Aurora"),
			new Tile(10, "Base", "Ember"),
			new Tile(11, "Base", "Damascus"),
			new Tile(12, "Base", "Glitch"),
			new Tile(13, "Base", "Bismuth"),
			new Tile(14, "Base", "SolarFlare"),
			new Tile(15, "Base", "Toxic"),
			new Tile(16, "Base", "Vaporwave"),
			new Tile(17, "Base", "Nebula"),
			new Tile(18, "Base", "Mithril"),
			new Tile(19, "Base", "DarkMatter"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('id="gradient-blueprint"'))
		assert.ok(svg.includes('id="gradient-coral"'))
		assert.ok(svg.includes('id="gradient-terminal"'))
		assert.ok(svg.includes('id="gradient-amber"'))
		assert.ok(svg.includes('id="gradient-rosegold"'))
		assert.ok(svg.includes('id="gradient-jade"'))
		assert.ok(svg.includes('id="gradient-abyssal"'))
		assert.ok(svg.includes('id="gradient-circuit"'))
		assert.ok(svg.includes('id="gradient-quicksilver"'))
		assert.ok(svg.includes('id="gradient-aurora"'))
		assert.ok(svg.includes('id="gradient-ember"'))
		assert.ok(svg.includes('id="gradient-damascus"'))
		assert.ok(svg.includes('id="gradient-glitch"'))
		assert.ok(svg.includes('id="gradient-bismuth"'))
		assert.ok(svg.includes('id="gradient-solarflare"'))
		assert.ok(svg.includes('id="gradient-toxic"'))
		assert.ok(svg.includes('id="gradient-vaporwave"'))
		assert.ok(svg.includes('id="gradient-nebula"'))
		assert.ok(svg.includes('id="gradient-mithril"'))
		assert.ok(svg.includes('id="gradient-darkmatter"'))

		assert.ok(svg.includes('class="variant-blueprint"'))
		assert.ok(svg.includes('class="variant-coral"'))
		assert.ok(svg.includes('class="variant-terminal"'))
		assert.ok(svg.includes('class="variant-amber"'))
		assert.ok(svg.includes('class="variant-rosegold"'))
		assert.ok(svg.includes('class="variant-jade"'))
		assert.ok(svg.includes('class="variant-abyssal"'))
		assert.ok(svg.includes('class="variant-circuit"'))
		assert.ok(svg.includes('class="variant-quicksilver"'))
		assert.ok(svg.includes('class="variant-aurora"'))
		assert.ok(svg.includes('class="variant-ember"'))
		assert.ok(svg.includes('class="variant-damascus"'))
		assert.ok(svg.includes('class="variant-glitch"'))
		assert.ok(svg.includes('class="variant-bismuth"'))
		assert.ok(svg.includes('class="variant-solarflare"'))
		assert.ok(svg.includes('class="variant-toxic"'))
		assert.ok(svg.includes('class="variant-vaporwave"'))
		assert.ok(svg.includes('class="variant-nebula"'))
		assert.ok(svg.includes('class="variant-mithril"'))
		assert.ok(svg.includes('class="variant-darkmatter"'))
	})

	it("renders all 16 nature and cultural variants with valid defs and classes", async () => {
		const tiles = [
			new Tile(0, "Base", "Terracotta"),
			new Tile(1, "Base", "Sakura"),
			new Tile(2, "Base", "PolkaDot"),
			new Tile(3, "Base", "Camo"),
			new Tile(4, "Base", "Bandana"),
			new Tile(5, "Base", "Seigaiha"),
			new Tile(6, "Base", "Honeycomb"),
			new Tile(7, "Base", "Shibori"),
			new Tile(8, "Base", "Monstera"),
			new Tile(9, "Base", "Marble"),
			new Tile(10, "Base", "Tortoise"),
			new Tile(11, "Base", "Tartan"),
			new Tile(12, "Base", "Houndstooth"),
			new Tile(13, "Base", "Leopard"),
			new Tile(14, "Base", "Zellige"),
			new Tile(15, "Base", "Kintsugi"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes('id="gradient-terracotta"'))
		assert.ok(svg.includes('id="gradient-sakura"'))
		assert.ok(svg.includes('id="pattern-polkadot"'))
		assert.ok(svg.includes('id="gradient-camo"'))
		assert.ok(svg.includes('id="gradient-bandana"'))
		assert.ok(svg.includes('id="gradient-seigaiha"'))
		assert.ok(svg.includes('id="pattern-honeycomb"'))
		assert.ok(svg.includes('id="gradient-shibori"'))
		assert.ok(svg.includes('id="gradient-monstera"'))
		assert.ok(svg.includes('id="gradient-marble"'))
		assert.ok(svg.includes('id="gradient-tortoise"'))
		assert.ok(svg.includes('id="pattern-tartan"'))
		assert.ok(svg.includes('id="pattern-houndstooth"'))
		assert.ok(svg.includes('id="pattern-leopard"'))
		assert.ok(svg.includes('id="pattern-zellige"'))
		assert.ok(svg.includes('id="gradient-kintsugi"'))

		assert.ok(svg.includes('class="variant-terracotta"'))
		assert.ok(svg.includes('class="variant-sakura"'))
		assert.ok(svg.includes('class="variant-polkadot"'))
		assert.ok(svg.includes('class="variant-camo"'))
		assert.ok(svg.includes('class="variant-bandana"'))
		assert.ok(svg.includes('class="variant-seigaiha"'))
		assert.ok(svg.includes('class="variant-honeycomb"'))
		assert.ok(svg.includes('class="variant-shibori"'))
		assert.ok(svg.includes('class="variant-monstera"'))
		assert.ok(svg.includes('class="variant-marble"'))
		assert.ok(svg.includes('class="variant-tortoise"'))
		assert.ok(svg.includes('class="variant-tartan"'))
		assert.ok(svg.includes('class="variant-houndstooth"'))
		assert.ok(svg.includes('class="variant-leopard"'))
		assert.ok(svg.includes('class="variant-zellige"'))
		assert.ok(svg.includes('class="variant-kintsugi"'))
	})

	it("renders all 19 tile effects with valid CSS classes and keyframes", async () => {
		const tiles = [
			new Tile(0, "Base", undefined, "Negative"),
			new Tile(1, "Base", undefined, "Shiny"),
			new Tile(2, "Base", undefined, "Hot"),
			new Tile(3, "Base", undefined, "Cold"),
			new Tile(4, "Base", undefined, "Wet"),
			new Tile(5, "Base", undefined, "Armored"),
			new Tile(6, "Base", undefined, "Brittle"),
			new Tile(7, "Base", undefined, "Chained"),
			new Tile(8, "Base", undefined, "Barbed"),
			new Tile(9, "Base", undefined, "Encased"),
			new Tile(10, "Base", undefined, "Levitating"),
			new Tile(11, "Base", undefined, "Stasis"),
			new Tile(12, "Base", undefined, "Echo"),
			new Tile(13, "Base", undefined, "Overcharged"),
			new Tile(14, "Base", undefined, "Vampiric"),
			new Tile(15, "Base", undefined, "Blessed"),
			new Tile(16, "Base", undefined, "Volatile"),
			new Tile(17, "Base", undefined, "Phase"),
			new Tile(18, "Base", undefined, "Cursed"),
		]
		const chunk = {
			index: 0,
			tiles,
			createdAt: "2026-08-31T20:00:00.000Z",
			isCleared: false,
		}

		const svg = await renderSvg(chunk)
		assert.ok(svg.includes(".effect-negative"))
		assert.ok(svg.includes(".effect-shiny"))
		assert.ok(svg.includes(".effect-hot"))
		assert.ok(svg.includes(".effect-cold"))
		assert.ok(svg.includes(".effect-wet"))
		assert.ok(svg.includes(".effect-armored"))
		assert.ok(svg.includes(".effect-brittle"))
		assert.ok(svg.includes(".effect-chained"))
		assert.ok(svg.includes(".effect-barbed"))
		assert.ok(svg.includes(".effect-encased"))
		assert.ok(svg.includes(".effect-levitating"))
		assert.ok(svg.includes(".effect-stasis"))
		assert.ok(svg.includes(".effect-echo"))
		assert.ok(svg.includes(".effect-overcharged"))
		assert.ok(svg.includes(".effect-vampiric"))
		assert.ok(svg.includes(".effect-blessed"))
		assert.ok(svg.includes(".effect-volatile"))
		assert.ok(svg.includes(".effect-phase"))
		assert.ok(svg.includes(".effect-cursed"))

		assert.ok(svg.includes("@keyframes effect-levitate"))
		assert.ok(svg.includes("@keyframes effect-overcharged-pulse"))
		assert.ok(svg.includes("@keyframes effect-phase-flow"))

		assert.ok(svg.includes('class="effect-negative"'))
		assert.ok(svg.includes('class="effect-shiny"'))
		assert.ok(svg.includes('class="effect-hot"'))
		assert.ok(svg.includes('class="effect-cold"'))
		assert.ok(svg.includes('class="effect-wet"'))
		assert.ok(svg.includes('class="effect-armored"'))
		assert.ok(svg.includes('class="effect-brittle"'))
		assert.ok(svg.includes('class="effect-chained"'))
		assert.ok(svg.includes('class="effect-barbed"'))
		assert.ok(svg.includes('class="effect-encased"'))
		assert.ok(svg.includes('class="effect-levitating"'))
		assert.ok(svg.includes('class="effect-stasis"'))
		assert.ok(svg.includes('class="effect-echo"'))
		assert.ok(svg.includes('class="effect-overcharged"'))
		assert.ok(svg.includes('class="effect-vampiric"'))
		assert.ok(svg.includes('class="effect-blessed"'))
		assert.ok(svg.includes('class="effect-volatile"'))
		assert.ok(svg.includes('class="effect-phase"'))
		assert.ok(svg.includes('class="effect-cursed"'))
	})
})
