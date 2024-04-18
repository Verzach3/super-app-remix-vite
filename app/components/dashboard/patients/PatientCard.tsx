import {Button, Card, Container, Group, Stack, Text, ThemeIcon} from "@mantine/core";
import {IconUser, IconUserPlus} from "@tabler/icons-react";
import type CompoundPatient from "~/fhir-supa/compoundPatient";

function PatientCard({patient}: { patient: CompoundPatient }) {
  return <Card withBorder m={"md"}>
    <Group gap={0}>
      <Text fw={700}>
        EMR Id:
      </Text>
      <Text>
        {patient.emrId}
      </Text>
      <Text fw={700}>
        DB Id:
      </Text>
      <Text>
        {patient.dbId ?? "No Profile"}
      </Text>
    </Group>
    <Group gap={0}>
      <ThemeIcon size={"xl"} mr={"1rem"}>
        <IconUser/>
      </ThemeIcon>
      <Group>
        <Stack gap={0}>
          <Group>
            <Text fw={700}>
              Nombre:
            </Text>
            <Text>
              {patient.getName()}
            </Text>
          </Group>
          <Group>
            <Text fw={700}>
              Nacimiento:
            </Text>
            <Text>
              {patient.birthDate}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Group>
    <Group>
      <Button>
        Ver
      </Button>
      <Button rightSection={
        <ThemeIcon>
          <IconUserPlus/>
        </ThemeIcon>
      }>
        Asignar Usuario
      </Button>
    </Group>
  </Card>;
}

export default PatientCard;