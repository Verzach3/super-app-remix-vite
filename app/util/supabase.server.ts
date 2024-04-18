import {createServerClient as _createServerClient} from '@supabase/auth-helpers-remix';
import {Database} from "~/types/database.types";
import {createClient} from "@supabase/supabase-js";
import process from "process";


export const createServerClient = ({
                                     request, response
                                   }: {
  request: Request;
  response: Response;
}) =>
  _createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    request,
    response
  });


export const createAdminClient = () => createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})