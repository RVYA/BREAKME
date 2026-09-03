import type ActionEvent from "#types/action-event"

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
	fetchEvents(options: FetchEventsOptions): Promise<ActionEvent[]>
}

export type { EventProvider as default, EventProvider, FetchEventsMode, FetchEventsOptions }
