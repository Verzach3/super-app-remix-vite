import {useEffect, useRef, useState} from 'react';
import {UnstyledButton, Tooltip, Title, rem, Text} from '@mantine/core';
import {
    IconHome2
    ,
    IconCalendarMonth,
    IconFileSpreadsheet,
    IconFirstAidKit,
    IconFileInvoice,
    IconLibrary,
    IconMessages,
    IconLogout,
    IconLogout2,
} from '@tabler/icons-react';
import classes from '../../styles/patient/NavBar.module.css';
import autoAnimate from "@formkit/auto-animate";
import {useNavigate} from "@remix-run/react";

const mainLinksLabel = [
    {icon: IconHome2, label: 'Inicio'},
    {icon: IconCalendarMonth, label: 'Citas'},
    {icon: IconFileSpreadsheet, label: 'Registros'},
    {icon: IconFirstAidKit, label: 'Reciba Atencion'},
    {icon: IconFileInvoice, label: 'Pagar Factura'},
    {icon: IconLibrary, label: 'Recursos Para Pacientes'},
    {icon: IconMessages, label: 'Mensajes'},
];

type MainLinksLabels = typeof mainLinksLabel[number]['label'];

type LinksType = {
    [K in MainLinksLabels]: { name: string, path?: string }[];
};

const navLinks: LinksType = {
    "Inicio": [
        {name: "Inicio", path:"/patient/"},
        {name: "Analisis", path: "/patient/lab-results"},
        {name: "Medicamentos", path: "/patient/medications"},
        {name: "Encuestas", path: "/patient/surveys"},
        {name: "Renovar mi receta medica"},
        {name: "Pagar Factura"},
    ],
    "Citas": [
        {name: "Tus citas"}
    ],
    "Registros": [
        {name: "Historias clinicas compartidas"},
        {name: "Analisis", path: "/patient/lab-results"},
        {name: "Resultados de diagnosticos"},
        {name: "Diagnostico por imagenes"},
        {name: "Centro de documentos"},
        {name: "Alergias"},
        {name: "Condiciones de Salud"},
        {name: "Vacunaciones"},
        {name: "Medicamentos", path: "/patient/medications"},
        {name: "Renovar mi receta medica"},
        {name: "Valores clinicos"},
        {name: "Procedimientos"}
    ],
    "Reciba Atencion": [
        {name: "Programar una cita"},
        {name: "Atencion el mismo dia"},
        {name: "Ver ubicaciones"},
        {name: "Salud de la mujer"}
    ],
    "Pagar Factura": [
        {name: "Pendientes"},
        {name: "Historial de pagos"},
        {name: "Gestionar Metodos de pago"}
    ],
    "Recursos Para Pacientes": [
        {name: "Recursos Masculinos"},
        {name: "Recursos Femeninos"},
    ],
    "Mensajes": [
        {name: "Mensajes"},
        {name: "Notificaciones"},
        {name: "Alertas"},
        {name: "Recordatorios"},
    ],
}


export default function NavBar() {
    const [active, setActive] = useState<MainLinksLabels>('Inicio');
    const [activeLink, setActiveLink] = useState('Settings');
    const parent = useRef(null)
    const navigate = useNavigate();
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])
    const mainLinks = mainLinksLabel.map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{duration: 0}}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={classes.mainLink}
                data-active={link.label === active || undefined}
            >
                <link.icon style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
            </UnstyledButton>
        </Tooltip>
    ));

    const links = navLinks[active].map((link) => (
        <a
            className={classes.link}
            data-active={activeLink === link.name || undefined}
            href={link.path || "#"}
            onClick={(event) => {
                event.preventDefault();
                setActiveLink(link.name);
                navigate(link.path || "/patient/")
            }}
            key={link.name}
        >
            {link.name}
        </a>
    ));

    return (
        <div className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.aside}>
                    <div style={{ height: "100%"}}>
                    <div className={classes.logo}>
                        <Text>
                            Logo
                        </Text>
                    </div>
                    {mainLinks}
                    </div>
                    <div>
                        <UnstyledButton
                          onClick={() => {}}
                          className={classes.mainLink}
                          style={{ marginBottom: "1rem"}}
                        >
                            <IconLogout2 style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
                        </UnstyledButton>
                    </div>
                </div>
                <div className={classes.main} ref={parent}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                    {links}
                </div>
            </div>
        </div>
    );
}