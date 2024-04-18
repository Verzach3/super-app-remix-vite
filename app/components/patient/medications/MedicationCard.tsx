import {Card, Group, Text} from "@mantine/core";

interface MedicationCardProps {
    name: string;
    orderedBy: string;
    dose: string;
    frequency: string;
    via: string;
}

function MedicationCard({name, orderedBy, dose, frequency, via}: MedicationCardProps) {
    return (
        <Card withBorder>
            <Text style={{fontFamily: "Inter"}} size={"lg"} fw={600}>
                {name}
            </Text>
            <Group>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={600}>
                    Ordenado por:
                </Text>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={400}>
                    {orderedBy}
                </Text>
            </Group>
            <Group>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={600}>
                    Dosis:
                </Text>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={400}>
                    {dose}
                </Text>
            </Group>
            <Group>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={600}>
                    Frecuencia:
                </Text>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={400}>
                    {frequency}
                </Text>
            </Group>
            <Group>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={600}>
                    Via:
                </Text>
                <Text style={{fontFamily: "Inter"}} size={"md"} fw={400}>
                    {via}
                </Text>
            </Group>
        </Card>
    )
}

export default MedicationCard;