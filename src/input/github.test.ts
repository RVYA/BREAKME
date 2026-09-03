import assert from "node:assert/strict"
import { afterEach, beforeEach, describe, it } from "node:test"
import GitHubEventProvider from "#input/github"

describe("GitHubEventProvider", () => {
	let provider: GitHubEventProvider
	let originalFetch: typeof globalThis.fetch

	beforeEach(() => {
		provider = new GitHubEventProvider()
		originalFetch = globalThis.fetch
	})

	afterEach(() => {
		globalThis.fetch = originalFetch
	})

	it("fetches default limit of 8 in cron mode and returns items in chronological order", async () => {
		const capturedUrls: string[] = []
		const mockResponse = [
			{
				id: "102",
				type: "PushEvent",
				created_at: "2026-08-31T14:00:00Z",
				payload: {
					commits: [{ sha: "sha2", message: "second commit", distinct: true }],
				},
			},
			{
				id: "101",
				type: "PushEvent",
				created_at: "2026-08-31T12:00:00Z",
				payload: {
					commits: [{ sha: "sha1", message: "first commit", distinct: true }],
				},
			},
		]

		globalThis.fetch = async (input) => {
			capturedUrls.push(String(input))
			return new Response(JSON.stringify(mockResponse), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})
		}

		const actions = await provider.fetchEvents({ username: "testuser", mode: "cron" })

		assert.equal(capturedUrls.length, 1)
		assert.match(capturedUrls[0], /per_page=8/)
		assert.equal(actions.length, 2)
		assert.equal(actions[0].id, "sha1")
		assert.equal(actions[1].id, "sha2")
	})

	it("fetches default limit of 32 in init mode", async () => {
		const capturedUrls: string[] = []
		const page1Events = Array.from({ length: 32 }, (_, i) => ({
			id: `event_${i}`,
			type: "PushEvent",
			created_at: `2026-08-31T12:00:${String(i).padStart(2, "0")}Z`,
			payload: { commits: [{ sha: `sha_p1_${i}`, message: "commit" }] },
		}))

		globalThis.fetch = async (input) => {
			capturedUrls.push(String(input))
			return new Response(JSON.stringify(page1Events), { status: 200 })
		}

		const actions = await provider.fetchEvents({ username: "testuser", mode: "init" })

		assert.equal(capturedUrls.length, 1)
		assert.match(capturedUrls[0], /per_page=32/)
		assert.equal(actions.length, 32)
	})

	it("supports custom limit override", async () => {
		const capturedUrls: string[] = []
		const events = Array.from({ length: 50 }, (_, i) => ({
			id: `event_${i}`,
			type: "PushEvent",
			created_at: `2026-08-31T12:00:${String(i).padStart(2, "0")}Z`,
			payload: { commits: [{ sha: `sha_${i}`, message: "commit" }] },
		}))

		globalThis.fetch = async (input) => {
			capturedUrls.push(String(input))
			return new Response(JSON.stringify(events), { status: 200 })
		}

		const actions = await provider.fetchEvents({ username: "testuser", limit: 50 })

		assert.equal(capturedUrls.length, 1)
		assert.match(capturedUrls[0], /per_page=50/)
		assert.equal(actions.length, 50)
	})

	it("includes Authorization header when token is provided", async () => {
		let requestedUrl = ""
		let authHeader = ""

		globalThis.fetch = async (input, init) => {
			requestedUrl = String(input)
			authHeader = (init?.headers as Record<string, string>)?.["Authorization"] ?? ""
			return new Response(JSON.stringify([]), { status: 200 })
		}

		await provider.fetchEvents({
			username: "testuser",
			token: "ghp_secret_token",
		})

		assert.match(requestedUrl, /^https:\/\/api\.github\.com\/users\/testuser\/events/)
		assert.equal(authHeader, "Bearer ghp_secret_token")
	})

	it("parses CreateEvent, PullRequestEvent, IssuesEvent, and ReleaseEvent", async () => {
		const mockResponse = [
			{
				id: "201",
				type: "CreateEvent",
				created_at: "2026-08-31T12:05:00Z",
				payload: { ref_type: "branch" },
			},
			{
				id: "202",
				type: "CreateEvent",
				created_at: "2026-08-31T12:10:00Z",
				payload: { ref_type: "tag" },
			},
			{
				id: "203",
				type: "PullRequestEvent",
				created_at: "2026-08-31T12:15:00Z",
				payload: { action: "opened" },
			},
			{
				id: "204",
				type: "IssuesEvent",
				created_at: "2026-08-31T12:20:00Z",
				payload: { action: "opened" },
			},
			{
				id: "205",
				type: "ReleaseEvent",
				created_at: "2026-08-31T12:25:00Z",
				payload: { action: "published" },
			},
		]

		globalThis.fetch = async () =>
			new Response(JSON.stringify(mockResponse), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})

		const actions = await provider.fetchEvents({ username: "testuser" })

		assert.equal(actions.length, 5)
		assert.equal(actions[0].type, "branchCreate")
		assert.equal(actions[1].type, "tagCreate")
		assert.equal(actions[2].type, "pullRequest")
		assert.equal(actions[3].type, "issue")
		assert.equal(actions[4].type, "release")
	})

	it("filters out events occurring at or before the since timestamp", async () => {
		const mockResponse = [
			{
				id: "302",
				type: "PushEvent",
				created_at: "2026-08-31T12:00:00Z",
				payload: { commits: [{ sha: "sha_new", message: "new commit" }] },
			},
			{
				id: "301",
				type: "PushEvent",
				created_at: "2026-08-31T10:00:00Z",
				payload: { commits: [{ sha: "sha_old", message: "old commit" }] },
			},
		]

		globalThis.fetch = async () =>
			new Response(JSON.stringify(mockResponse), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			})

		const actions = await provider.fetchEvents({
			username: "testuser",
			since: "2026-08-31T11:00:00Z",
		})

		assert.equal(actions.length, 1)
		assert.equal(actions[0].id, "sha_new")
	})

	it("throws an error when HTTP response is not ok", async () => {
		globalThis.fetch = async () =>
			new Response("Not Found", {
				status: 404,
				statusText: "Not Found",
			})

		await assert.rejects(
			async () => {
				await provider.fetchEvents({ username: "unknown_user" })
			},
			{
				message: "Failed to fetch GitHub events: 404 Not Found",
			},
		)
	})
})
