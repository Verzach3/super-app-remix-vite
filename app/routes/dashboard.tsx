import {AppShell} from "@mantine/core";
import {DashNav} from "~/components/dashboard/DashNav";
import {Outlet, useNavigate, useOutletContext} from "@remix-run/react";
import {useEffect} from "react";
import OutletContext from "~/types/OutletContext";

export default function Dashboard() {
  const {supabase, session} = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/")
      }
    })
  }, []);

  useEffect(() => {
    void checkSession()
  }, []);

  async function checkSession() {
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
        <Outlet context={{supabase, session}}/>
      </AppShell.Main>
    </AppShell>
  );
}
