// /app/api/latest/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are not set");
    return NextResponse.json({ latest: null }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from("newsletter")
    .select("*")
    .order("uploaded_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("LATEST ERROR:", error);
    return NextResponse.json({ latest: null });
  }

  return NextResponse.json({ latest: data });
}
