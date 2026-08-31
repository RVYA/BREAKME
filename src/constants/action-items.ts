import type { ActionSource } from "#models/action-item.js"

const ACTION_EVENTS = {
	Git: ["commit", "mergeCommit", "branchCreate", "tagCreate"],
	GitHub: ["pullRequest", "issue", "release", "deployment"],
} as const satisfies Record<ActionSource, string[]>

export { ACTION_EVENTS }
