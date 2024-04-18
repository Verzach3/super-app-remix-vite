import { useOutletContext } from "@remix-run/react";
import type OutletContext from "~/types/OutletContext";
import { useEffect } from "react";
import { Container, Title } from "@mantine/core";

function Postauth() {
	const { supabase } = useOutletContext<OutletContext>();

	useEffect(() => {
		supabase.auth.onAuthStateChange((event) => {
			console.log("PostAuth", event);
			if (event === "SIGNED_IN") {
				window.close();
			}
		});
	}, [supabase.auth]);
	return (
		<Container h={"100%"} fluid>
			<Title ff={"Inter"} fw={800} ta={"center"} mt={"5rem"}>
				Ya puedes cerrar esta ventana
			</Title>
		</Container>
	);
}

export default Postauth;
