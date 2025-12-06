import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // 1. Vercel Blob Storage (Production)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
            const blob = await put(file.name, file, {
                access: 'public',
            });
            return NextResponse.json({ success: true, url: blob.url });
        } catch (error) {
            console.error("Vercel Blob upload failed:", error);
            return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
        }
    }

    // 2. Local Filesystem Storage (Development)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) {
        console.error("Error creating upload directory:", e);
    }

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, "")}`;
    const filepath = path.join(uploadDir, filename);

    try {
        await writeFile(filepath, buffer);
        return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (e) {
        console.error("Error saving file:", e);
        return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
    }
}
