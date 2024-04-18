import type {SupabaseClient} from "@supabase/auth-helpers-remix";
import type {Database} from "~/types/database.types";

export async function getUserRole(supabase: SupabaseClient<Database>) {
  const { data } = await supabase.auth.getUser();
  return (await supabase.from("user_roles").select("id, roles(name)")).data
}