import {Card, Center, Container, Group, Image, SimpleGrid, Stack, Text, Title, UnstyledButton,} from "@mantine/core";
import {IconCaretRight} from "@tabler/icons-react";
import {motion} from "framer-motion";
import {FaUserDoctor} from "react-icons/fa6";
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {getPatientData} from "~/util/emrAPI.server";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {useEffect, useState} from "react";
import type {Patient} from "fhir/r4";
import {createServerClient} from "~/util/supabase.server";
import type {PatientProfile} from "~/types/DBTypes";
import {PatientShortcuts} from "~/components/dashboard/patients/PatientShortcuts";
import {SurveyCard} from "~/components/patient/surveys/SurveyCard";

export async function loader({ request }: LoaderFunctionArgs) {
	const response = new Response();
	const supabase = createServerClient({ request, response });
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

	const surveys = await supabase
		.from("surveys_asigns")
		.select("surveys (*), answer_id");

	let data = null;
	if (profile.data.emr_id) {
		console.log("Getting patient data");
		try {
			data = await getPatientData(profile.data.emr_id);
		} catch (e) {
			return json(
				{ error: "Error al obtener datos del paciente", status: 500 },
				{
					status: 500,
				},
			);
		}
	}
	return json(
		{ patient: data, profile: profile, surveys: surveys.data },
		{
			headers: response.headers,
		},
	);
}

function Patient_index() {
	const loaderData = useLoaderData<typeof loader>();
	const [patient, setPatient] = useState<Patient | null>(null);
	const [profile, setProfile] = useState<PatientProfile | null>(null);
	const navigate = useNavigate();
	useEffect(() => {
		console.log(loaderData);
		if ("error" in loaderData) {
			console.log(loaderData.error, loaderData.status);
			if (loaderData.error === "Unauthorized") {
				navigate("/auth");
			}
		}
		if ("patient" in loaderData) {
			setPatient(loaderData?.patient);
		}
		if ("profile" in loaderData) {
			setProfile(loaderData?.profile.data);
		}
	}, []);

	if ("error" in loaderData) {
		return null;
	}

	return (
		<div style={{ paddingBottom: "10rem", height: "100%"}}>
			<Image
				src={"/consultory.avif"}
				style={{ objectFit: "cover", width: "100%", height: "25rem" }}
			/>
			{/* Appointment button */}
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-end",
					height: "100%",
				}}
			>
				<motion.div
					style={{
						flex: 1,
						display: "flex",
						justifyContent: "flex-end",
						width: "fit-content",
					}}
					whileHover={{
						scale: 1.03,
					}}
				>
					<Card
						withBorder
						w={"25rem"}
						style={{
							alignSelf: "flex-end",
							top: "-2.5rem",
							marginRight: "2rem",
						}}
					>
						<Center>
							<Group>
								<Title size={"1.2rem"}>
									¿Necesitas una cita para diagnostico?
								</Title>
								Necesitas ayuda?
							</Group>
							<IconCaretRight size={"2rem"} />
						</Center>
					</Card>
				</motion.div>
				<Container w={"100%"}>
					<Title ta={"left"} mt={"xss"} style={{ fontFamily: "Inter" }}>
						Hola, {profile?.name}
					</Title>
				</Container>
				<Container w={"100%"}>
					<Text ta={"left"} size="xl" fw={600} mt={"xl"} mb={"xl"}>
						Accesos Directos
					</Text>
				</Container>

				{/* Shortcuts */}
				<Container style={{ width: "100vw", overflowX: "hidden" }} p={0}>
					<PatientShortcuts />
				</Container>

				{/* Encuestas Disponibles */}
				<Container w={"100%"}>
					<Stack>
						<Center>
							<Title
								ta={"center"}
								ff={"Inter"}
								order={3}
								fw={600}
								mt={"4rem"}
								mb={"md"}
							>
								Encuestas Disponibles
							</Title>
						</Center>
						{loaderData.surveys?.length ?? 0 > 0 ? (
							<>
								<SimpleGrid cols={1}>
									{loaderData.surveys &&
										loaderData.surveys.map((survey) => {
											if (!survey.surveys) {
												return null;
											}
											return (
												<SurveyCard key={survey.surveys.id} onClick={() => {
													navigate(`/patient/surveys/${survey.surveys?.id}`);
												}} survey={survey.surveys} answerId={survey.answer_id}/>
											);
										})}
								</SimpleGrid>
								<Container fluid>
									<UnstyledButton onClick={() => navigate("/patient/surveys")}>
										<Text fw={800} ff={"Inter"}>
											Ver Mas...
										</Text>
									</UnstyledButton>
								</Container>
							</>
						) : (
							<Container mb={"md"}>
								<Text fw={700} ff={"Inter"} c={"gray"}>
									No tienes encuestas disponibles.
								</Text>
							</Container>
						)}
					</Stack>
				</Container>

				{/* Recibe Atencion Widget*/}
				<Container>
					<Stack>
						<Center>
							<Title ta={"center"} order={3} fw={600} mt={"4rem"} mb={"md"}>
								Recibe Atencion
							</Title>
						</Center>
						<SimpleGrid cols={2}>
							<Card withBorder py={"lg"}>
								<Center>
									<FaUserDoctor
										size={"1.5rem"}
										style={{ marginRight: "0.5rem" }}
									/>
									<Title size={"1.2rem"}>
										¿Necesitas una cita para diagnostico?
									</Title>
								</Center>
							</Card>
							<Card withBorder py={"lg"}>
								<Center>
									<FaUserDoctor
										size={"1.5rem"}
										style={{ marginRight: "0.5rem" }}
									/>
									<Title size={"1.2rem"}>
										¿Necesitas una cita para diagnostico?
									</Title>
								</Center>
							</Card>
							<Card withBorder py={"lg"}>
								<Center>
									<FaUserDoctor
										size={"1.5rem"}
										style={{ marginRight: "0.5rem" }}
									/>
									<Title size={"1.2rem"}>
										¿Necesitas una cita para diagnostico?
									</Title>
								</Center>
							</Card>
							<Card withBorder py={"lg"}>
								<Center>
									<FaUserDoctor
										size={"1.5rem"}
										style={{ marginRight: "0.5rem" }}
									/>
									<Title size={"1.2rem"}>
										¿Necesitas una cita para diagnostico?
									</Title>
								</Center>
							</Card>
						</SimpleGrid>
					</Stack>
				</Container>
			</div>
		</div>
	);
}

export default Patient_index;
