import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const settingsFilePath = path.join(process.cwd(), 'settings.json');

const defaultSettings = {
  showBanners: true,
  showFeatures: true,
  showProducts: true,
  showBlog: true,
  aboutTitle: 'درباره سیدی آی‌تی',
  aboutText: 'مجموعه سیدی آی‌تی به عنوان مرجع تخصصی ارائه خدمات فناوری و سخت‌افزاری به دفاتر اسناد رسمی و ازدواج در سراسر کشور فعالیت می‌کند. ما تلاش می‌کنیم تا با تکیه بر دانش فنی و شناخت دقیق نیازهای این حوزه، بستری یکپارچه برای رفع تمام نیازهای رایانه‌ای و اداری شما فراهم سازیم. از مشاوره و تأمین پیشرفته‌ترین تجهیزات سخت‌افزاری بیومتریک تا ارائه لایسنس‌های نرم‌افزاری معتبر و آموزش‌های کاربردی، همگی با ضمانت کیفیت و پشتیبانی دائم در سیدی آی‌تی ارائه شوند. در همین راستا، شما می‌توانید خدماتی همچون تأمین و راه‌اندازی تجهیزات مدرن و سخت‌افزارهای تخصصی اداری، ارائه لایسنس‌های اورجینال و نرم‌افزارهای کاربردی دفاتر، آموزش‌های تخصصی و کاربردی ویژه سردفتران و کارکنان، و همچنین پشتیبانی فنی و شبکه‌ای مستمر و سریع را از ما دریافت کنید.',
  specialOffersAuto: true,
  specialOffersProductIds: [] as string[],
  notaryProductIds: [] as string[],
  blogPostsAuto: true,
  blogPostIds: [] as string[],
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
      showProducts: body.showProducts !== undefined ? body.showProducts : currentSettings.showProducts,
      showBlog: body.showBlog !== undefined ? body.showBlog : currentSettings.showBlog,
      aboutTitle: body.aboutTitle !== undefined ? body.aboutTitle : currentSettings.aboutTitle,
      aboutText: body.aboutText !== undefined ? body.aboutText : currentSettings.aboutText,
      specialOffersAuto: body.specialOffersAuto !== undefined ? body.specialOffersAuto : currentSettings.specialOffersAuto,
      specialOffersProductIds: body.specialOffersProductIds !== undefined ? body.specialOffersProductIds : currentSettings.specialOffersProductIds,
      notaryProductIds: body.notaryProductIds !== undefined ? body.notaryProductIds : currentSettings.notaryProductIds,
      blogPostsAuto: body.blogPostsAuto !== undefined ? body.blogPostsAuto : currentSettings.blogPostsAuto,
      blogPostIds: body.blogPostIds !== undefined ? body.blogPostIds : currentSettings.blogPostIds,
      banners: body.banners !== undefined ? body.banners : currentSettings.banners
    };
    fs.writeFileSync(settingsFilePath, JSON.stringify(newSettings, null, 2));
    return NextResponse.json({ success: true, settings: newSettings });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'خطایی در ثبت تنظیمات رخ داد.' }, { status: 500 });
  }
}
