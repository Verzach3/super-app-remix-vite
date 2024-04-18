import {Button, Divider, Group, Menu, Stack, Text} from "@mantine/core";

function ResultsFilter() {
  return (
    <>
      <Group gap={0}>
        <Menu>
          <Menu.Target>
            <Button variant={"white"} radius={0}>
              <Text style={{fontFamily: "Inter"}} fw={600}>
                Filtrar
              </Text>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack gap={0}>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  A - Z
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Z - A
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Fecha (Ascendente)
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Fecha (Descendente)
                </Text>
              </Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <Button variant={"white"} radius={0}>
              <Text style={{fontFamily: "Inter"}} fw={600}>
                Ordernar Por
              </Text>
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Stack gap={0}>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  A - Z
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Z - A
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Fecha (Ascendente)
                </Text>
              </Button>
              <Button variant={"white"} radius={0}>
                <Text style={{fontFamily: "Inter"}} fw={600}>
                  Fecha (Descendente)
                </Text>
              </Button>
            </Stack>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider/>
    </>
  )
}

export default ResultsFilter;