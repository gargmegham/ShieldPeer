import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

const handler = async (_request: Request): Promise<Response> => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const result = await supabase.from("auth.users").select("email").order("created_at", { ascending: false }).limit(1)
    const email = result.data?.[0]?.email ?? "No email found"
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: "Supabase-Resend <team@meghamgarg.com>",
            to: ["meghamgarg@gmail.com"],
            subject: "New Signup On ShieldPeer! 🚀",
            html: `
Hi Megham,

A new user just signed up on ShieldPeer with the email ${email}.

Cheers,
The ShieldPeer Team
`,
        }),
    })
    const data = await res.json()
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

serve(handler)
