import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("newsletter")
            .select("file_url")
            .order("uploaded_at", { ascending: false })
            .limit(1);

        if (error) {
            console.error("Supabase fetch error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ fileUrl: null });
        }

        return NextResponse.json({ fileUrl: data[0].file_url });
    } catch (err: any) {
        console.error("GET /api/latest error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
