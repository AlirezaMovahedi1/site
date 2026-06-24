import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'فایلی ارسال نشده است' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads folder exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save with unique name
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `banner_${timestamp}_${cleanFileName}`;
    const filePath = path.join(uploadsDir, filename);
    
    await fs.promises.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      imageUrl: `/uploads/${filename}`
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'خطایی در آپلود فایل رخ داد.' }, { status: 500 });
  }
}
