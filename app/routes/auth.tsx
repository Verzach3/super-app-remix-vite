import {
  Title,
  Text,
  Paper,
  TextInput,
  Button,
  Image, Box, LoadingOverlay, Center, Modal, ThemeIcon
} from "@mantine/core";
import classes from "~/styles/routes/auth.module.css";
import {useNavigate, useOutletContext} from "@remix-run/react";
import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {useDisclosure} from "@mantine/hooks";
import {IconCheck} from "@tabler/icons-react";

function Auth() {
  const navigate = useNavigate();
  const [isModalOpened, {close, open}] = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const {supabase, session} = useOutletContext<{ supabase: SupabaseClient<Database>, session: Session | null }>();
  const loginForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalido'),
    }
  })

  async function sendLink({email}: { email: string }) {
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email: email,
      options: {emailRedirectTo: "http://localhost:3000/auth/callback"}
    });
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      console.log("Auth state change", event)
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    })
  }, []);

  return (
    <>
      <Modal opened={isModalOpened} onClose={close} zIndex={2000} centered withCloseButton={false}>
        <Center>
          <Paper p={20} radius={0}>
            <Center mb={10}>
              <ThemeIcon radius={100} size={90}>
                <IconCheck size={50} stroke={1.5}/>
              </ThemeIcon>
            </Center>
            <Title order={2} ta="center" mb={20} ff={"Inter"}>
              Se ha enviado un link a tu correo electronico
            </Title>
            <Text ta="center" mb={20} ff={"Inter"}>
              Revisa tu correo electronico y haz click en el link para continuar
            </Text>
          </Paper>
        </Center>
      </Modal>
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Box pos="relative">
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
            <Image src={"/wellfit-bottom-text.svg"} h={200} fit={"contain"}/>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              Bienvenido a WellFit
            </Title>
            <form onSubmit={loginForm.onSubmit(async values => {
              setLoading(true)
              await sendLink(values)
              setLoading(false)
              open()
            })}>
              <TextInput label="Correo Electronico"
                         placeholder="hola@gmail.com" size="md" {...loginForm.getInputProps("email")}/>
              <Button fullWidth mt="xl" size="md" type={"submit"}>
                Ingresa o Registrate
              </Button>
            </form>
          </Box>
        </Paper>
      </div>
    </>
  )
}


export default Auth;
