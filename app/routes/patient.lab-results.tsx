import ResultsFilter from "~/components/patient/ResultsFilter";
import { Container, SimpleGrid,  Title} from "@mantine/core";
import LabResultItem from "~/components/patient/lab/LabResultItem";

function PatientLabResults() {
  return (
    <Container>
      <Title style={{fontFamily: "Inter", fontWeight: 800, marginBottom: "3rem", marginTop: "2rem"}}>
        Resultados de Laboratorio
      </Title>
      <ResultsFilter/>
      <SimpleGrid style={{marginTop: "3rem"}} cols={2}>
        <LabResultItem/>
        <LabResultItem/>
        <LabResultItem/>
        <LabResultItem/>
      </SimpleGrid>
    </Container>
  )
}

export default PatientLabResults;