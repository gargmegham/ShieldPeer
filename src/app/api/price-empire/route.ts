import { NextResponse } from "next/server"

import { cronJob } from "@/utils/price-empire"

export async function POST() {
    console.info("Cron job for fetching Price Empire inventory and price history has started...")
    cronJob()
    return NextResponse.json({ status: 200 })
}
