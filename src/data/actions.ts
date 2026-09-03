import type { ActionSource } from "#types/actions"

const ACTION_EVENTS = {
	Git: ["commit", "mergeCommit", "branchCreate", "tagCreate"],
	GitHub: ["pullRequest", "issue", "release", "deployment"],
} as const satisfies Record<ActionSource, string[]>

export { ACTION_EVENTS }
