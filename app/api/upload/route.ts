import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";

// Create a server-side Supabase client with the service role key (server-only)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);


export async function POST(req: Request) {
  try {
    // Accept multipart form data
    const formData = await req.formData();

    // Password check
    const password = (formData.get("password") as string) || "";
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const title = (formData.get("title") as string) || "";
    const file = formData.get("file") as File | null;

    if (!file || !title) {
      return NextResponse.json(
        { error: "Missing file or title" },
        { status: 400 }
      );
    }

    // Use exact bucket name (case sensitive). You said "Newsletter"
    const bucketName = "Newsletter";

    const timestamp = Date.now();
    // sanitize file name a little
    const safeName = file.name.replace(/\s+/g, "-");
    const filePath = `${bucketName}/${timestamp}-${safeName}`;

    // Upload to storage (file is a web File/Blob, which is acceptable)
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public url (if bucket is public). If private, you'd create signed URL.
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    const publicUrl = publicData?.publicUrl ?? null;

    // Insert metadata into your table (table name: "newsletter")
    const { error: insertError } = await supabase.from("newsletter").insert([
      {
        title,
        file_url: publicUrl,
        uploaded_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, fileUrl: publicUrl });
  } catch (err: any) {
    console.error("Upload route error:", err);
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // return latest record
    const { data, error } = await supabase
      .from("newsletter")
      .select("*")
      .order("uploaded_at", { ascending: false })
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data?.[0] || {});
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
