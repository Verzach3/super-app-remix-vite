import {json, LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import SuperAppLoader from "~/components/SuperAppLoader";
import {useLoaderData, useNavigate, useNavigation, useOutletContext} from "@remix-run/react";
import {useEffect} from "react";
import {Button, Text} from "@mantine/core";
import OutletContext from "~/types/OutletContext";
import {createAdminClient, createServerClient} from "~/util/supabase.server";
import {getUserRole} from "~/util/getUserRole";

export const meta: MetaFunction = () => {
  return [
    {title: "Super App"},
    {name: "description", content: "Welcome to SuperApp!"},
  ];
};

export async function loader({request}: LoaderFunctionArgs) {
  const response = new Response()
  const supabase = createServerClient({request, response});
  const userRes = await supabase.auth.getUser();
  if (!userRes.data || !userRes.data.user) {
    return json({
      error: "No estas logueado"
    }, {
      headers: response.headers,
    })
  }
  const user = userRes.data.user
  let role = null
  try {
    role = await getUserRole(supabase);
  } catch (e) {
  }
  if (role === null) {
    return json({error: "Error obteniendo el rol"}, {
      headers: response.headers,
    })
  }
  if (role.length === 0) {
    console.log(`El usuario ${(await supabase.auth.getSession()).data.session?.user.email} no tiene rol asignado, asignando..`)
    const adminClient = createAdminClient();
    const role = await adminClient.from("roles").select("id, name").eq("name", "client").single();
    if (!role.data) {
      return json({
        error: "Error asignando rol: rol no encontrado"
      }, {
        headers: response.headers,
      })
    }
    await adminClient.from("user_roles").insert({role_id: role.data.id, user_id: user.id})
    return json({
      data: {role: role.data.name}
    }, {
      headers: response.headers,
      status: 201
    })
  }
  return json({
    data: {
      // @ts-ignore object is not null
      role: role[0].roles.name
    }
  }, {
    headers: response.headers,
    status: 200
  })
}

export default function Index() {
  const {supabase, session} = useOutletContext<OutletContext>()
  const loaderData = useLoaderData<typeof loader>()
  const navigate = useNavigate();
  useEffect(() => {
    if ("error" in loaderData) {
      console.log("Error, going to auth")
      navigate("/auth")
      return
    }
    if (loaderData.data.role === "client") {
      console.log("Client")
      navigate("/patient")
      return
    }

    if (loaderData.data.role === "admin" || loaderData.data.role === "editor") {
      console.log("Admin || Editor")
      navigate("/dashboard")
      return;
    }
  }, [loaderData]);
  return (
    <>
      <Text>
        {session ? "You are logged in" : "You are not logged in"}
      </Text>
      <Button onClick={() => supabase.auth.signOut()}>
        Logout
      </Button>
      <SuperAppLoader/>
    </>
  );
}
