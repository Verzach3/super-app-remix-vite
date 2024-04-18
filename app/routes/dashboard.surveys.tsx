import {
  ActionIcon,
  Button,
  Card,
  Group,
  Input,
  Stack,
  Title,
  Text,
  Container,
  Center, Grid, ThemeIcon, Badge, SegmentedControl, rem
} from "@mantine/core";
import SurveysListItem from "~/components/dashboard/surveys/SurveysListItem";
import {
  IconChevronDown,
  IconDots,
  IconLayoutGrid, IconLayoutList,
  IconSearch,
  IconUser
} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import React, {useEffect, useState} from "react";
import {type ActionFunctionArgs, json, type LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {createServerClient} from "@supabase/auth-helpers-remix";
import type {Database} from "~/types/database.types";
import process from "node:process";
import {checkForRoles} from "~/util/checkForRole";
import AsignSurvey from "~/components/dashboard/surveys/AsignSurvey";
import {CardTable} from "~/components/dashboard/surveys/CardTable";
import {CreateSurveyModal} from "~/components/dashboard/surveys/CreateSurveyModal";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  );
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json(
      {error: "Unauthorized", data: null},
      {
        status: 401,
      }
    );
  }
  const patients = (await supabase.from("patient_profiles").select("*").limit(20)).data
  const surveys = (await supabase.from("surveys").select("*")).data
  return json(
    {
      data: {patients, surveys}, error: null
    },
    {
      headers: response.headers,
    }
  );
};

export async function action({request}: ActionFunctionArgs) {
  const response = new Response();
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_ANON_KEY ?? "",
    {request, response}
  );
  const authorized = await checkForRoles(["patient", "admin"], supabase);
  if (!authorized) {
    return json(
      {error: "Unauthorized", data: null},
      {
        status: 401,
      }
    );
  }
  return json(
    {data: "Success", error: null},
    {
      headers: response.headers,
    }
  );

}

function DashboardSurveys() {
  const [createOpened, {open: openCreate, close: closeCreate}] = useDisclosure(false);
  const [asignSearch, setAsignSearch] = useState<string>("")
  const loaderData = useLoaderData<typeof loader>();
  useEffect(() => {
    console.log(loaderData);
  }, [loaderData]);

  if (loaderData.error) {
    return <div>{loaderData.error}</div>;
  }

  return (
    <>
      <CreateSurveyModal opened={createOpened} onClose={closeCreate}/>
      <div style={{margin: "1rem"}}>
        <Group grow justify={"space-between"}>
          <Title style={{fontFamily: "Inter"}}>Encuestas</Title>
          <Group justify={"flex-end"}>
            <Button radius={"lg"} variant={"light"} rightSection={<IconChevronDown/>}>
              Programas
            </Button>
            <SegmentedControl
              radius={"lg"}
              color={"blue"}
              data={[
                {
                  value: "grid",
                  label: (
                    <Center style={{gap: 10}}>
                      <IconLayoutGrid style={{width: rem(16), height: rem(16)}}/>
                    </Center>
                  )
                },
                {
                  value: "list",
                  label: (
                    <Center style={{gap: 10}}>
                      <IconLayoutList style={{width: rem(16), height: rem(16)}}/>
                    </Center>
                  )
                }
              ]}
            />
            <Button radius={"lg"}>
              Crear
            </Button>
          </Group>
        </Group>
        <Group style={{marginBottom: "1rem", marginTop: "1rem"}}>
          <Input style={{flex: 1}}/>
          <Button
            variant="light"
            style={{marginLeft: "1rem"}}
            rightSection={<IconSearch/>}
          >
            Search
          </Button>
        </Group>
        <Grid mb={"md"}>
          <Grid.Col span={{base: 12, md: 6, lg: 4}}>
            <Card>
              <Card.Section>
                <Card withBorder radius={"lg"} shadow={"md"}>
                  <Card.Section>
                    <Container mt={"md"}>
                      <Badge size={"md"}>
                        Programa
                      </Badge>
                    </Container>
                  </Card.Section>
                  <Card.Section>
                    <Center>
                      <Stack>
                        <Container>
                          <Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
                            1,240
                          </Text>
                          <Text size={"sm"} ta={"center"} ff={"Inter"} fw={600} c={"gray"}>
                            Responses
                          </Text>
                        </Container>
                      </Stack>
                      <Stack>
                        <Container my={"xl"}>
                          <Center>
                            <Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
                              7.65
                            </Text>
                            <Text size={"1rem"} fw={700} ta={"center"} ff={"Inter"} c={"gray"}
                                  style={{alignContent: "center"}}>%</Text>
                          </Center>
                          <Text size={"sm"} ta={"center"} ff={"Inter"} fw={600} c={"gray"}>
                            Responses
                          </Text>
                        </Container>
                      </Stack>
                    </Center>
                  </Card.Section>
                  <Card.Section>
                    <Container fluid mb={"xs"}>
                      <Center style={{justifyContent: "left"}}>
                        <ThemeIcon variant={"white"} c={"gray"} size={"sm"}>
                          <IconUser/>
                        </ThemeIcon>
                        <Text size={"xs"} ff={"Inter"} fw={700}>
                          120 Asignados
                        </Text>
                      </Center>
                    </Container>
                  </Card.Section>
                </Card>
              </Card.Section>
              <Card.Section>
                <Group grow justify={"space-between"}>
                  <Group grow my={"xs"} justify={"flex-start"} ml={"md"}>
                    <Stack gap={0}>
                      <Text ta={"left"} size={"md"} ff={"Inter"} fw={600}>
                        Titulo de la Encuesta
                      </Text>
                      <Text size={"xs"} ff={"Inter"} c={"gray"} fw={600}>
                        Ultima respuesta: Agosto 12, 2021 a las 12:00 PM
                      </Text>
                    </Stack>
                  </Group>
                  <ActionIcon variant={"white"} c={"gray"} size={"md"}>
                    <IconDots/>
                  </ActionIcon>
                </Group>
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
        <CardTable loaderData={loaderData} callbackfn={(survey) => (
          <SurveysListItem key={survey.id} survey={survey}/>
        )}/>
      </div>
    </>
  )
    ;
}

export default DashboardSurveys;
