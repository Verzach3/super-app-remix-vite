import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";
import SurveyCreatorWidget from "~/components/dashboard/surveys/SurveyCreatorWidget";
import {Card, Center, Group, Text} from "@mantine/core";

export const meta: MetaFunction = () => {
	return [
		{ title: "Survey Creator | SurveyJS + NextJS Quickstart Template" },
		{ name: "description", content: "Survey Creator by SurveyJS" },
	];
};

export default function Survey() {
	return (
		<div
			style={{
				height: "100dvh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Group grow>
				<Card withBorder radius={0}>
					<Text ff={"Inter"} fw={800} size={"lg"}>
						Editando:{" "}
						<Text span c={"blue"}>
							Survey
						</Text>
					</Text>
				</Card>
			</Group>
			<ClientOnly fallback={null}>{() => <SurveyCreatorWidget />}</ClientOnly>
		</div>
	);
}
