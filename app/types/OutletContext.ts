import {Session, SupabaseClient} from "@supabase/auth-helpers-remix";
import {Database} from "~/types/database.types";

export default interface OutletContext { supabase: SupabaseClient<Database>, session: Session | null };