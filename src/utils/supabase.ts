import { cookies } from "next/headers"

import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * @description Get the Supabase Client, can only access data that the user has access to
 * @returns SupabaseClient
 */
export function getSupabaseClient() {
    const cookieStore = cookies()
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value, ...options })
                } catch (error) {
                    // The `set` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
            remove(name: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value: "", ...options })
                } catch (error) {
                    // The `delete` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    })
}

/**
 * @description Get the Supabase Service Client, this can bypass row level security
 * @param key
 * @returns SupabaseClient
 */
export const getSupabaseServiceClient = (key?: string): SupabaseClient => {
    if (key) return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key)
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}
