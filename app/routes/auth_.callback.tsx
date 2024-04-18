import { type LoaderFunctionArgs, redirect } from '@remix-run/node';
import {createServerClient} from "~/util/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  const response = new Response();
  if (code) {
    const supabase = createServerClient({ request, response });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return redirect('/postauth', {
    status: 303,
    headers: response.headers
  });
}
