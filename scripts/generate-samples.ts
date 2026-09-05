import { promises as fs } from "node:fs"
import path from "node:path"
import { createInitialGameState } from "#state/initializer"
import ChunkGenerator from "#systems/generation/chunk-generator"
import { renderSvg } from "#systems/rendering/board-renderer"
import { formatHslString, generateThemePalette } from "#systems/rendering/theme-generator"

const SAMPLES_DIR = path.resolve("samples")

type SampleConfig = {
	id: number
	username: string
	chunkIndex: number
	brokenCount: number
	streak: number
	label: string
}

const SAMPLE_CONFIGS: SampleConfig[] = [
	{ id: 1, username: "nebula-zen", chunkIndex: 0, brokenCount: 0, streak: 0, label: "Fresh Chunk #0 (Pristine)" },
	{ id: 2, username: "cyber-miner", chunkIndex: 0, brokenCount: 8, streak: 1, label: "Early Game #0 (8 Broken)" },
	{ id: 3, username: "solar-flare", chunkIndex: 0, brokenCount: 16, streak: 2, label: "Early Game #0 (16 Broken)" },
	{ id: 4, username: "glitch-hunter", chunkIndex: 1, brokenCount: 4, streak: 3, label: "Chunk #1 (4 Broken)" },
	{ id: 5, username: "octo-break", chunkIndex: 1, brokenCount: 22, streak: 4, label: "Chunk #1 (22 Broken)" },
	{ id: 6, username: "matrix-core", chunkIndex: 1, brokenCount: 48, streak: 5, label: "Chunk #1 (48 Broken)" },
	{ id: 7, username: "void-walker", chunkIndex: 2, brokenCount: 12, streak: 7, label: "Chunk #2 (12 Broken)" },
	{ id: 8, username: "pixel-craft", chunkIndex: 2, brokenCount: 35, streak: 8, label: "Chunk #2 (35 Broken)" },
	{ id: 9, username: "aurora-drift", chunkIndex: 2, brokenCount: 60, streak: 10, label: "Chunk #2 (60 Broken)" },
	{ id: 10, username: "phantom-byte", chunkIndex: 3, brokenCount: 7, streak: 12, label: "Chunk #3 (7 Broken)" },
	{ id: 11, username: "crimson-forge", chunkIndex: 3, brokenCount: 28, streak: 14, label: "Chunk #3 (28 Broken)" },
	{ id: 12, username: "emerald-pulse", chunkIndex: 3, brokenCount: 52, streak: 15, label: "Chunk #3 (52 Broken)" },
	{ id: 13, username: "sapphire-sky", chunkIndex: 4, brokenCount: 15, streak: 18, label: "Chunk #4 (15 Broken)" },
	{ id: 14, username: "amethyst-gale", chunkIndex: 4, brokenCount: 39, streak: 20, label: "Chunk #4 (39 Broken)" },
	{ id: 15, username: "topaz-shard", chunkIndex: 5, brokenCount: 2, streak: 22, label: "Chunk #5 (2 Broken)" },
	{ id: 16, username: "obsidian-veil", chunkIndex: 5, brokenCount: 31, streak: 25, label: "Chunk #5 (31 Broken)" },
	{ id: 17, username: "quantum-spark", chunkIndex: 6, brokenCount: 18, streak: 28, label: "Chunk #6 (18 Broken)" },
	{ id: 18, username: "hyper-nova", chunkIndex: 6, brokenCount: 44, streak: 30, label: "Chunk #6 (44 Broken)" },
	{ id: 19, username: "chrono-dash", chunkIndex: 7, brokenCount: 62, streak: 35, label: "Chunk #7 (62 Broken)" },
	{ id: 20, username: "vapor-wave", chunkIndex: 8, brokenCount: 10, streak: 40, label: "Chunk #8 (10 Broken)" },
	{ id: 21, username: "zenith-prime", chunkIndex: 9, brokenCount: 27, streak: 45, label: "Chunk #9 (27 Broken)" },
	{ id: 22, username: "echo-cascade", chunkIndex: 10, brokenCount: 55, streak: 50, label: "Chunk #10 (55 Broken)" },
	{ id: 23, username: "lunar-tide", chunkIndex: 12, brokenCount: 6, streak: 55, label: "Chunk #12 (6 Broken)" },
	{ id: 24, username: "stellar-dust", chunkIndex: 15, brokenCount: 33, streak: 60, label: "Chunk #15 (33 Broken)" },
	{ id: 25, username: "neon-horizon", chunkIndex: 20, brokenCount: 49, streak: 65, label: "Chunk #20 (49 Broken)" },
	{ id: 26, username: "vortex-seeker", chunkIndex: 25, brokenCount: 14, streak: 70, label: "Chunk #25 (14 Broken)" },
	{ id: 27, username: "abyss-watcher", chunkIndex: 30, brokenCount: 58, streak: 80, label: "Chunk #30 (58 Broken)" },
	{ id: 28, username: "radiant-dawn", chunkIndex: 42, brokenCount: 21, streak: 90, label: "Chunk #42 (21 Broken)" },
	{ id: 29, username: "titan-core", chunkIndex: 50, brokenCount: 41, streak: 100, label: "Chunk #50 (41 Broken)" },
	{ id: 30, username: "shadow-stride", chunkIndex: 64, brokenCount: 61, streak: 120, label: "Chunk #64 (61 Broken)" },
	{ id: 31, username: "prism-weaver", chunkIndex: 77, brokenCount: 26, streak: 150, label: "Chunk #77 (26 Broken)" },
	{ id: 32, username: "infinity-loop", chunkIndex: 100, brokenCount: 36, streak: 200, label: "Chunk #100 (36 Broken)" },
]

async function main(): Promise<void> {
	await fs.mkdir(SAMPLES_DIR, { recursive: true })

	console.log("=== Generating 32 BREAKME Sample Boards ===")

	const cardsHtml: string[] = []

	for (const config of SAMPLE_CONFIGS) {
		const totalBroken = config.chunkIndex * 63 + config.brokenCount
		const state = createInitialGameState({ username: config.username })
		state.player.progress.chunkIndex = config.chunkIndex
		state.player.progress.tileIndex = config.brokenCount
		state.player.progress.totalTilesBroken = totalBroken
		state.player.activity.currentStreak = config.streak

		const numericSeed = Number.parseInt(state.player.identity.baseSeed, 16) >>> 0
		const generator = new ChunkGenerator(numericSeed)
		const chunk = generator.generate(config.chunkIndex)

		for (let i = 0; i < Math.min(config.brokenCount, chunk.tiles.length); i++) {
			chunk.tiles[i].applyDamage(chunk.tiles[i].maxHp)
		}

		state.currentChunk = chunk

		const palette = generateThemePalette({ seedOrUsername: config.username })
		const svg = await renderSvg(state)
		const filename = `board-${String(config.id).padStart(2, "0")}.svg`
		const filePath = path.join(SAMPLES_DIR, filename)

		await fs.writeFile(filePath, svg, "utf-8")

		const bgHsl = formatHslString(palette.bg)
		const fgHsl = formatHslString(palette.fg)
		const accentHsl = formatHslString(palette.accent)

		console.log(
			`[Sample ${String(config.id).padStart(2, "0")}] Saved ${filename} -> User: "${config.username}", BG: ${palette.bgHue}°, FG: ${palette.fgHue}° (${palette.harmonyMode}), Ratio: ${palette.contrastRatio.toFixed(1)}:1`,
		)

		cardsHtml.push(`
		<div class="card">
			<div class="card-header">
				<h3>#${config.id} ${config.label}</h3>
				<div class="mock-stats">CHUNK#${config.chunkIndex} • TILE#${config.brokenCount} • 🔥STREAK#${config.streak} • BROKEN#${String(totalBroken).padStart(3, "0")}</div>
			</div>
			<div class="board-wrapper">
				<img src="./${filename}" alt="${config.label}" />
			</div>
			<div class="card-footer">
				<div class="info-row"><strong>Username:</strong> <span>${config.username}</span></div>
				<div class="info-row"><strong>Base Seed:</strong> <code>${state.player.identity.baseSeed}</code></div>
				<div class="info-row"><strong>Harmony:</strong> <span style="text-transform: capitalize;">${palette.harmonyMode}</span></div>
				<div class="info-row"><strong>Hues:</strong> <span>BG ${palette.bgHue}° / FG ${palette.fgHue}° (Ratio: ${palette.contrastRatio.toFixed(1)}:1)</span></div>
				<div class="swatches">
					<span class="swatch" style="background: ${bgHsl};" title="--bg: ${bgHsl}">BG: ${palette.bgHue}°</span>
					<span class="swatch" style="background: ${accentHsl};" title="--accent: ${accentHsl}">ACC</span>
					<span class="swatch" style="background: ${fgHsl}; color: #000;" title="--fg: ${fgHsl}">FG: ${palette.fgHue}°</span>
				</div>
			</div>
		</div>`)
	}

	const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>BREAKME Board Samples Gallery (32 Palettes & Stages)</title>
	<style>
		:root {
			--bg-page: #090d13;
			--card-bg: #131b26;
			--text-main: #f0f6fc;
			--text-dim: #8b949e;
			--border: #30363d;
		}
		* {
			box-sizing: border-box;
		}
		body {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
			background-color: var(--bg-page);
			color: var(--text-main);
			margin: 0;
			padding: 2rem;
		}
		header {
			text-align: center;
			margin-bottom: 2.5rem;
		}
		h1 {
			margin-bottom: 0.5rem;
			color: #58a6ff;
		}
		.subtitle {
			color: var(--text-dim);
		}
		.gallery {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			gap: 1.5rem;
			max-width: 1800px;
			margin: 0 auto;
		}
		.card {
			background: var(--card-bg);
			border: 1px solid var(--border);
			border-radius: 10px;
			padding: 1.25rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
		}
		.card-header {
			width: 100%;
			text-align: center;
			margin-bottom: 1rem;
		}
		.card-header h3 {
			margin: 0 0 0.4rem 0;
			font-size: 1rem;
			color: #79c0ff;
		}
		.mock-stats {
			font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
			font-size: 0.72rem;
			color: #d2a8ff;
			background: #1c2128;
			padding: 0.35rem 0.5rem;
			border-radius: 4px;
			border: 1px solid #30363d;
		}
		.board-wrapper {
			width: 100%;
			max-width: 240px;
			display: flex;
			justify-content: center;
			margin-bottom: 1rem;
		}
		.board-wrapper img {
			width: 100%;
			height: auto;
			border-radius: 8px;
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
		}
		.card-footer {
			width: 100%;
			border-top: 1px solid #21262d;
			padding-top: 0.75rem;
			font-size: 0.8rem;
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
		}
		.info-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--text-dim);
		}
		.info-row strong {
			color: var(--text-main);
		}
		.info-row code {
			background: #161b22;
			padding: 0.15rem 0.35rem;
			border-radius: 3px;
			font-size: 0.75rem;
			color: #e3b341;
		}
		.swatches {
			display: flex;
			gap: 0.5rem;
			margin-top: 0.4rem;
			justify-content: center;
		}
		.swatch {
			font-size: 0.65rem;
			font-weight: bold;
			padding: 0.2rem 0.5rem;
			border-radius: 4px;
			border: 1px solid rgba(255,255,255,0.15);
			text-shadow: 0 1px 2px rgba(0,0,0,0.8);
		}
	</style>
</head>
<body>
	<header>
		<h1>BREAKME.md Board Samples Gallery (32 Boards)</h1>
		<p class="subtitle">Mock stats above each board, distinct deterministic seeds and color palettes below</p>
	</header>
	<main class="gallery">
		${cardsHtml.join("\n")}
	</main>
</body>
</html>`

	await fs.writeFile(path.join(SAMPLES_DIR, "index.html"), galleryHtml, "utf-8")
	console.log(`\nGallery preview written to samples/index.html`)
}

await main()
