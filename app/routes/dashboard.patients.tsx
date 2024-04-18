import {Container, SimpleGrid, Title} from "@mantine/core";
import {type LoaderFunctionArgs,json } from "@remix-run/node";
import {useLoaderData, useRevalidator} from "@remix-run/react";
import {createServerClient} from "@supabase/auth-helpers-remix";
import type {Patient} from "fhir/r4";
import * as process from "node:process";
import {useEffect, useState} from "react";
import PatientCard from "~/components/dashboard/patients/PatientCard";
import type CompoundPatient from "~/fhir-supa/compoundPatient";
import type {PatientProfile} from "~/types/DBTypes";
import {checkForRoles} from "~/util/checkForRole";
import generateCompoundPatients from "~/util/generateCompoundPatients";
import getAxiosClientServer from "~/util/getAxiosClient.server";
import {getToken} from "~/util/tokenUtil.server";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response();
  const supabaseClient = createServerClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
    request,
    response
  });
  const hasRole = await checkForRoles(["admin", "editor"], supabaseClient);
  if (!hasRole) {
    console.log("Unauthorized")
    return json({error: "Unauthorized"}, {
      status: 401,
      headers: response.headers
    })
  }
  try {
    const axiosres = await getAxiosClientServer().get("https://emr.wellfitclinic.com/apis/default/fhir/Patient", {
      headers: {
        Authorization: `Bearer ${await getToken() ?? ""}`
      }
    },)
    console.log(axiosres.data)
    const profiles = await supabaseClient.from("patient_profiles").select("*");
    return json({resources: axiosres.data, profiles: profiles.data}, {headers: response.headers});
  } catch (e) {
    console.log("Error fetching patients", e);
    return json({error: "Error fetching patients"}, {
      status: 500,
      headers: response.headers
    })
  }

}


function DashboardPatients() {
  let data = useLoaderData<typeof loader>()
  const [patients, setPatients] = useState<CompoundPatient[]>([]);
  const revalidator = useRevalidator();
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    console.log(data)
    if ("error" in data && data.error !== "Unauthorized") {
      if (retry > 3) {
        return
      }
      revalidator.revalidate();
      setRetry(retry + 1);
      return
    }
    if (Object.hasOwn(data, "resources")) {
      data = data as { resources: { entry: { resource: Patient, fullUrl: string}[] }, profiles: PatientProfile[] }
      const patients = generateCompoundPatients(data.resources.entry, data.profiles ?? []);
      setPatients(patients);
    }

  }, [data, retry]);
  return (
    <Container>
      <Title style={{marginTop: "2rem"}}>
        Pacientes
      </Title>
      <SimpleGrid cols={2}>
        {
          patients?.map((patient) => {
            return (
              <PatientCard key={patient.emrId} patient={patient}/>
            )
          })
        }
      </SimpleGrid>
    </Container>
  )
}

export default DashboardPatients;