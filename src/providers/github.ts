import type ActionItem from "#models/action-item"
import type { ActionType } from "#models/action-item"
import type EventProvider from "./provider"
import type { FetchEventsOptions } from "./provider"

const DEFAULT_INIT_LIMIT = 32
const DEFAULT_CRON_LIMIT = 8

type GitHubApiCommit = {
	sha: string
	message?: string
	distinct?: boolean
}

type GitHubApiEvent = {
	id: string
	type: string
	created_at: string
	payload?: {
		action?: string
		ref_type?: string
		ref?: string
		commits?: GitHubApiCommit[]
	}
}

export default class GitHubEventProvider implements EventProvider {
	readonly name = "github"

	async fetchEvents(options: FetchEventsOptions): Promise<ActionItem[]> {
		const mode = options.mode ?? "cron"
		const targetLimit = options.limit ?? (mode === "init" ? DEFAULT_INIT_LIMIT : DEFAULT_CRON_LIMIT)
		const baseUrl = `https://api.github.com/users/${options.username}/events`

		const headers: Record<string, string> = {
			"Accept": "application/vnd.github+json",
			"User-Agent": "BREAKME",
		}

		if (options.token) {
			headers["Authorization"] = `Bearer ${options.token}`
		}

		const rawEvents = await this.#fetchPage(baseUrl, headers, targetLimit)
		const actions: ActionItem[] = []

		for (const event of rawEvents) {
			const eventTimestamp = event.created_at
			if (options.since && new Date(eventTimestamp).getTime() <= new Date(options.since).getTime()) {
				continue
			}

			const parsedActions = this.#parseEvent(event)
			actions.push(...parsedActions)
		}

		actions.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

		return actions
	}

	async #fetchPage(
		baseUrl: string,
		headers: Record<string, string>,
		perPage: number,
	): Promise<GitHubApiEvent[]> {
		const url = `${baseUrl}?per_page=${perPage}`
		const response = await fetch(url, { headers })

		if (!response.ok) {
			throw new Error(`Failed to fetch GitHub events: ${response.status} ${response.statusText}`)
		}

		return (await response.json()) as GitHubApiEvent[]
	}

	#parseEvent(event: GitHubApiEvent): ActionItem[] {
		const actions: ActionItem[] = []
		const timestamp = event.created_at

		switch (event.type) {
			case "PushEvent": {
				const commits = event.payload?.commits ?? []
				if (commits.length === 0) {
					actions.push({
						id: event.id,
						type: "commit",
						timestamp,
					})
				} else {
					for (const commit of commits) {
						const isMerge = commit.message?.toLowerCase().startsWith("merge ") ?? false
						const type: ActionType = isMerge ? "mergeCommit" : "commit"
						actions.push({
							id: commit.sha,
							type,
							timestamp,
						})
					}
				}
				break
			}
			case "CreateEvent": {
				if (event.payload?.ref_type === "branch") {
					actions.push({ id: event.id, type: "branchCreate", timestamp })
				} else if (event.payload?.ref_type === "tag") {
					actions.push({ id: event.id, type: "tagCreate", timestamp })
				}
				break
			}
			case "PullRequestEvent": {
				if (event.payload?.action === "opened" || event.payload?.action === "closed") {
					actions.push({ id: event.id, type: "pullRequest", timestamp })
				}
				break
			}
			case "IssuesEvent": {
				if (event.payload?.action === "opened") {
					actions.push({ id: event.id, type: "issue", timestamp })
				}
				break
			}
			case "ReleaseEvent": {
				if (event.payload?.action === "published") {
					actions.push({ id: event.id, type: "release", timestamp })
				}
				break
			}
			case "DeploymentEvent":
			case "DeploymentStatusEvent": {
				actions.push({ id: event.id, type: "deployment", timestamp })
				break
			}
		}

		return actions
	}
}

export { DEFAULT_CRON_LIMIT, DEFAULT_INIT_LIMIT }
