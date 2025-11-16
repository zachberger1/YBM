import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are not set");
        return NextResponse.json({ fileUrl: null }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from("newsletter")
        .select("file_url")
        .order("uploaded_at", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error("LATEST ERROR:", error);
        return NextResponse.json({ fileUrl: null }, { status: 500 });
    }

    return NextResponse.json({ fileUrl: data.file_url });
}
