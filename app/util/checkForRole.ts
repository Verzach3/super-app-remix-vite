import {SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";

export async function checkForRoles(role: string[], supabase: SupabaseClient<Database>) {
  const session = await supabase.auth.getSession();
  if (!session) {
    return false;
  }
  if (!session.data.session?.user.id) {
    return false;
  }
  const res = await supabase.from("user_roles").select("roles (name)").eq("user_id", session.data.session?.user.id).single();
  if (!res.data || !res.data.roles) {
    return false;
  }

  return role.some((r) => res.data.roles?.name === r);
}