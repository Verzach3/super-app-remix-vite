import {Menu, rem, Table, Text, Button, Title, ThemeIcon, Center} from "@mantine/core";

import {useDisclosure} from "@mantine/hooks";
import {
  IconApps,
  IconArrowsLeftRight, IconDropletDown, IconEye, IconLink,
  IconMessageCircle, IconPencil,
  IconPhoto, IconReport,
  IconSearch,
  IconSettings,
  IconTrash, IconUserPlus
} from "@tabler/icons-react";
import {Survey} from "~/types/DBTypes";

function SurveysListItem({survey}: { survey: Survey }) {
  const [opened, {open, close}] = useDisclosure(false)
  return (
    <>
      <Table.Tr onContextMenu={(e) => {
        e.preventDefault()
        open()
      }}>
        <Table.Td>{survey.name ?? ""}</Table.Td>
        <Table.Td>
          <Text lineClamp={1}>
            {survey.description}
          </Text>
        </Table.Td>
        <Table.Td>Survey Status</Table.Td>
        <Table.Td>Survey Date</Table.Td>
        <Table.Td>
          <Center>
            <Text>
              Link
            </Text>
            <ThemeIcon variant={"white"} color={"black"} styles={{root: {border: 0}}}>
              <IconLink size={20}/>
            </ThemeIcon>
          </Center>
        </Table.Td>
        <Table.Td>
          <Menu trigger={"click"}>
            <Menu.Target>
              <Button rightSection={<IconApps/>} variant={"light"}>
                Acciones
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Encuesta</Menu.Label>
              <Menu.Item leftSection={<IconPencil style={{width: rem(14), height: rem(14)}}/>}>
                Editar
              </Menu.Item>
              <Menu.Item leftSection={<IconUserPlus style={{width: rem(14), height: rem(14)}}/>}>
                Asignar
              </Menu.Item>
              <Menu.Item leftSection={<IconEye style={{width: rem(14), height: rem(14)}}/>}>
                Preview
              </Menu.Item>
              <Menu.Item leftSection={<IconReport style={{width: rem(14), height: rem(14)}}/>}>
                Answers
              </Menu.Item>
              <Menu.Divider/>
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
              >
                Eliminar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  )
}

export default SurveysListItem;