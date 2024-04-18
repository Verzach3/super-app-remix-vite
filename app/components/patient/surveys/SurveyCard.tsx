import {Survey} from "~/types/DBTypes";
import {Card, Group, Progress, Stack, Text} from "@mantine/core";
import classes from "~/styles/patient/surveys/SurveyCard.module.css"

export function SurveyCard({survey, onClick, answerId}: {
  onClick: () => void,
  survey: Survey,
  answerId: number | null
}) {
  return <Card
    withBorder
    shadow={"lg"}
    onClick={onClick}
    className={classes.survey_card}
  >
    <Group justify={"space-between"} gap={0}>
      <Stack gap={0}>
        <Text fw={"bold"} size={"lg"} ff={"Inter"}>
          {survey.name}
        </Text>
        <Text lineClamp={1} ff={"Inter"} fw={400}>
          {survey.description}
        </Text>
      </Stack>
      <Stack gap={0}>
        <Progress
          value={100}
          color={
            answerId !== null ? "green" : "orange"
          }
        />
        <Text>
          {answerId
            ? "Completada"
            : "No Completada"}
        </Text>
      </Stack>
    </Group>
  </Card>;
}