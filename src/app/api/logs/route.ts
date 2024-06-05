import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/utils/supabase"

import type { Log } from "@/types/database"

export async function GET(request: NextRequest) {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10
    const { data } = await supabase.from("Logs").select("*").range(page, itemsPerPage)
    return NextResponse.json(data as Log[])
}
