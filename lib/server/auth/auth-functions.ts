import { createServerFn } from "@tanstack/start";
import { getEvent } from "vinxi/http";
import { type Auth } from "./auth";
import { queryOptions } from "@tanstack/react-query";

export const getAuthSessionOptions = () =>
	queryOptions({
		queryKey: ['getAuthSession'],
		queryFn: () => getAuthSession()
	})

export const getAuthSession = createServerFn({ method: "GET" }).handler(
	async (): Promise<Auth> => {
		const event = getEvent();
		console.log('event', event)

		return event.context.auth;
	}
);
