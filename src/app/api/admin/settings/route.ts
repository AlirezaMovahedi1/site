import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'settings.json');

const defaultSettings = {
  showBanners: true,
  showFeatures: true,
  showCategories: true,
  showProducts: true,
  showBlog: true,
  banners: [
    {
      id: 1,
      image: '/images/shop_banner_v3.png',
      link: '/products',
      title: 'فروشگاه آنلاین سیدی آی‌تی'
    },
    {
      id: 2,
      image: '/images/support_banner_v3.png',
      link: '/contact',
      title: 'پشتیبانی آنلاین تیم سیدی آی‌تی'
    }
  ]
};

function getSettings() {
  try {
    if (!fs.existsSync(settingsFilePath)) {
      fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }
    const data = fs.readFileSync(settingsFilePath, 'utf-8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (error) {
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
}

export async function GET() {
  const settings = getSettings();
  return NextResponse.json({ success: true, settings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentSettings = getSettings();
    const newSettings = {
      showBanners: body.showBanners !== undefined ? body.showBanners : currentSettings.showBanners,
      showFeatures: body.showFeatures !== undefined ? body.showFeatures : currentSettings.showFeatures,
      showCategories: body.showCategories !== undefined ? body.showCategories : currentSettings.showCategories,
      showProducts: body.showProducts !== undefined ? body.showProducts : currentSettings.showProducts,
      showBlog: body.showBlog !== undefined ? body.showBlog : currentSettings.showBlog,
      banners: body.banners !== undefined ? body.banners : currentSettings.banners
    };
    fs.writeFileSync(settingsFilePath, JSON.stringify(newSettings, null, 2));
    return NextResponse.json({ success: true, settings: newSettings });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'خطایی در ثبت تنظیمات رخ داد.' }, { status: 500 });
  }
}
