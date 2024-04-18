import "survey-core/defaultV2.min.css";
import svyCore from "survey-core";
import svyUi from "survey-react-ui";
import {LoaderFunctionArgs, json, ActionFunctionArgs} from "@remix-run/node";
import {createServerClient} from "~/util/supabase.server";
import {useLoaderData, useNavigate, useSubmit} from "@remix-run/react";
import {useCallback, useEffect, useState} from "react";
import {Container, Title, Text, Center} from "@mantine/core";
import {useInterval} from "@mantine/hooks";
import {createClient} from "@supabase/supabase-js";

const {Model} = svyCore;
const {Survey} = svyUi;

export async function action({request, params}: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const supabaseAdmin = createClient(process.env.SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_KEY ?? "", {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  console.log("Action Called")
  console.log("Params" + params);
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  const {data, error} = await supabase.auth.getSession();
  if (error || !data.session) {
    return json(
      {error: "No session found", status: 401},
      {
        status: 401
      }
    );
  }
  if (!params["survey"]) {
    return json(
      {error: "No survey found", status: 404},
      {
        status: 404
      }
    );
  }

  const {
    data: surveyAsign,
    error: surveyAsignError
  } = await supabase.from("surveys_asigns").select("*").eq("survey_id", params["survey"]).single();

  if (surveyAsignError) {
    return json(
      {error: "Error getting survey", status: 500},
      {
        status: 500
      }
    );
  }

  const {error: answerCreateError, data: createdAnswer} = await supabaseAdmin.from("surveys_answers").insert(
    {
      survey: params["survey"],
      respondent: data.session.user.id,
      answer: JSON.parse(JSON.stringify(formDataObj))
    }
  ).select().single();
  if (answerCreateError) {
    console.log("Error creating answer: ", answerCreateError)
    return json(
      {error: "Error saving survey", status: 500},
      {
        status: 500
      }
    );
  }

  const {error: updateAsignError, data: updatedAsign} = await supabaseAdmin.from("surveys_asigns").update({
    answer_id: createdAnswer.id
  }).eq("id", surveyAsign.id).select();
  if (updateAsignError) {
    console.log("Error updating asign: ", updateAsignError)
    return json(
      {error: "Error saving survey", status: 500},
      {
        status: 500
      }
    );
  }
  console.log("Update Asign Completed: ", updatedAsign)
  return json(
    {success: true},
    {
      headers: response.headers
    }
  );
}

export async function loader({request, params}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient({request, response});
  const session = await supabase.auth.getSession();
  if (!session || !session.data) {
    return json(
      {error: "No session found", status: 401},
      {
        status: 401
      }
    );
  }
  if (!params["survey"]) {
    return json(
      {error: "No survey found", status: 404},
      {
        status: 404
      }
    );
  }
  const {data: survey, error} = await supabase.from("surveys").select("*").eq("id", params["survey"]).single();

  if (error) {
    return json(
      {error: "Error getting survey", status: 500},
      {
        status: 500
      }
    );
  }

  return json(
    {survey: survey},
    {
      headers: response.headers
    }
  );
}

function Surveys() {
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const submit = useSubmit();
  const surveyComplete = useCallback((result: svyCore.Model) => {
    console.log("Survey results: " + JSON.stringify(result.data, null, 3));
    submit(result.data, {method: "post"});
    setSurveyCompleted(true);
  }, [])
  const surveyData = useLoaderData<typeof loader>();
  const interval = useInterval(() => setSeconds((s) => s + 1), 1000);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds >= 5) {
      navigate("/patient/surveys");
    }
  }, [seconds]);

  useEffect(() => {
    if (surveyCompleted) {
      interval.start();
    }
    return interval.stop;
  }, [surveyCompleted]);

  if ("error" in surveyData) {
    console.log(surveyData.error, surveyData.status);
    return <div>{surveyData.error}</div>;
  }

  const survey = new Model(surveyData.survey.json);
  survey.onComplete.add(surveyComplete);
  if (surveyCompleted) {
    return (
      <Container fluid h={"100%"} style={{
        flex: 1
      }}>
        <Center h={"100%"} >
          <Container mt={"xl"}>
            <Title ff={"Inter"} ta={"center"} >Encuesta Completada</Title>
            <Text ff={"Inter"} ta={"center"} size={"md"} >Gracias por completar la encuesta</Text>
            <Text ff={"Inter"} ta={"center"}>Te vamos a redirigir a Encuestas en {5 - seconds} segundos</Text>
          </Container>
        </Center>
      </Container>
    )
  }

  return (
    <div style={{height: "100%"}}>
      <Survey model={survey}/>
    </div>
  );
}

export default Surveys;