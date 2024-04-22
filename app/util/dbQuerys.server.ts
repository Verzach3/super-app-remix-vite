import type {SupabaseClient} from "@supabase/auth-helpers-remix";
import type {Database} from "~/types/database.types";

type SupaClient = SupabaseClient<Database>

export async function getSurveysAsigns(supabase: SupaClient) {
  const {data, error} = await supabase.from("surveys_asigns").select("*");
  if (error) {
    throw error;
  }
  return data;
}