import {Affix, Button, JsonInput, Modal, TextInput} from "@mantine/core";
import {IconPlus} from "@tabler/icons-react";

export function CreateSurveyModal(props: { opened: boolean, onClose: () => void }) {
  return <Modal
    pb={"xl"}
    size={"xl"}
    opened={props.opened}
    onClose={props.onClose}
    centered
    title={"Crear una Encuesta"}
    styles={{
      title: {
        fontFamily: "Inter",
        fontWeight: 600,
      },
    }}
  >
    <TextInput
      label={"Nombre de la Encuesta"}
      placeholder={"Encuesta de satisfaccion"}
      required
    />
    <TextInput
      label={"Descripcion de la Encuesta"}
      placeholder={"Una descripcion"}
      mt={"sm"}
    />
    <JsonInput
      variant={"filled"}
      style={{
        marginTop: "1rem",
      }}
      label={"El JSON de la Encuesta"}
      placeholder="{Hello: 'World'}"
      validationError="Invalid JSON"
      formatOnBlur
      autosize
      minRows={6}
    />
    <Affix position={{bottom: 10, right: 10}}>
      <Button
        style={{marginTop: "1rem"}}
        color="teal"
        rightSection={<IconPlus/>}
      >
        Crear
      </Button>
    </Affix>
  </Modal>;
}