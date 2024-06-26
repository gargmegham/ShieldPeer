// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// @ts-ignore
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
// @ts-ignore
const RESEND_TO_EMAIL = Deno.env.get("RESEND_TO_EMAIL")
// @ts-ignore
const RESEND_FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL")

interface User {
    email: string
}

interface WebhookPayload {
    type: "INSERT"
    table: string
    record: User
    schema: "public"
    old_record: null
}

const handler = async (_request: Request): Promise<Response> => {
    const payload: WebhookPayload = await _request.json()
    const email = payload?.record?.email ?? "404"
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
            from: `Supabase-Resend <${RESEND_FROM_EMAIL}>`,
            to: [RESEND_TO_EMAIL],
            subject: "New Signup On ShieldPeer! 🚀",
            html: `
<div>
          <h1>New Signup On ShieldPeer! 🚀</h1>
          <div style='margin-top: 4px;'><strong>Email:</strong> ${email}</div>
          <div style='margin-top: 4px;'><strong>Time:</strong> ${new Date().toISOString()}</div>
</div>
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
