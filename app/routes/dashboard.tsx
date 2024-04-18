import {AppShell, LoadingOverlay} from "@mantine/core";
import {DashNav} from "~/components/dashboard/DashNav";
import {Outlet, useNavigate, useNavigation, useOutletContext} from "@remix-run/react";
import {useEffect} from "react";
import type OutletContext from "~/types/OutletContext";

export default function Dashboard() {
  const {supabase, session} = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const navigation = useNavigation()
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/")
      }
    })
  }, [navigate, supabase.auth]);

  useEffect(() => {
    void checkSession()
  }, []);

  async function checkSession() {
    await supabase.auth.getUser()
    const ses = await supabase.auth.getSession()
    console.log(ses)
  }

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar>
        <DashNav/>
      </AppShell.Navbar>
      <AppShell.Main>
        <LoadingOverlay visible={navigation.state === "loading"} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Outlet context={{supabase, session}}/>
      </AppShell.Main>
    </AppShell>
  );
}
