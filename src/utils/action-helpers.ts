import { ACTION_EVENTS } from "#data/actions"
import type { ActionSource, ActionType, GitEvent, GitHubEvent } from "#types/action"

function isGitEvent(type: ActionType): type is GitEvent {
	return (ACTION_EVENTS["Git"] as readonly string[]).includes(type)
}

function isGitHubEvent(type: ActionType): type is GitHubEvent {
	return (ACTION_EVENTS["GitHub"] as readonly string[]).includes(type)
}

function getActionSourceOf(type: ActionType): ActionSource {
	return isGitEvent(type) ? "Git" : "GitHub"
}

export { getActionSourceOf as default, isGitEvent, isGitHubEvent }
