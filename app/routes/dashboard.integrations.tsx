import {Button, Card, Center, Container, Group, Loader, Modal, Text, ThemeIcon, Title} from "@mantine/core";
import {IconCircleCheck, IconPlayerPlay} from "@tabler/icons-react";
import {useState} from "react";

function DashboardIntegrations() {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  async function startResourcesIntegration() {
    setLoading(true);
    const options = {method: 'GET'};
    await fetch('https://n8n.containers.wellfitclinic.com/webhook/b6166b6c-27f4-43d4-9723-745900cae429', options)
    setFinished(true);
  }

  async function startBlogsIntegrations() {
    setLoading(true);
    const options = {method: 'GET'};
    await fetch('https://n8n.containers.wellfitclinic.com/webhook/9870ed7d-44b4-4efe-90c9-b21e8c040b20', options)
    setFinished(true);
  }

  return (
    <>
      <Modal opened={loading} onClose={() => {
        if (finished) {
          setLoading(false);
        }
      }} centered withCloseButton={finished}>
        <Container>
          <Title>
            {!finished ? "Integracion Iniciada" : "Integracion Terminada"}
          </Title>
          {!finished ? (
            <>
              <Text>
                Esperando respuesta del servidor
              </Text>
              <Center style={{paddingBottom: "2rem", marginTop: "2rem"}}>
                <Loader size={"lg"} type={"bars"}/>
              </Center>
            </>
          ) : (
            <>
              <Text>
                Integracion Completada
              </Text>
              <Center style={{marginTop: "2rem", paddingBottom: "2rem"}}>
                <ThemeIcon size={"5rem"} color={"green"} radius={100}>
                  <IconCircleCheck size={"3rem"}/>
                </ThemeIcon>
              </Center>
            </>
          )
          }
        </Container>
      </Modal>
      <Container mx={"2rem"} mt={"2rem"}>
        <Title style={{fontFamily: "Inter", marginBottom: "3rem"}}>
          Integraciones
        </Title>
        <Card withBorder my={"1rem"}>
          <Group justify={"space-between"}>
            <Text fw={600} style={{fontFamily: "Inter"}}>
              Resources
            </Text>
            <Group>
              <Button onClick={startResourcesIntegration} disabled={loading} rightSection={
                <ThemeIcon radius={100} variant={"white"} size={"xs"}>
                  <IconPlayerPlay size={"1rem"}/>
                </ThemeIcon>
              }>
                Iniciar
              </Button>
            </Group>
          </Group>
        </Card>
        <Card withBorder my={"1rem"}>
          <Group justify={"space-between"}>
            <Text fw={600} style={{fontFamily: "Inter"}}>
              Blogs
            </Text>
            <Group>
              <Button onClick={startResourcesIntegration} disabled={loading} rightSection={
                <ThemeIcon radius={100} variant={"white"} size={"xs"}>
                  <IconPlayerPlay size={"1rem"}/>
                </ThemeIcon>
              }>
                Iniciar
              </Button>
            </Group>
          </Group>
        </Card>
      </Container>
    </>
  )
}

export default DashboardIntegrations;