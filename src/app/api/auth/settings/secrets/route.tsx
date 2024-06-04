import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Secrets").select("*");
  console.log(data, error, "fetch secrets");
}
