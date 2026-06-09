import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.post.deleteMany({});

  console.log('Cleared existing data.');

  // 2. Create Categories
  const hardwares = await prisma.category.create({
    data: {
      name: 'سخت‌افزار و تجهیزات',
      slug: 'hardware-equipment',
    },
  });

  const softwares = await prisma.category.create({
    data: {
      name: 'نرم‌افزار و لایسنس',
      slug: 'software-licenses',
    },
  });

  console.log('Categories created.');

  // 3. Create Products
  await prisma.product.create({
    data: {
      name: 'لپ‌تاپ صنعتی لنوو ThinkPad T14 Gen 4',
      slug: 'lenovo-thinkpad-t14-gen4',
      description: 'لپ‌تاپ مهندسی و صنعتی مقاوم لنوو سری ThinkPad، گزینه‌ای بی‌نظیر برای برنامه‌نویسان، مهندسان و کارهای اداری سنگین. دارای بدنه مقاوم در برابر ضربه و کیبورد ارگونومیک فوق‌العاده.',
      price: 49500000,
      image: '/images/products/thinkpad.jpg',
      type: 'PHYSICAL',
      inventory: 12,
      rating: 4.8,
      specs: JSON.stringify({
        'پردازنده (CPU)': 'Intel Core i7-1365U vPro (Up to 5.2 GHz)',
        'حافظه رم (RAM)': '16GB DDR5 5600MHz (قابل ارتقا)',
        'حافظه داخلی (SSD)': '512GB PCIe Gen4 NVMe M.2',
        'پردازنده گرافیکی': 'Intel Iris Xe Graphics',
        'صفحه نمایش': '14" WUXGA (1920x1200) IPS, Anti-glare',
        'وزن': '1.37 کیلوگرم',
        'سیستم عامل': 'Windows 11 Pro Genuine'
      }),
      categoryId: hardwares.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'اسکنر اثر انگشت بیومتریک Suprema BioMini Plus 2',
      slug: 'suprema-biomini-plus2-fingerprint',
      description: 'اسکنر اثر انگشت حرفه‌ای Suprema با استاندارد FBI PIV و FBI Mobile ID FAP10. دارای سنسور نوری پیشرفته و فناوری تشخیص بافت زنده (LFD) جهت جلوگیری از تقلب و جعل اثر انگشت.',
      price: 7800000,
      image: '/images/products/fingerprint.jpg',
      type: 'PHYSICAL',
      inventory: 35,
      rating: 4.9,
      specs: JSON.stringify({
        'نوع سنسور': 'نوری (Optical Sensor)',
        'رزولوشن': '500 DPI',
        'ابعاد سنسور': '16.0 x 18.0 میلی‌متر',
        'استانداردها': 'FBI PIV / FAP10, KC, CE, FCC, RoHS',
        'رابط اتصال': 'USB 2.0 High Speed',
        'تشخیص بافت زنده': 'دارد (LFD)',
        'سازگاری سیستم‌عامل': 'Windows, Android, Linux'
      }),
      categoryId: hardwares.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'لایسنس یکساله آنتی‌ویروس ESET Internet Security',
      slug: 'eset-internet-security-1year',
      description: 'لایسنس ۱۰۰٪ اورجینال و قانونی ESET Internet Security برای یک کاربر به مدت یک سال. محافظت کامل در برابر ویروس‌ها، بدافزارها، باج‌افزارها و امنیت پرداخت‌های بانکی آنلاین شما.',
      price: 580000,
      image: '/images/products/eset.jpg',
      type: 'DIGITAL',
      downloadUrl: '/downloads/eset_installer.zip',
      rating: 4.7,
      specs: JSON.stringify({
        'مدت اعتبار': '۳۶۵ روز (یک سال)',
        'تعداد کاربر': '۱ کاربر (PC/Android)',
        'نوع تحویل': 'ارسال آنی کد لایسنس به ایمیل و پنل کاربری',
        'قابلیت آپدیت': 'دریافت مستقیم آپدیت‌ها از سرور اصلی ESET',
        'پشتیبانی فنی': 'پشتیبانی ۲۴ ساعته در طول دوره اعتبار'
      }),
      categoryId: softwares.id,
    },
  });

  console.log('Products seeded.');

  // 4. Create Blog Posts
  await prisma.post.create({
    data: {
      title: 'راهنمای جامع خرید لپ‌تاپ‌های مهندسی و برنامه‌نویسی در سال ۲۰۲۶',
      slug: 'engineering-laptop-buying-guide-2026',
      summary: 'انتخاب لپ‌تاپ مناسب برای برنامه‌نویسی و کارهای فنی به دلیل تنوع سخت‌افزارها پیچیده است. در این مقاله ویژگی‌های کلیدی مانند پردازنده، رم و حافظه مناسب مهندسی را بررسی می‌کنیم.',
      content: `### مقدمه
در دنیای امروز فناوری، داشتن یک سیستم پردازشی سریع و مطمئن برای هر برنامه‌نویس یا مهندس، از ابزارهای اصلی موفقیت است. لپ‌تاپ‌های مهندسی نه تنها باید پردازنده قدرتمندی داشته باشند، بلکه طول عمر باتری، کیفیت کیبورد و قابلیت حمل آسان نیز در آن‌ها اهمیت حیاتی دارد.

### پردازنده (CPU): قلب تپنده سیستم
برای برنامه‌نویسی و کارهای مهندسی، پردازنده مهم‌ترین بخش سیستم است.
* **حداقل نیاز:** پردازنده‌های Intel Core i5 یا AMD Ryzen 5 نسل‌های اخیر.
* **پیشنهاد ما:** پردازنده‌های Intel Core i7/i9 (نسل ۱۳ و ۱۴) یا سری‌های Apple M2/M3 Pro. این پردازنده‌ها در کامپایل کردن پروژه‌های بزرگ یا اجرای کانتینرها (مثل Docker) سرعت فوق‌العاده‌ای دارند.

### حافظه رم (RAM): کلید چندوظیفگی روان
رم کافی به شما اجازه می‌دهد چندین ابزار توسعه، مرورگر با تب‌های زیاد و ماشین‌های مجازی را همزمان و بدون افت سرعت اجرا کنید.
* **۸ گیگابایت:** برای شروع برنامه‌نویسی وب سبک مناسب است، اما خیلی زود با محدودیت مواجه می‌شوید.
* **۱۶ گیگابایت:** استاندارد طلایی برنامه‌نویسی و مهندسی در حال حاضر.
* **۳۲ گیگابایت به بالا:** برای برنامه‌نویسان موبایل (Android Studio/Xcode)، توسعه‌دهندگان بازی و متخصصان هوش مصنوعی ضروری است.

### حافظه ذخیره‌سازی: حتماً SSD انتخاب کنید
دوران هارد دیسک‌های مکانیکی (HDD) به پایان رسیده است. لپ‌تاپ شما حتماً باید مجهز به SSD پرسرعت NVMe PCIe Gen4 باشد. سرعت بالا آمدن سیستم‌عامل و اجرای برنامه‌ها در SSD چندین برابر هاردهای معمولی است.

### کیبورد و صفحه نمایش
از آنجا که ساعت‌های طولانی به صفحه نمایش خیره می‌شوید و در حال تایپ هستید:
1. **صفحه نمایش:** صفحه نمایشی با پنل IPS و رزولوشن حداقل Full HD انتخاب کنید که پوشش مات (Anti-glare) داشته باشد تا چشم شما خسته نشود.
2. **کیبورد:** لپ‌تاپ‌های سری ThinkPad لنوو به داشتن بهترین و ارگونومیک‌ترین کیبوردهای دنیا معروف هستند.`,
      image: '/images/blog/laptop-guide.jpg',
      readTime: '۵ دقیقه مطالعه',
      createdAt: new Date('2026-05-15T10:00:00Z'),
    },
  });

  await prisma.post.create({
    data: {
      title: 'نقش فناوری بیومتریک و اسکنرهای اثر انگشت در امنیت سازمان‌ها',
      slug: 'biometrics-fingerprint-scanners-enterprise-security',
      summary: 'فناوری‌های احراز هویت بیومتریک مانند اثر انگشت، امنیت فیزیکی و سایبری سازمان‌ها را به شدت افزایش می‌دهند. در این مقاله به بررسی دلایل ضرورت استفاده از این ابزارها می‌پردازیم.',
      content: `### مقدمه
با افزایش تهدیدات سایبری و امکان سرقت کلمه‌های عبور یا کارت‌های پرسنلی، روش‌های سنتی احراز هویت دیگر پاسخگوی نیازهای امنیتی سازمان‌های مدرن نیستند. در این میان، احراز هویت بیومتریک و به خصوص استفاده از اسکنرهای اثر انگشت به عنوان یکی از امن‌ترین و راحت‌ترین راه‌حل‌ها مطرح شده است.

### چرا اثر انگشت منحصربه‌فرد و ایمن است؟
برخلاف رمزهای عبور که قابل حدس زدن یا سرقت هستند و کارت‌های مغناطیسی که ممکن است مفقود یا کپی شوند، الگوهای اثر انگشت هر فرد کاملاً منحصربه‌فرد بوده و در طول زندگی تغییر نمی‌کنند. حتی دوقلوهای همسان نیز اثر انگشت متفاوتی دارند.

### جلوگیری از تقلب با فناوری تشخیص بافت زنده (LFD)
یکی از چالش‌های قدیمی اسکنرهای اثر انگشت، امکان جعل با استفاده از اثر انگشت‌های ساخته شده از ژلاتین یا سیلیکون بود. اسکنرهای نسل جدید مانند Suprema BioMini Plus 2 با استفاده از تکنولوژی LFD (Live Finger Detection) می‌توانند بافت زنده پوست را از مواد مصنوعی تشخیص داده و امنیت سیستم را به سطح بالایی برسانند.

### کاربردهای اسکنر اثر انگشت در سازمان‌ها
1. **کنترل تردد فیزیکی:** مدیریت ورود و خروج کارکنان به اتاق‌های سرور یا بخش‌های حساس سازمان.
2. **احراز هویت سیستم‌عامل و نرم‌افزارها:** ورود به سیستم بدون نیاز به تایپ پسورد که مانع از لو رفتن رمزهای عبور می‌شود.
3. **حضور و غیاب پرسنل:** جلوگیری از ثبت ساعت ورود و خروج به جای همکاران دیگر.

### نتیجه‌گیری
سرمایه‌گذاری روی تجهیزات بیومتریک نه تنها امنیت اطلاعات و فیزیک سازمان شما را تضمین می‌کند، بلکه با حذف هزینه‌های صدور مجدد کارت‌های پرسنلی و پسوردهای فراموش‌شده، در بلندمدت بسیار مقرون‌به‌صرفه خواهد بود.`,
      image: '/images/blog/biometrics.jpg',
      readTime: '۴ دقیقه مطالعه',
      createdAt: new Date('2026-06-02T14:30:00Z'),
    },
  });

  console.log('Blog posts seeded.');
  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
