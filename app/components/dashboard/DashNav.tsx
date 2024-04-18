import { Button, Code, Group, Text } from "@mantine/core";
import { Link, useLocation, useOutletContext } from "@remix-run/react";
import type { Session, SupabaseClient } from "@supabase/auth-helpers-remix";
import {
	IconCheckbox,
	IconLayoutDashboard,
	IconLogout,
	IconPlugConnected,
	IconPuzzle,
	IconReport,
	IconSettings,
	IconUsers,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { UserButton } from "~/components/dashboard/UserButton";
import classes from "../../styles/dashboard/DashNav.module.css";

const data = [
	{ link: "/dashboard", label: "Inicio", icon: IconLayoutDashboard },
	{ link: "/dashboard/surveys", label: "Encuestas", icon: IconCheckbox },
	{ link: "/dashboard/surveys/results", label: "Resultados", icon: IconReport },
	{ link: "/dashboard/patients", label: "Pacientes", icon: IconUsers },
	{
		link: "/dashboard/integrations",
		label: "Integraciones",
		icon: IconPlugConnected,
	},
	{ link: "/dashboard/modules", label: "Modulos", icon: IconPuzzle },
	{ link: "/dashboard/settings", label: "Ajustes", icon: IconSettings },
];

export function DashNav() {
	const navigation = useLocation();
	const [active, setActive] = useState("Encuestas");
	const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();
	const [session, setSession] = useState<Session | null>(null);
	const setSessionData = useCallback(async () => {
		const ses = await supabase.auth.getSession();
		if (ses.error || !ses.data.session) {
			return;
		}
		setSession(ses.data.session);
		console.log(ses.data.session);
	}, [supabase.auth]);

	async function handleLogout() {
		await supabase.auth.signOut();
	}

	useEffect(() => {
		const current = navigation.pathname.split("/").pop();
		for (const item of data) {
			if (item.link.split("/").pop() === current) {
				setActive(item.label);
			}
		}
		if (navigation.pathname === "/dashboard") {
			setActive("Inicio");
		}
	}, [navigation]);

	useEffect(() => {
		void setSessionData();
		supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
		});
	}, [setSessionData, supabase.auth]);

	const links = data.map((item) => (
		<Link
			className={classes.link}
			data-active={item.label === active || undefined}
			to={item.link}
			key={item.label}
			onClick={() => {
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				<Group className={classes.header} justify="space-between">
					<Text style={{ fontFamily: "Inter" }} fw={900}>
						SuperApp
					</Text>
					<Code fw={700}>v0.0.1</Code>
				</Group>
				{links}
			</div>

			<div className={classes.footer}>
				<UserButton session={session ?? undefined} />
				<Button
					className={classes.link}
					onClick={(event) => {
						event.preventDefault();
						handleLogout().then((r) => console.log(r));
					}}
				>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</Button>
			</div>
		</nav>
	);
}
