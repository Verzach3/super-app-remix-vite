import {ActionIcon, Menu, rem, Text} from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings, IconTrash
} from "@tabler/icons-react";

function SurveysAffixBtn() {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size={"xl"} radius={100}>
          <IconPlus/>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Encuesta</Menu.Label>
        <Menu.Item leftSection={<IconPlus style={{width: rem(14), height: rem(14)}}/>}>
         Crear
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{width: rem(14), height: rem(14)}}/>}>
          TBD
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto style={{width: rem(14), height: rem(14)}}/>}>
          TBD
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{width: rem(14), height: rem(14)}}/>}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider/>

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          leftSection={<IconArrowsLeftRight style={{width: rem(14), height: rem(14)}}/>}
        >
          Transfer my data
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{width: rem(14), height: rem(14)}}/>}
        >
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default SurveysAffixBtn;