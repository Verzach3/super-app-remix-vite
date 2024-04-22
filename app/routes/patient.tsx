import {
	Outlet,
	useActionData,
	useLoaderData,
	useNavigate,
	useOutletContext,
	useSubmit,
} from "@remix-run/react";
import {AppShell, LoadingOverlay, Modal, rem} from "@mantine/core";
import { useCallback, useEffect } from "react";
import { Header } from "~/components/patient/Header";
import NavBar from "~/components/patient/NavBar";
import type { Session, SupabaseClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/types/database.types";
import { useDisclosure } from "@mantine/hooks";
import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import { createAdminClient, createServerClient } from "~/util/supabase.server";
import { checkForRoles } from "~/util/checkForRole";
import { onboardQuestions } from "~/util/onboardQuestions";
import "survey-core/i18n/spanish.js";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require("survey-core");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Survey } = require("survey-react-ui");

// eslint-disable-next-line @typescript-eslint/no-var-requires

export async function loader({ request }: LoaderFunctionArgs) {
	const response = new Response();
	const supabase = createServerClient({ request, response });
	const authorized = await checkForRoles(["client", "admin"], supabase);
	if (!authorized) {
		return json(
			{ error: "Unauthorized", status: 401 },
			{
				status: 401,
			},
		);
	}
	const session = await supabase.auth.getSession();
	const profile = await supabase
		.from("patient_profiles")
		.select("*")
		.eq("user_id", session?.data.session?.user.id ?? "")
		.single();
	if (!profile.data) {
		return json(
			{ error: "User does'nt exist", status: 418 },
			{
				status: 418,
			},
		);
	}

	return json({ status: 200 });
}

export async function action({ request }: ActionFunctionArgs) {
	console.log("Action invoked");
	const response = new Response();
	const supabase = createServerClient({ request, response });
	const supabaseAdmin = createAdminClient();
	const authorized = await checkForRoles(["client", "admin"], supabase);
	if (!authorized) {
		console.log("Unauthorized");
		return json(
			{ error: "Unauthorized", status: 401 },
			{
				status: 401,
			},
		);
	}
	const user = await supabase.auth.getUser();
	if (!user.data || !user.data.user) {
		console.log("Not logged in");
		return json(
			{ error: "No estas logueado" },
			{
				status: 401,
			},
		);
	}
	// check if user has a profile
	const profile = await supabase
		.from("patient_profiles")
		.select("*")
		.eq("user_id", user.data.user.id);
	if (profile.data && profile.data?.length > 0) {
		console.log("Ya tienes un perfil");
		return json(
			{ error: "Ya tienes un perfil" },
			{
				status: 409,
			},
		);
	}
	// create profile
	const data = await request.formData();
	const res = supabaseAdmin.from("patient_profiles").insert({
		user_id: user.data.user.id,
		phone: data.get("phone") as string,
		birth_date: data.get("birth_date") as string,
		gender: data.get("gender") as string,
		name: data.get("name") as string,
		second_name: data.get("second_name") as string,
		lastname: data.get("lastname") as string,
		second_lastname: data.get("second_lastname") as string,
	});
	console.log(await res);
	return json({ status: 200 });
}

function Patient() {
	const navigate = useNavigate();
	const loaderData = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const [loaderOverlays, { open: openLoader, close: closeLoader }] =
		useDisclosure();
	const { supabase, session } = useOutletContext<{
		supabase: SupabaseClient<Database>;
		session: Session | null;
	}>();
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
	const model = new Model(onboardQuestions);
	model.locale = "es";
	const [onboardOpened, { open, close }] = useDisclosure();

	useEffect(() => {
		if ("error" in loaderData) {
			if (loaderData.status === 418) {
				open();
			}
			if (loaderData.status === 401) {
				navigate("/");
			}
		}
	}, [loaderData, navigate, open]);

	useEffect(() => {
		if (actionData && "status" in actionData) {
			if (actionData.status === 200) {
				window.location.reload();
			}
		}
	}, [actionData]);

	const submit = useSubmit();

	const surveyComplete = useCallback(
		(sender: typeof model) => {
			console.log(sender.data);
			const formData = new FormData();
			for (const key in sender.data) {
				formData.append(key, sender.data[key]);
			}
			submit(formData, { method: "post" });
			close();
			openLoader();
		},
		[close, openLoader, submit],
	);

	model.onComplete.add(surveyComplete);

	return (
		<>
			<LoadingOverlay visible={loaderOverlays} />
			<Modal
				opened={onboardOpened}
				onClose={() => {}}
				size={"xl"}
				withCloseButton={false}
				styles={{ body: { padding: 0 } }}
			>
				<Survey model={model} />
			</Modal>
			<AppShell
				header={{ height: rem("60px") }}
				navbar={{
					width: rem("300px"),
					breakpoint: "sm",
					collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
				}}
			>
				<AppShell.Header zIndex={1001}>
					<Header />
				</AppShell.Header>
				<AppShell.Navbar zIndex={1001}>
					<NavBar />
				</AppShell.Navbar>
				<AppShell.Main>
						<Outlet context={{ supabase, session }} />
				</AppShell.Main>
			</AppShell>
		</>
	);
}

export default Patient;
