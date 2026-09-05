import { promises as fs } from "node:fs"
import Engine from "#engine"
import { renderSvg } from "#systems/rendering/board-renderer"

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
