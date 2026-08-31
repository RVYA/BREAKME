import type ActionItem from "#models/action-item"

type FetchEventsMode = "init" | "cron"

type FetchEventsOptions = {
	username: string
	mode?: FetchEventsMode
	since?: string
	token?: string
}

type EventProvider = {
	readonly name: string
	fetchEvents(options: FetchEventsOptions): Promise<ActionItem[]>
}

export type { EventProvider as default, FetchEventsMode, FetchEventsOptions }
