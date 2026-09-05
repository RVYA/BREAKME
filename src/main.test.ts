import assert from "node:assert/strict"
import { promises as fs } from "node:fs"
import os from "node:os"
import path from "node:path"
import { afterEach, beforeEach, describe, it } from "node:test"
import { run } from "#main"

describe("Main CLI Runner", () => {
	const originalEnv = { ...process.env }
	let tempDir: string

	beforeEach(async () => {
		tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "breakme-main-test-"))
		process.env = { ...originalEnv }
		process.exitCode = undefined
	})

	afterEach(async () => {
		process.env = { ...originalEnv }
		process.exitCode = undefined
		await fs.rm(tempDir, { recursive: true, force: true })
	})

	it("sets exitCode to 1 when no username is specified in environment", async () => {
		delete process.env.BREAKME_USERNAME
		delete process.env.GITHUB_ACTOR
		delete process.env.GITHUB_REPOSITORY_OWNER

		await run()
		assert.equal(process.exitCode, 1)
	})

	it("executes game loop, generates state.json and SVG when username is provided", async () => {
		const statePath = path.join(tempDir, "state.json")
		const svgPath = path.join(tempDir, "board.svg")

		process.env.BREAKME_USERNAME = "octocat"
		process.env.STATE_PATH = statePath
		process.env.SVG_PATH = svgPath

		await run()

		const stateExists = await fs
			.access(statePath)
			.then(() => true)
			.catch(() => false)
		const svgExists = await fs
			.access(svgPath)
			.then(() => true)
			.catch(() => false)

		assert.ok(stateExists)
		assert.ok(svgExists)

		const svgContent = await fs.readFile(svgPath, "utf-8")
		assert.ok(svgContent.includes("<svg"))
		assert.ok(svgContent.includes('viewBox="0 0 205 205"'))
	})

	it("injects board and unlockables section into README when markers exist", async () => {
		const statePath = path.join(tempDir, "state.json")
		const svgPath = path.join(tempDir, "board.svg")
		const readmePath = path.join(tempDir, "README.md")

		await fs.writeFile(
			readmePath,
			"# Profile\n\n<!-- BREAKME:START -->\nold\n<!-- BREAKME:END -->\n",
			"utf-8",
		)

		process.env.BREAKME_USERNAME = "octocat"
		process.env.STATE_PATH = statePath
		process.env.SVG_PATH = svgPath
		process.env.README_PATH = readmePath

		await run()

		const updatedReadme = await fs.readFile(readmePath, "utf-8")
		assert.ok(updatedReadme.includes("## BREAKME.md"))
		assert.ok(updatedReadme.includes("<code>KEEP BREAKING.</code>"))
		assert.ok(updatedReadme.includes("<code>chunk#0 tile#0 streak🔥0 broken: 000</code>"))
		assert.ok(updatedReadme.includes('src="./board.svg"'))
	})
})
