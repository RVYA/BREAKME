import { promises as fs } from "node:fs"
import path from "node:path"
import Engine from "#engine"
import { renderSvg } from "#systems/rendering/board-renderer"
import { injectReadme } from "#systems/rendering/readme-injector"

export async function run(): Promise<void> {
	const username = process.env.BREAKME_USERNAME || process.env.GITHUB_ACTOR || process.env.GITHUB_REPOSITORY_OWNER
	if (!username) {
		console.error("Error: Target username not specified. Set BREAKME_USERNAME or GITHUB_ACTOR.")
		process.exitCode = 1
		return
	}

	const token = process.env.BREAKME_PAT || process.env.GITHUB_TOKEN
	const statePath = process.env.STATE_PATH || "state.json"
	const svgPath = process.env.SVG_PATH || "BREAKME-board.svg"
	const readmePath = process.env.README_PATH || "README.md"
	const secretKey = process.env.BREAKME_SECRET_KEY

	const engine = new Engine({ username, token, statePath })
	await engine.init()

	const mode = engine.isInitialRun ? "init" : "cron"
	const fetchedActions = await engine.fetchEvents()
	const turnResult = engine.processTurn(secretKey)
	await engine.save()

	if (engine.state) {
		const svg = await renderSvg(engine.state)
		await fs.writeFile(svgPath, svg, "utf-8")

		try {
			const readme = await fs.readFile(readmePath, "utf-8")
			const relSvg = path.relative(path.dirname(path.resolve(readmePath)), path.resolve(svgPath))
			const formattedSvgPath = relSvg.startsWith(".") ? relSvg : `./${relSvg}`
			const updatedReadme = injectReadme(readme, engine.state, formattedSvgPath)
			if (updatedReadme !== readme) {
				await fs.writeFile(readmePath, updatedReadme, "utf-8")
			}
		} catch {
			// Ignore if README.md does not exist
		}
	}

	console.log(`[BREAKME] Run Complete (${mode} mode)`)
	console.log(`- Player: ${username}`)
	console.log(`- Actions Ingested: ${fetchedActions.length}`)
	console.log(`- Actions Processed: ${turnResult.actionsProcessed}`)
	console.log(`- Tiles Broken: ${turnResult.breakEvents.length}`)
	console.log(`- Collectibles Dropped: ${turnResult.dropEvents.length}`)
	if (engine.state) {
		console.log(`- Current Chunk: #${engine.state.player.progress.chunkIndex}`)
		console.log(`- Active Streak: ${engine.state.player.activity.currentStreak} day(s)`)
	}
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) {
	await run()
}
