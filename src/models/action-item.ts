import type { ACTION_EVENTS } from "#const/action-items"

type ActionSource = "Git" | "GitHub"

type GitEvent = (typeof ACTION_EVENTS)["Git"][number]
type GitHubEvent = (typeof ACTION_EVENTS)["GitHub"][number]

type ActionType = GitEvent | GitHubEvent

type ActionItem = {
	id: string
	type: ActionType
	timestamp: string
}

export type { ActionSource, ActionType, ActionItem as default, GitEvent, GitHubEvent }
