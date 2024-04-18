import type {PatientProfile, Survey} from "~/types/DBTypes";
import {Card, Table} from "@mantine/core";

export function CardTable(props: {
  loaderData: { data: null; error: string } | {
    data: {
      patients: PatientProfile[] | null;
      surveys: Survey[] | null;
    };
    error: null
  },
  callbackfn: (survey: Survey) => JSX.Element
}) {
  return <Card withBorder>
    <Table>
      <Table.Thead
        style={{
          backgroundColor: "#f5f5f5",
          borderColor: "#C6C6C6",
        }}
      >
        <Table.Tr>
          <Table.Th>Nombre</Table.Th>
          <Table.Th>Descripcion</Table.Th>
          <Table.Th>Survey Status</Table.Th>
          <Table.Th>Survey Date</Table.Th>
          <Table.Th>Link</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {props.loaderData.data?.surveys?.map(props.callbackfn)}
      </Table.Tbody>
    </Table>
  </Card>;
}