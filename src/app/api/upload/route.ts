import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { headers } from "next/headers";
import path from "path";
import crypto from "crypto";

// Maximum file size: 10MB
const MAX_FILE_SIZE = 1000 * 1024 * 1024;

// Allowed file types
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp',
  'image/gif'
];

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime'
];

const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Validation
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 10MB" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "File type not allowed. Please upload images or videos only." },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = './public/uploads';
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename to prevent conflicts
    const fileExtension = path.extname(file.name);
    const timestamp = Date.now();
    const randomString = crypto.randomBytes(8).toString('hex');
    const uniqueFilename = `${timestamp}-${randomString}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Write file to disk
    const fileBuffer = await file.arrayBuffer();
    writeFileSync(filePath, Buffer.from(fileBuffer));

    // Construct URL
    const origin = headersList.get('origin') || 'http://localhost:3000';
    const fileUrl = `${origin}/uploads/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      data: {
        url: fileUrl,
        filename: uniqueFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        isImage: ALLOWED_IMAGE_TYPES.includes(file.type),
        isVideo: ALLOWED_VIDEO_TYPES.includes(file.type)
      },
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during file upload",
      },
      {
        status: 500,
      },
    );
  }
}