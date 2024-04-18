import {Card, Group, Image, Text} from "@mantine/core";

interface ShortCutProps {
  image: string;
  title: string;
  description: string;
}
function ShortCut({image, title, description}: ShortCutProps) {
  return (
    <Card withBorder w={"20rem"} mx={"1rem"}>
      <Card.Section>
        <Image src={image} style={{objectFit: "cover", width: "100%", height: "10rem"}}/>
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>
      <Group>
        <Text size="sm">{description}</Text>
      </Group>
    </Card>
  )
}

export default ShortCut;