import {Button, Container, Divider, Group, Menu, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import MedicationCard from "~/components/patient/medications/MedicationCard";
import ResultsFilter from "~/components/patient/ResultsFilter";
import {json, LoaderFunctionArgs} from "@remix-run/node";
import {createServerClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {checkForRoles} from "~/util/checkForRole";
import {getPatientMedication} from "~/util/emrAPI.server";
import {useLoaderData} from "@remix-run/react";

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  )
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json({error: "Unauthorized"}, {
      status: 401
    })
  }

  const session = await supabase.auth.getSession();
  if (!session) {
    return json(null, {
      status: 401
    })
  }
  const profile = await supabase.from("patient_profiles").select("*").eq("user_id", session.data.session?.user.id ?? "").single();
  if (!profile.data) {
    return json(null, {
      status: 500
    })
  }

  const medications = await getPatientMedication(profile.data.emr_id!);
  return json({medications}, {
    headers: response.headers
  })

}

function PatientMedications() {
  const loaderData = useLoaderData<typeof loader>()
  console.log(loaderData)
  return (
    <Container mt={"1rem"}>
      <Title style={{fontFamily: "Inter", fontWeight: 800, marginBottom: "3rem", marginTop: "2rem"}}>
        Medicamentos
      </Title>
      <ResultsFilter/>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
      <div style={{marginTop: "2rem"}}>
        <Text size={"lg"} fw={600}>Enero 1, 2024</Text>
        <SimpleGrid cols={2}>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
          <MedicationCard name={"Medicamento"} orderedBy={"Doctor"} dose={"2 tabletas"} frequency={"Cada 6hr"}
                          via={"Oral"}/>
        </SimpleGrid>
      </div>
    </Container>
  )
}

export default PatientMedications;