import {
  Container,
  SimpleGrid,
  Title,
} from "@mantine/core";
import {createServerClient} from "~/util/supabase.server";
import {json, type LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {useEffect} from "react";
import {SurveyCard} from "~/components/patient/surveys/SurveyCard";

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const surveys = await supabase
    .from("surveys_asigns")
    .select("surveys (*), answer_id, id");
  console.log(surveys);
  return json(
    {surveys: surveys.data},
    {
      headers: response.headers,
    },
  );
}

function PatientSurveys() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loaderData);
  }, [loaderData]);
  return (
    <Container mt={"1rem"}>
      <Title
        style={{
          fontFamily: "Inter",
          fontWeight: 800,
          marginBottom: "3rem",
          marginTop: "2rem",
        }}
      >
        Encuestas
      </Title>
      <SimpleGrid cols={1}>
        {loaderData.surveys?.map((survey) => {
          if (!survey.surveys) return null;
          return (
            <SurveyCard key={survey.surveys.id} onClick={() => {
              navigate(`/patient/surveys/${survey.surveys?.id}`);
            }} survey={survey.surveys} answerId={survey.answer_id}/>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}

export default PatientSurveys;
