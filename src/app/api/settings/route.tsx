import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data } = await supabase.from("Settings").select("*").single();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const payload = await request.json();
  const { data: user } = await supabase.auth.getUser();
  if (user?.user?.id) {
    const { data: row } = await supabase.from("Settings").select("*").single();
    console.log(row, payload);
    if (!row) await supabase.from("Settings").insert(payload);
    else {
      const data = await supabase
        .from("Settings")
        .update(payload)
        .eq("id", row.id);
      console.log(data);
    }
  }
  return NextResponse.json(
    { message: "Successfully updated settings" },
    { status: 200 }
  );
}
