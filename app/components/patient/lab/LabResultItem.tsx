import {Card, Group, Stack, Text, ThemeIcon} from "@mantine/core";
import {IconChevronRight, IconFlask} from "@tabler/icons-react";

function LabResultItem() {
  return (
    <Card withBorder>
      <Group style={{justifyContent: "space-between"}}>
        <Group style={{justifyContent: "space-between"}}>
          <ThemeIcon variant={"light"}>
            <IconFlask/>
          </ThemeIcon>
          <Stack gap={0}>
            <Text style={{fontFamily: "Inter"}} fw={600}>
              Resultado 1
            </Text>
            <Group>
              <Text style={{fontFamily: "Inter"}} fw={600}>
                Ordenado por:
              </Text>
              <Text>
                Doctor
              </Text>
            </Group>
          </Stack>
        </Group>
        <ThemeIcon variant={"white"}>
          <IconChevronRight/>
        </ThemeIcon>
      </Group>
    </Card>
  )
}

export default LabResultItem;