import { ACTION_EVENTS } from "#data/action-events"

type ActionSource = "Git" | "GitHub"

type GitEvent = (typeof ACTION_EVENTS)["Git"][number]
type GitHubEvent = (typeof ACTION_EVENTS)["GitHub"][number]

type ActionType = GitEvent | GitHubEvent

// #region Action Type Helpers
function isGitEvent(type: ActionType): type is GitEvent {
	return (ACTION_EVENTS["Git"] as readonly string[]).includes(type)
}

function isGitHubEvent(type: ActionType): type is GitHubEvent {
	return (ACTION_EVENTS["GitHub"] as readonly string[]).includes(type)
}

function getEventSourceOf(type: ActionType): ActionSource {
	return isGitEvent(type) ? "Git" : "GitHub"
}
// #endregion

class ActionEvent {
	#id: string
	#type: ActionType
	#timestamp: string

	constructor(id: string, type: ActionType, timestamp: string) {
		this.#id = id
		this.#type = type
		this.#timestamp = timestamp
	}

	get id() {
		return this.#id
	}
	get timestamp() {
		return this.#timestamp
	}
	get type() {
		return this.#type
	}

	isGitEvent = () => isGitEvent(this.#type)
	isGitHubEvent = () => isGitHubEvent(this.#type)
	get eventSource() {
		return getEventSourceOf(this.#type)
	}

	toJSON() {
		return {
			id: this.#id,
			type: this.#type,
			timestamp: this.#timestamp,
		}
	}

	static fromJSON(data: { id: string; type: ActionType; timestamp: string }): ActionEvent {
		return new ActionEvent(data.id, data.type, data.timestamp)
	}
}

export { ActionEvent, ActionEvent as default }
export type { ActionSource, ActionType, GitEvent, GitHubEvent }
