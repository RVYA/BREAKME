import type { ACTION_EVENTS } from "#data/actions"

type ActionSource = "Git" | "GitHub"

type GitEvent = (typeof ACTION_EVENTS)["Git"][number]
type GitHubEvent = (typeof ACTION_EVENTS)["GitHub"][number]

type ActionType = GitEvent | GitHubEvent

type ActionItem = {
	id: string
	type: ActionType
	timestamp: string
}

export type { ActionItem as default, ActionItem, ActionSource, ActionType, GitEvent, GitHubEvent }
