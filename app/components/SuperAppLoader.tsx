import {Center, Loader, Stack, Title} from "@mantine/core";

function SuperAppLoader() {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        height: "100vh",
      }}
    >
      <Stack>
        <Title fw={900} style={{ fontFamily: "Inter" }}>
          Super App
        </Title>
        <Center style={{ marginTop: "1rem" }}>
          <Loader type={"bars"} color={"red"} />
        </Center>
      </Stack>
    </div>
  );
}

export default SuperAppLoader;