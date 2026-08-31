import process from "node:process"

import GitHubEventProvider from "#providers/github"
import type { FetchEventsMode } from "#providers/provider"

const args = process.argv.slice(2)
const mode: FetchEventsMode = args.includes("--init") ? "init" : "cron"
const username = args.find((arg) => !arg.startsWith("--")) || "RVYA"
const token = process.env.GITHUB_TOKEN

const provider = new GitHubEventProvider()

console.log(`Fetching events for GitHub user: ${username} (mode: ${mode})...`)
if (token) {
	console.log(`Using GITHUB_TOKEN: ${token.slice(0, 4)}...${token.slice(-4)}`)
} else {
	console.log("No GITHUB_TOKEN found. Using unauthenticated public endpoint.")
}

try {
	const actions = await provider.fetchEvents({ username, mode, token })
	console.log(`Successfully fetched ${actions.length} action items (sorted chronologically):`)
	console.dir(actions, { depth: null })
} catch (error) {
	console.error("Error fetching events:", error)
	process.exit(1)
}
