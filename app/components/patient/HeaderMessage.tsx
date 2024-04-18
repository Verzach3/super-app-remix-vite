import {ActionIcon, Card, Center, Stack, Text, ThemeIcon} from "@mantine/core";
import {
  IconArrowForward,
  IconChevronDown,
  IconChevronRight,
  IconMessage2,
  IconMessageCircle
} from "@tabler/icons-react";

interface HeaderMessageProps {
  title: string;
  content: string;
}

function HeaderMessage({title, content}: HeaderMessageProps) {
  return (
    <Card p={1} withBorder my={"0.2rem"} shadow={"xs"}>
      <Center inline style={{
        marginRight: "1rem",
        marginLeft: "1rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        paddingBottom: "0.5rem",
        justifyContent: "space-evenly",
        maxHeight: "6rem",
      }}>
        <Center inline>
          <ThemeIcon radius={100} size={"lg"} mr={"1rem"} variant={"light"}>
            <IconMessageCircle/>
          </ThemeIcon>
          <Stack gap={0}>
            <Text size="md" fw={700} style={{fontFamily: "Inter"}} lineClamp={1}>
              {title}
            </Text>
            <Text size="sm" c="dimmed" style={{maxHeight: "3rem"}} lineClamp={1}>
              {content}{content}{content}{content}
            </Text>
          </Stack>
        </Center>
        <ActionIcon variant={"white"}>
          <IconChevronRight/>
        </ActionIcon>
      </Center>
    </Card>
  )
}

export default HeaderMessage;