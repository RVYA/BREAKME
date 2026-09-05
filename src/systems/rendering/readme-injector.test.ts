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
		assert.equal(html, "<p><i>KEEP BREAKING.</i></p>")
	})

	it("renders unlockables with symbols and hover tooltips", () => {
		const html = renderUnlockablesHtml(["Test Collectible #1", "Test Collectible #2"])
		assert.ok(html.includes("📦"))
		assert.ok(html.includes("💎"))
		assert.ok(html.includes('title="Test Collectible #1 (Common) — Let\'s see if everything works."'))
		assert.ok(html.includes('title="Test Collectible #2 (Common) — Let\'s see if everything *extra* works."'))
	})

	it("generates side-by-side section with stats and board image", () => {
		const state = createInitialGameState({ username: "octocat" })
		state.player.progress.chunkIndex = 2
		state.player.progress.tileIndex = 14
		state.player.activity.currentStreak = 5
		state.player.progress.totalTilesBroken = 142

		const section = generateReadmeSection(state, "./custom-board.svg")
		assert.ok(section.startsWith(START_MARKER))
		assert.ok(section.endsWith(END_MARKER))
		assert.ok(section.includes("<b>Chunk:</b> #2"))
		assert.ok(section.includes("<b>Tile:</b> 14/63"))
		assert.ok(section.includes("<b>Streak:</b> 🔥 5 day(s)"))
		assert.ok(section.includes("<b>Total Broken:</b> 142"))
		assert.ok(section.includes("<i>KEEP BREAKING.</i>"))
		assert.ok(section.includes('src="./custom-board.svg"'))
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
		assert.ok(result.includes("<i>KEEP BREAKING.</i>"))
	})

	it("returns original content unchanged if markers are missing", () => {
		const state = createInitialGameState({ username: "octocat" })
		const initialReadme = "# My Profile Without Markers"
		const result = injectReadme(initialReadme, state)
		assert.equal(result, initialReadme)
	})
})
