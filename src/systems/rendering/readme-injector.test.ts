import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { createInitialGameState } from "#state/initializer"
import {
	generateReadmeSection,
	injectReadme,
	renderUnlockablesHtml,
	START_MARKER,
	END_MARKER,
} from "#systems/rendering/readme-injector"

describe("README Injector", () => {
	it("renders placeholder KEEP BREAKING when no unlockables exist", () => {
		const html = renderUnlockablesHtml([])
		assert.equal(html, "KEEP BREAKING.")
	})

	it("renders unlockables with symbols and hover tooltips", () => {
		const html = renderUnlockablesHtml(["🦆 Rubber Duck with a PhD", "🐱 Cat Sitting on Keyboard"])
		assert.ok(html.includes("🦆"))
		assert.ok(html.includes("🐱"))
		assert.ok(html.includes('title="🦆 Rubber Duck with a PhD (Common)"'))
		assert.ok(html.includes('title="🐱 Cat Sitting on Keyboard (Common)"'))
	})

	it("generates column section with stats on top, board in center, and collectibles on bottom", () => {
		const state = createInitialGameState({ username: "octocat" })
		state.player.progress.chunkIndex = 2
		state.player.progress.tileIndex = 14
		state.player.activity.currentStreak = 5
		state.player.progress.totalTilesBroken = 42

		const section = generateReadmeSection(state, "./custom-board.svg")
		assert.ok(section.startsWith(START_MARKER))
		assert.ok(section.endsWith(END_MARKER))
		assert.ok(section.includes("## BREAKME.md"))
		assert.ok(section.includes('<div align="center">'))
		assert.ok(
			section.includes('<table align="center" width="640" style="width: 100%; max-width: 640px;">'),
		)
		assert.ok(section.includes('<td align="center" width="25%">⛰️<i>CHUNK</i><b>#002</b></td>'))
		assert.ok(section.includes('<td align="center" width="25%">🪨<i>TILE</i><b>#014</b></td>'))
		assert.ok(section.includes('<td align="center" width="25%">🔥<i>STREAK</i><b>#005</b></td>'))
		assert.ok(section.includes('<td align="center" width="25%">⛏️<i>BROKEN</i><b>#042</b></td>'))
		assert.ok(section.includes('src="./custom-board.svg" width="640"'))
		assert.ok(section.includes("COLLECTED (000/250): KEEP BREAKING."))
	})

	it("renders collected count when player owns collectibles", () => {
		const state = createInitialGameState({ username: "octocat" })
		state.player.inventory.collectibles = ["🦆 Rubber Duck with a PhD", "🐱 Cat Sitting on Keyboard"]

		const section = generateReadmeSection(state, "./custom-board.svg")
		assert.ok(section.includes("COLLECTED (002/250):"))
		assert.ok(section.includes("🦆"))
		assert.ok(section.includes("🐱"))
	})

	it("injects generated section between markers in README", () => {
		const state = createInitialGameState({ username: "octocat" })
		const initialReadme = `# My Profile

${START_MARKER}
old content
${END_MARKER}

## About Me
`
		const result = injectReadme(initialReadme, state)
		assert.ok(result.includes("# My Profile"))
		assert.ok(result.includes("## About Me"))
		assert.ok(!result.includes("old content"))
		assert.ok(result.includes("COLLECTED (000/250): KEEP BREAKING."))
		assert.ok(result.includes('<td align="center" width="25%">⛰️<i>CHUNK</i><b>#000</b></td>'))
	})

	it("returns original content unchanged if markers are missing", () => {
		const state = createInitialGameState({ username: "octocat" })
		const initialReadme = "# My Profile Without Markers"
		const result = injectReadme(initialReadme, state)
		assert.equal(result, initialReadme)
	})
})
