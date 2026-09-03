import type { ActionItem } from "#types/action"

type FetchEventsMode = "init" | "cron"

type FetchEventsOptions = {
	username: string
	mode?: FetchEventsMode
	limit?: number
	since?: string
	token?: string
}

type EventProvider = {
	readonly name: string
	fetchEvents(options: FetchEventsOptions): Promise<ActionItem[]>
}

export type { EventProvider as default, EventProvider, FetchEventsMode, FetchEventsOptions }
