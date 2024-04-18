import {Card, Group, Text, Title} from "@mantine/core";
import {AreaChart, BarChart} from "@mantine/charts";
import {surveysAreaData} from "~/util/surveysAreaData";
import {barChartData} from "~/util/surveysBarChartData";

export default function DashboardSurveys_Results() {
  return (
    <div style={{margin: "1rem"}}>
      <Title style={{fontFamily: "Inter", marginBottom: "1rem"}}>
        Resultados
      </Title>
      <Card withBorder p={"xs"}>
        <Group justify={"space-around"}>
          <Group>
            <Text style={{fontFamily: "Inter"}}>
              Encuesta:
            </Text>
            <Text style={{fontFamily: "Inter"}}>
              Survey Name
            </Text>
          </Group>
          <Group>
            <Text style={{fontFamily: "Inter"}}>
              Link:
            </Text>
            <Text style={{fontFamily: "Inter"}}>
              Survey Link
            </Text>
          </Group>
          <Group>
            <Text style={{fontFamily: "Inter"}}>
              Responses:
            </Text>
            <Text style={{fontFamily: "Inter"}}>
              Survey Responses
            </Text>
          </Group>
        </Group>
      </Card>

      <Group>
        <Group style={{ marginTop: "2rem"}}>
          <Title size={"1rem"} style={{ fontFamily: "Inter"}} p={"1rem"}>
            Respuesta de Algo
          </Title>
        <AreaChart
          h={300}
          data={surveysAreaData}
          dataKey="date"
          series={[
            {name: 'Apples', color: 'indigo.6'},
            {name: 'Oranges', color: 'blue.6'},
            {name: 'Tomatoes', color: 'teal.6'},
          ]}
          curveType="natural"
        />
        </Group>
        <Group style={{ marginTop: "2rem"}}>
          <Title size={"1rem"} style={{ fontFamily: "Inter"}} p={"1rem"}>
            Respuesta de otra cosa
          </Title>
        <BarChart
          h={300}
          data={barChartData}
          dataKey="month"
          type="stacked"
          series={[
            {name: 'Smartphones', color: 'violet.6'},
            {name: 'Laptops', color: 'blue.6'},
            {name: 'Tablets', color: 'teal.6'},
          ]}
        />
        </Group>
      </Group>

    </div>
  )
}