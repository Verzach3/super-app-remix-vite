import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import {
	type MetaFunction,
	type Session,
	type LoaderFunctionArgs,
	json,
} from "@remix-run/node";


import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetcher,
	useLoaderData,
} from "@remix-run/react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import {
	createBrowserClient,
	type SupabaseClient,
} from "@supabase/auth-helpers-remix";
import type { Database } from "~/types/database.types";
import { useEffect, useState } from "react";
import { Provider } from "jotai";
import { createServerClient } from "~/util/supabase.server";
import { Notifications } from "@mantine/notifications";
import "~/styles/root.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "Super App" },
		{ name: "description", content: "Welcome to SuperApp!" },
	];
};

export type TypedSupabaseClient = SupabaseClient<Database>;
export type MaybeSession = Session | null;

export type SupabaseContext = {
	supabase: TypedSupabaseClient;
	session: MaybeSession;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const env = {
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
	};

	const response = new Response();

	const supabase = createServerClient({ request, response });
	await supabase.auth.getUser();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	// in order for the set-cookie header to be set,
	// headers must be returned as part of the loader response
	return json(
		{
			env,
			session,
		},
		{
			headers: response.headers,
		},
	);
};

export default function App() {
	const { env, session } = useLoaderData<typeof loader>();
	const fetcher = useFetcher();
	const [supabase] = useState(() =>
		createBrowserClient<Database>(
			env.SUPABASE_URL as string,
			env.SUPABASE_ANON_KEY as string,
		),
	);
	const serverAccessToken = session?.access_token;

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (
				session?.access_token !== serverAccessToken &&
				fetcher.state === "idle"
			) {
				// server and client are out of sync.
				// Remix recalls active loaders after actions complete
				fetcher.submit(null, {
					method: "post",
					action: "/handle-supabase-auth",
				});
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [serverAccessToken, supabase, fetcher]);

	return (
		<html lang="en" style={{ scrollbarWidth: "none" }}>
			<head>
				<title>WellFit Platform</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin={""}
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
				<ColorSchemeScript />
			</head>
			<body>
				<Provider>
					<MantineProvider forceColorScheme={"light"}>
						<Notifications />
						<Outlet context={{ supabase, session }} />
						<ScrollRestoration />
						<Scripts />
					</MantineProvider>
				</Provider>
			</body>
		</html>
	);
}
