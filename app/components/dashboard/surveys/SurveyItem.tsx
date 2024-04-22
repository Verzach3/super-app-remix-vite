import {
	ActionIcon,
	Badge,
	Card,
	Center,
	Container,
	Group,
	Menu,
	rem,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import {
	IconDots,
	IconMessageCircle,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";

interface SurveyItemProps {
	title: string;
	lastResponse: string;
	responses: number;
	percentage: number;
	assigned: number;
}

export function SurveyItem({
	title,
	lastResponse,
	responses,
	percentage,
	assigned,
}: SurveyItemProps) {
	return (
		<Card>
			<Card.Section>
				<Card withBorder radius={"lg"} shadow={"md"}>
					<Card.Section>
						<Container mt={"md"}>
							<Badge size={"md"} variant={"light"}>
								Programa
							</Badge>
						</Container>
					</Card.Section>
					<Card.Section>
						<Center>
							<Stack>
								<Container>
									<Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
										{responses}
									</Text>
									<Text
										size={"sm"}
										ta={"center"}
										ff={"Inter"}
										fw={600}
										c={"gray"}
									>
										Responses
									</Text>
								</Container>
							</Stack>
							<Stack>
								<Container my={"xl"}>
									<Center>
										<Text size={"2rem"} fw={700} ta={"center"} ff={"Inter"}>
											{percentage}
										</Text>
										<Text
											size={"1rem"}
											fw={700}
											ta={"center"}
											ff={"Inter"}
											c={"gray"}
											style={{ alignContent: "center" }}
										>
											%
										</Text>
									</Center>
									<Text
										size={"sm"}
										ta={"center"}
										ff={"Inter"}
										fw={600}
										c={"gray"}
									>
										Responses
									</Text>
								</Container>
							</Stack>
						</Center>
					</Card.Section>
					<Card.Section>
						<Container fluid mb={"xs"}>
							<Center style={{ justifyContent: "left" }}>
								<ThemeIcon variant={"white"} c={"gray"} size={"sm"}>
									<IconUser />
								</ThemeIcon>
								<Text size={"xs"} ff={"Inter"} fw={700}>
									{assigned} Asignados
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
								{title}
							</Text>
							<Text size={"xs"} ff={"Inter"} c={"gray"} fw={600}>
								Ultima respuesta: {lastResponse}
							</Text>
						</Stack>
					</Group>
					<Menu shadow="md" width={200}>
						<Menu.Target>
									<ActionIcon variant={"white"} c={"gray"} size={"md"}>
										<IconDots />
									</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Label>Application</Menu.Label>
							<Menu.Item
								leftSection={
									<IconSettings style={{ width: rem(14), height: rem(14) }} />
								}
							>
								Settings
							</Menu.Item>
							<Menu.Item
								leftSection={
									<IconMessageCircle
										style={{ width: rem(14), height: rem(14) }}
									/>
								}
							>
								Messages
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section>
		</Card>
	);
}
