import {UnstyledButton, Group, Avatar, Text, rem, Stack} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import classes from '../../styles/dashboard/UserButton.module.css';
import type {Session} from "@supabase/auth-helpers-remix";

export function UserButton({session}: { session?: Session }) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />
        <Group>

          <Stack gap={0} style={{width: "fit-content"}}>
            <Text size="sm" fw={500}>
              Harriette Spoonlicker
            </Text>

            <Text c="dimmed" size="xs" lineClamp={1} truncate={"end"}>
              {session?.user.email}
            </Text>
          </Stack>
          <IconChevronRight style={{width: rem(14), height: rem(14)}} stroke={1.5}/>
        </Group>
      </Group>
    </UnstyledButton>
  );
}