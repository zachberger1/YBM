import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use the service role key server-side for unrestricted writes
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;

    if (!file || !title) {
      return NextResponse.json({ error: "Missing file or title" }, { status: 400 });
    }

    const timestamp = Date.now();
    const filePath = `newsletters/${timestamp}-${file.name}`;

    // Convert File to Buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload to your actual bucket name: "newsletter"
    const { error: uploadError } = await supabase.storage
      .from("newsletter")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("newsletter")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Insert into database
    const { error: insertError } = await supabase.from("newsletter").insert([
      {
        title,
        file_url: publicUrl,
        uploaded_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, fileUrl: publicUrl });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("newsletter")
    .select("*")
    .order("uploaded_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data?.[0] || {});
}
