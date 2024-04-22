import {
	Button,
	Center,
	Grid,
	Group,
	Input,
	rem,
	SegmentedControl,
	Title,
} from "@mantine/core";
import SurveysListItem from "~/components/dashboard/surveys/SurveysListItem";
import {
	IconChevronDown,
	IconLayoutGrid,
	IconLayoutList,
	IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { Database } from "~/types/database.types";
import process from "node:process";
import { checkForRoles } from "~/util/checkForRole";
import { CardTable } from "~/components/dashboard/surveys/CardTable";
import { CreateSurveyModal } from "~/components/dashboard/surveys/CreateSurveyModal";
import { SurveyItem } from "~/components/dashboard/surveys/SurveyItem";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response();
	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL ?? "",
		process.env.SUPABASE_ANON_KEY ?? "",
		{ request, response },
	);

	const { data, error} = await supabase.from("surveys")
		.select("id, name, description, surveys_asigns!left(survey_id, id)");

	const authorized = await checkForRoles(["patient", "admin"], supabase);
	if (!authorized) {
		return json(
			{ error: "Unauthorized", data: null },
			{
				status: 401,
			},
		);
	}
	const patients = (
		await supabase.from("patient_profiles").select("*").limit(20)
	).data;
	const surveys = (await supabase.from("surveys").select("*")).data;
	return json(
		{
			data: { patients, surveys },
			error: null,
		},
		{
			headers: response.headers,
		},
	);
};

export async function action({ request }: ActionFunctionArgs) {
	const response = new Response();
	const supabase = createServerClient<Database>(
		process.env.SUPABASE_URL ?? "",
		process.env.SUPABASE_ANON_KEY ?? "",
		{ request, response },
	);
	const authorized = await checkForRoles(["patient", "admin"], supabase);
	if (!authorized) {
		return json(
			{ error: "Unauthorized", data: null },
			{
				status: 401,
			},
		);
	}
	return json(
		{ data: "Success", error: null },
		{
			headers: response.headers,
		},
	);
}

function DashboardSurveys() {
	const [createOpened, { open: openCreate, close: closeCreate }] =
		useDisclosure(false);
	const [asignSearch, setAsignSearch] = useState<string>("");
	const loaderData = useLoaderData<typeof loader>();
	useEffect(() => {
		console.log(loaderData);
	}, [loaderData]);

	if (loaderData.error) {
		return <div>{loaderData.error}</div>;
	}

	return (
		<>
			<CreateSurveyModal opened={createOpened} onClose={closeCreate} />
			<div style={{ margin: "1rem" }}>
				<Group grow justify={"space-between"}>
					<Title style={{ fontFamily: "Inter" }}>Encuestas</Title>
					<Group justify={"flex-end"}>
						<Button
							radius={"lg"}
							variant={"light"}
							rightSection={<IconChevronDown />}
						>
							Programas
						</Button>
						<SegmentedControl
							radius={"lg"}
							color={"blue"}
							data={[
								{
									value: "grid",
									label: (
										<Center style={{ gap: 10 }}>
											<IconLayoutGrid
												style={{ width: rem(16), height: rem(16) }}
											/>
										</Center>
									),
								},
								{
									value: "list",
									label: (
										<Center style={{ gap: 10 }}>
											<IconLayoutList
												style={{ width: rem(16), height: rem(16) }}
											/>
										</Center>
									),
								},
							]}
						/>
						<Button radius={"lg"}>Crear</Button>
					</Group>
				</Group>
				<Group style={{ marginBottom: "1rem", marginTop: "1rem" }}>
					<Input style={{ flex: 1 }} />
					<Button
						variant="light"
						style={{ marginLeft: "1rem" }}
						rightSection={<IconSearch />}
					>
						Search
					</Button>
				</Group>
				<Grid mb={"md"}>
					<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
						<SurveyItem
							title="Titulo de la Encuesta"
							lastResponse="Agosto 12, 2021 a las 12:00 PM"
							responses={1240}
							percentage={7.65}
							assigned={120}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
						<SurveyItem
							title="Titulo de la Encuesta"
							lastResponse="Agosto 12, 2021 a las 12:00 PM"
							responses={1240}
							percentage={7.65}
							assigned={120}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
						<SurveyItem
							title="Titulo de la Encuesta"
							lastResponse="Agosto 12, 2021 a las 12:00 PM"
							responses={1240}
							percentage={7.65}
							assigned={120}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
						<SurveyItem
							title="Titulo de la Encuesta"
							lastResponse="Agosto 12, 2021 a las 12:00 PM"
							responses={1240}
							percentage={7.65}
							assigned={120}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
						<SurveyItem
							title="Titulo de la Encuesta"
							lastResponse="Agosto 12, 2021 a las 12:00 PM"
							responses={1240}
							percentage={7.65}
							assigned={120}
						/>
					</Grid.Col>
				</Grid>
				<CardTable
					loaderData={loaderData}
					callbackfn={(survey) => (
						<SurveysListItem key={survey.id} survey={survey} />
					)}
				/>
			</div>
		</>
	);
}

export default DashboardSurveys;
