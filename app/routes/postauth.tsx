import {useOutletContext} from "@remix-run/react";
import OutletContext from "~/types/OutletContext";
import React, {useEffect} from "react";
import {Container, Title} from "@mantine/core";


function Postauth() {

  const {supabase} = useOutletContext<OutletContext>()

    useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("PostAuth", event)
      if (event === "SIGNED_IN") {
        window.close()
      }
    })
  }, []);
  return (
    <Container h={"100%"} fluid>
      <Title ff={"Inter"} fw={800} ta={"center"} mt={"5rem"}>
        Ya puedes cerrar esta ventana
      </Title>
    </Container>

  );
}

export default Postauth;