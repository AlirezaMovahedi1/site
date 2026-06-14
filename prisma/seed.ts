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
  const catFingerprint = await prisma.category.create({
    data: { name: 'اسکنر اثر انگشت', slug: 'fingerprint-scanner' },
  });
  const catSignature = await prisma.category.create({
    data: { name: 'پد امضای دیجیتال', slug: 'signature-pad' },
  });
  const catPrinterScanner = await prisma.category.create({
    data: { name: 'پرینتر و اسکنر', slug: 'printer-scanner' },
  });
  const catNotary = await prisma.category.create({
    data: { name: 'تجهیزات دفترخانه', slug: 'notary-office-equipment' },
  });
  const catToken = await prisma.category.create({
    data: { name: 'توکن امنیتی', slug: 'security-token' },
  });
  const catCopier = await prisma.category.create({
    data: { name: 'دستگاه کپی', slug: 'copier-machine' },
  });
  const catDigitalGoods = await prisma.category.create({
    data: { name: 'کالای دیجیتال', slug: 'digital-goods' },
  });
  const catComputer = await prisma.category.create({
    data: { name: 'کامپیوتر', slug: 'computer' },
  });
  const catLaptop = await prisma.category.create({
    data: { name: 'لپ‌تاپ', slug: 'laptop' },
  });
  const catCable = await prisma.category.create({
    data: { name: 'کابل شبکه', slug: 'network-cable' },
  });
  const catHub = await prisma.category.create({
    data: { name: 'هاب و سوئیچ', slug: 'hub' },
  });
  const catModem = await prisma.category.create({
    data: { name: 'مودم و روتر', slug: 'modem' },
  });
  const catKeyboardMouse = await prisma.category.create({
    data: { name: 'کیبورد و ماوس', slug: 'keyboard-mouse' },
  });
  const catExamQuestions = await prisma.category.create({
    data: { name: 'نمونه سوالات', slug: 'exam-samples' },
  });
  const catWebcam = await prisma.category.create({
    data: { name: 'وبکم', slug: 'webcam' },
  });
  const catSoftware = await prisma.category.create({
    data: { name: 'لایسنس نرم‌افزار', slug: 'software-licenses' },
  });

  console.log('16 Categories created.');

  // 3. Create Products

  // --- Category: Fingerprint Scanner ---
  await prisma.product.create({
    data: {
      name: 'اسکنر اثر انگشت بیومتریک Suprema BioMini Plus 2',
      slug: 'suprema-biomini-plus2-fingerprint',
      description: 'اسکنر اثر انگشت حرفه‌ای Suprema با استاندارد FBI PIV و FBI Mobile ID FAP10. دارای فناوری تشخیص بافت زنده (LFD) جهت جلوگیری از تقلب و جعل اثر انگشت.',
      price: 7800000,
      image: '/images/products/fingerprint.jpg',
      type: 'PHYSICAL',
      inventory: 35,
      rating: 4.9,
      specs: JSON.stringify({
        'نوع سنسور': 'نوری (Optical Sensor)',
        'رزولوشن': '500 DPI',
        'ابعاد سنسور': '16.0 x 18.0 میلی‌متر',
        'رابط اتصال': 'USB 2.0 High Speed',
        'تشخیص بافت زنده': 'دارد (LFD)',
        'کشور سازنده': 'کره جنوبی'
      }),
      categoryId: catFingerprint.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'اسکنر اثر انگشت Suprema BioMini Slim 2',
      slug: 'suprema-biomini-slim2-fingerprint',
      description: 'اسکنر فوق باریک و پیشرفته Suprema با طراحی ارگونومیک و سنسور نوری بسیار قوی. دارای استاندارد ضد آب و گرد و غبار IP65.',
      price: 9200000,
      image: '/images/products/fingerprint.jpg',
      type: 'PHYSICAL',
      inventory: 20,
      rating: 4.8,
      specs: JSON.stringify({
        'نوع سنسور': 'نوری باریک (Slim Optical)',
        'رزولوشن': '500 DPI / 256 Gray levels',
        'استاندارد حفاظتی': 'IP65 ضد آب و غبار',
        'تشخیص بافت زنده': 'دارد (LFD)',
        'رابط اتصال': 'USB 2.0'
      }),
      categoryId: catFingerprint.id,
    },
  });

  // --- Category: Signature Pad ---
  await prisma.product.create({
    data: {
      name: 'پد امضای دیجیتال Wacom STU-540',
      slug: 'wacom-stu-540-signature-pad',
      description: 'پد امضای دیجیتال رنگی و فوق‌العاده باکیفیت وکام Wacom با صفحه نمایش ۵ اینچی و قلم بدون باتری حساس به فشار. ایده‌آل برای دفاتر اسناد رسمی و سازمان‌ها.',
      price: 18500000,
      image: '/images/products/signature_pad.png',
      type: 'PHYSICAL',
      inventory: 15,
      rating: 4.9,
      specs: JSON.stringify({
        'صفحه نمایش': '۵ اینچ رنگی TFT LCD',
        'نوع قلم': 'قلم الکترومغناطیسی بدون باتری',
        'حساسیت به فشار': '۱۰۲۴ سطح فشار',
        'رابط اتصال': 'USB 2.0 / رمزگذاری شده امن',
        'ابعاد پد': '163 x 157 x 10 میلی‌متر'
      }),
      categoryId: catSignature.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'پد امضای دیجیتال Signotec Sigma',
      slug: 'signotec-sigma-signature-pad',
      description: 'پد امضای الکترونیک تک‌رنگ آلمانی Signotec با مقاومت بالا و دقت عالی. مجهز به لایه محافظ ضخیم برای استفاده‌های مداوم و پرتردد.',
      price: 14200000,
      image: '/images/products/signature_pad.png',
      type: 'PHYSICAL',
      inventory: 25,
      rating: 4.7,
      specs: JSON.stringify({
        'صفحه نمایش': '۴ اینچ مونوکروم (تک‌رنگ) با نور پس‌زمینه',
        'حساسیت قلم': '۱۰۲۴ سطح فشار دینامیک',
        'نرخ نمونه‌برداری': '۵۰۰ هرتز (دقت فوق‌العاده بالا)',
        'امنیت': 'رمزگذاری پیشرفته AES داخل پد',
        'کشور سازنده': 'آلمان'
      }),
      categoryId: catSignature.id,
    },
  });

  // --- Category: Printer & Scanner ---
  await prisma.product.create({
    data: {
      name: 'پرینتر لیزری تک‌کاره HP LaserJet Pro M404dn',
      slug: 'hp-laserjet-m404dn-printer',
      description: 'پرینتر لیزری تک‌کاره دوروی شبکه HP، با سرعت چاپ فوق‌العاده بالا و بازدهی بی‌نظیر برای حجم کاری متوسط و زیاد در دفاتر اداری.',
      price: 16800000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 10,
      rating: 4.6,
      specs: JSON.stringify({
        'تکنولوژی چاپ': 'لیزری تک‌رنگ',
        'سرفت چاپ': 'تا ۴۰ برگ در دقیقه',
        'چاپ دورو خودکار': 'دارد',
        'اتصالات': 'USB 2.0 / پورت شبکه Ethernet (LAN)',
        'ظرفیت سینی کاغذ': '۲۵۰ برگ + سینی چندمنظوره ۱۰۰ برگی'
      }),
      categoryId: catPrinterScanner.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'اسکنر تخت اسناد Canon CanoScan LiDE 300',
      slug: 'canon-canoscan-lide-300-scanner',
      description: 'اسکنر تخت سبک و کم‌حجم کانن با رزولوشن عالی و تغذیه برق مستقیم از کابل USB. انتخابی عالی برای اسکن سریع مدارک و شناسنامه در دفاتر.',
      price: 5400000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 18,
      rating: 4.5,
      specs: JSON.stringify({
        'نوع اسکنر': 'تخت (Flatbed)',
        'رزولوشن اپتیکال': '2400 x 2400 DPI',
        'سرعت اسکن': 'تقریباً ۱۰ ثانیه برای برگه A4 رنگی',
        'تامین برق': 'از طریق کابل USB (بدون نیاز به آداپتور)',
        'رابط اتصال': 'USB 2.0 Mini-B'
      }),
      categoryId: catPrinterScanner.id,
    },
  });

  // --- Category: Notary Equipment ---
  await prisma.product.create({
    data: {
      name: 'دستگاه لاک و مهر برقی هوشمند دفترخانه',
      slug: 'electric-wax-sealing-machine',
      description: 'دستگاه لاک و مهر حرارتی برقی مخصوص دفاتر اسناد رسمی و ثبت احوال. دارای المنت سرامیکی بادوام و تنظیم درجه حرارت جهت ذوب تمیز و بدون دود لاک.',
      price: 12500000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 8,
      rating: 4.8,
      specs: JSON.stringify({
        'منبع تغذیه': 'برق شهری ۲۲۰ ولت',
        'سیستم حرارتی': 'المنت سرامیکی ایمن با ولوم کنترل دما',
        'زمان آماده‌سازی': 'کمتر از ۳ دقیقه',
        'جنس بدنه': 'فلز مقاوم با رنگ الکترواستاتیک ضدخش',
        'متعلقات': 'قاشقک مخصوص و قالب‌های مهر برنجی استاندارد'
      }),
      categoryId: catNotary.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'پایانه احراز هویت هوشمند دفاتر اسناد رسمی',
      slug: 'smart-notary-authentication-terminal',
      description: 'دستگاه یکپارچه احراز هویت الکترونیکی مجهز به کارت‌خوان هوشمند ملی، اسکنر اثر انگشت و دوربین شناسایی چهره جهت تطبیق هویت در دفاتر اسناد رسمی.',
      price: 8900000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 14,
      rating: 4.7,
      specs: JSON.stringify({
        'کارت‌خوان': 'سازگار با کارت هوشمند ملی (Smart Card Reader)',
        'صفحه نمایش': '۴.۳ اینچ رنگی لمسی',
        'اتصالات': 'Wi-Fi / Ethernet / USB',
        'استاندارد امنیتی': 'پروتکل‌های پیشرفته ضدجعل و رمزنگاری رمز عبور کارت ملی',
        'پشتیبانی نرم‌افزار': 'اتصال مستقیم به سامانه ثبت آنی'
      }),
      categoryId: catNotary.id,
    },
  });

  // --- Category: Security Token ---
  await prisma.product.create({
    data: {
      name: 'توکن امنیتی امضای دیجیتال ePass3003 Auto',
      slug: 'epass3003-security-token',
      description: 'توکن سخت‌افزاری امنیتی ePass3003 مجهز به درایور خودکار (Auto-Run) جهت ذخیره گواهی‌های امضای دیجیتال. مورد تایید سامانه ثبت اسناد و تدارکات الکترونیکی دولت.',
      price: 950000,
      image: '/images/products/security_token.png',
      type: 'PHYSICAL',
      inventory: 150,
      rating: 4.9,
      specs: JSON.stringify({
        'الگوریتم‌های رمزنگاری': 'RSA 1024/2048, AES 128/192/256, SHA-1/SHA-256',
        'استانداردها': 'FIPS 140-2 Level 3, Common Criteria EAL 5+',
        'ظرفیت حافظه': '64KB امن',
        'نوع اتصال': 'USB standard Type-A',
        'سیستم‌عامل‌های تحت پشتیبانی': 'Windows, macOS, Linux'
      }),
      categoryId: catToken.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'توکن امنیتی سخت‌افزاری YubiKey 5 NFC',
      slug: 'yubikey-5-nfc-token',
      description: 'امن‌ترین توکن سخت‌افزاری جهان برند Yubico سوئد با پشتیبانی از NFC و USB. احراز هویت دو مرحله‌ای (2FA) قدرتمند برای اکانت‌های گوگل، مایکروسافت و شبکه‌ها.',
      price: 4200000,
      image: '/images/products/security_token.png',
      type: 'PHYSICAL',
      inventory: 45,
      rating: 4.9,
      specs: JSON.stringify({
        'رابط اتصال': 'USB-A / NFC (بی‌سیم)',
        'پروتکل‌ها': 'FIDO2, U2F, Smart Card (PIV), Yubico OTP, OpenPGP',
        'مقاومت فیزیکی': 'ضد ضربه، ضد آب (IP68) و بدون باتری',
        'تولیدکننده': 'Yubico (ساخت سوئد/آمریکا)',
        'امنیت': 'جلوگیری کامل از حملات فیشینگ و سرقت هویت'
      }),
      categoryId: catToken.id,
    },
  });

  // --- Category: Copier Machine ---
  await prisma.product.create({
    data: {
      name: 'دستگاه کپی ایستاده چندکاره Toshiba e-Studio 2523A',
      slug: 'toshiba-e-studio-2523a-copier',
      description: 'دستگاه کپی، پرینتر و اسکنر سایز A3 توشیبا با کارایی فوق‌العاده بالا و سرعت چاپ مناسب. انتخابی اقتصادی برای دفاتر شلوغ و مراکز کپی.',
      price: 68000000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 3,
      rating: 4.6,
      specs: JSON.stringify({
        'کاربری': '۳ کاره (کپی، پرینت، اسکنر رنگی A3)',
        'سرعت کپی': '۲۵ برگ در دقیقه A4',
        'سایز کاغذ': 'A5 تا A3',
        'دقت کپی': '2400 x 600 DPI (با هماهنگی نرم‌افزاری)',
        'رابط اتصال': 'USB 2.0 High Speed'
      }),
      categoryId: catCopier.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'دستگاه کپی چندکاره رومیزی Sharp AR-6020V',
      slug: 'sharp-ar-6020v-copier',
      description: 'دستگاه کپی لیزری چندکاره شارپ با عملکردی پایدار و کیفیت عالی چاپ. قابلیت ارتقاء ظرفیت کاغذ و اضافه کردن فیدر خودکار اسناد (ADF).',
      price: 74000000,
      image: '/images/products/notary_equipment.png',
      type: 'PHYSICAL',
      inventory: 2,
      rating: 4.7,
      specs: JSON.stringify({
        'عملکرد': 'کپی، پرینتر، اسکنر اسناد',
        'سرعت چاپ': '۲۰ برگ در دقیقه سایز A4',
        'بازه بزرگنمایی کپی': '۲۵٪ تا ۴۰۰٪',
        'حداکثر ظرفیت کاغذ': '۱۸۵۰ برگ (با کاست‌های اختیاری)',
        'حافظه رم دستگاه': '64MB'
      }),
      categoryId: catCopier.id,
    },
  });

  // --- Category: Digital Goods ---
  await prisma.product.create({
    data: {
      name: 'پاوربانک فست شارژ Anker 325 PowerBank 20000mAh',
      slug: 'anker-325-powerbank-20000',
      description: 'پاوربانک پرقدرت انکر Anker مجهز به فناوری شارژ ایمن و هوشمند PowerIQ. ظرفیت عالی برای چندین بار شارژ کامل گوشی و تبلت در سفرهای کاری.',
      price: 2300000,
      image: '/images/products/security_token.png',
      type: 'PHYSICAL',
      inventory: 60,
      rating: 4.8,
      specs: JSON.stringify({
        'ظرفیت اسمی': '۲۰,۰۰۰ میلی‌آمپر ساعت',
        'پورت‌های خروجی': 'دو عدد USB-A فست شارژ',
        'پورت‌های ورودی': 'USB-C / Micro USB',
        'فناوری حفاظتی': 'MultiProtect جهت کنترل دما و جلوگیری از ولتاژ بالا',
        'وزن پاوربانک': '۳۴۰ گرم'
      }),
      categoryId: catDigitalGoods.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'حافظه SSD اکسترنال پرسرعت Samsung T7 1TB',
      slug: 'samsung-t7-1tb-external-ssd',
      description: 'حافظه ذخیره‌سازی اکسترنال بسیار سریع سامسونگ Samsung T7 با بدنه فلزی ضد ضربه و سرعت انتقال خیره‌کننده. ایمن برای بک‌آپ‌گیری داده‌های دفاتر.',
      price: 6900000,
      image: '/images/products/security_token.png',
      type: 'PHYSICAL',
      inventory: 30,
      rating: 4.9,
      specs: JSON.stringify({
        'ظرفیت': '۱ ترابایت (1000GB)',
        'سرعت خواندن متوالی': 'تا ۱۰۵۰ مگابایت بر ثانیه',
        'سرعت نوشتن متوالی': 'تا ۱۰۰۰ مگابایت بر ثانیه',
        'رابط اتصال': 'USB 3.2 Gen2 (سازگار با تایپ سی و USB-A)',
        'امنیت': 'رمزگذاری سخت‌افزاری ۲۵۶ بیتی AES انتخابی'
      }),
      categoryId: catDigitalGoods.id,
    },
  });

  // --- Category: Computer ---
  await prisma.product.create({
    data: {
      name: 'کامپیوتر همه‌کاره اداری All-in-One HP ProOne 440 G9',
      slug: 'hp-proone-440-g9-aio',
      description: 'آل‌این‌وان قدرتمند و شیک اچ‌پی با صفحه نمایش بدون حاشیه و سخت‌افزار مدرن نسل ۱۲ اینتل. گزینه‌ای فوق‌العاده برای میزهای اداری و پیشخوان‌ها.',
      price: 45000000,
      image: '/images/products/thinkpad.jpg',
      type: 'PHYSICAL',
      inventory: 6,
      rating: 4.7,
      specs: JSON.stringify({
        'پردازنده (CPU)': 'Intel Core i5-12500T (Up to 4.4 GHz)',
        'حافظه رم (RAM)': '8GB DDR4 3200MHz',
        'حافظه داخلی': '256GB NVMe SSD + 1TB HDD',
        'صفحه نمایش': '23.8" Full HD (1920x1080) IPS, Matte',
        'لوازم همراه': 'کیبورد و ماوس سیم‌دار اصلی HP'
      }),
      categoryId: catComputer.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'مینی کامپیوتر پرقدرت Asus Mini PC PN51',
      slug: 'asus-mini-pc-pn51',
      description: 'کامپیوتر بسیار کوچک و کم‌جای ایسوس با پردازنده قدرتمند Ryzen 5 و خروجی تصویر ۴K همزمان. عالی برای فضای محدود پیشخوان دفاتر اسناد رسمی.',
      price: 28500000,
      image: '/images/products/thinkpad.jpg',
      type: 'PHYSICAL',
      inventory: 9,
      rating: 4.6,
      specs: JSON.stringify({
        'پردازنده (CPU)': 'AMD Ryzen 5 5500U (6 Cores / 12 Threads)',
        'حافظه رم': '16GB DDR4 (Dual Channel)',
        'حافظه داخلی': '512GB M.2 PCIe NVMe SSD',
        'کارت گرافیک': 'AMD Radeon Graphics',
        'ابعاد فیزیکی': '115 x 115 x 49 میلی‌متر (بسیار کوچک)'
      }),
      categoryId: catComputer.id,
    },
  });

  // --- Category: Laptop ---
  await prisma.product.create({
    data: {
      name: 'لپ‌تاپ صنعتی لنوو ThinkPad T14 Gen 4',
      slug: 'lenovo-thinkpad-t14-gen4',
      description: 'لپ‌تاپ مهندسی و صنعتی مقاوم لنوو سری ThinkPad، گزینه‌ای بی‌نظیر برای برنامه‌نویسان، مهندسان و کارهای اداری سنگین. دارای کیبورد ارگونومیک افسانه‌ای.',
      price: 49500000,
      image: '/images/products/thinkpad.jpg',
      type: 'PHYSICAL',
      inventory: 12,
      rating: 4.8,
      specs: JSON.stringify({
        'پردازنده (CPU)': 'Intel Core i7-1365U vPro (Up to 5.2 GHz)',
        'حافظه رم (RAM)': '16GB DDR5 5600MHz',
        'حافظه داخلی (SSD)': '512GB PCIe Gen4 NVMe M.2',
        'صفحه نمایش': '14" WUXGA (1920x1200) IPS, Anti-glare',
        'وزن لپ‌تاپ': '1.37 کیلوگرم'
      }),
      categoryId: catLaptop.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'لپ‌تاپ مهندسی Apple MacBook Pro 14 M3',
      slug: 'apple-macbook-pro-14-m3',
      description: 'لپ‌تاپ پریمیوم و بسیار قدرتمند مک‌بوک پرو اپل با تراشه انقلابی M3 و صفحه نمایش خیره‌کننده Liquid Retina XDR. عمر باتری شگفت‌انگیز ۲۲ ساعته.',
      price: 98000000,
      image: '/images/products/thinkpad.jpg',
      type: 'PHYSICAL',
      inventory: 5,
      rating: 4.9,
      specs: JSON.stringify({
        'پردازنده': 'Apple M3 chip (8-core CPU / 10-core GPU)',
        'حافظه یکپارچه (Unified RAM)': '8GB',
        'حافظه داخلی (SSD)': '512GB Superfast SSD',
        'صفحه نمایش': '14.2" Liquid Retina XDR (3024x1964), 120Hz',
        'عمر باتری': 'تا ۲۲ ساعت وب‌گردی و پخش فیلم'
      }),
      categoryId: catLaptop.id,
    },
  });

  // --- Category: Network Cable ---
  await prisma.product.create({
    data: {
      name: 'کابل شبکه لگراند Legrand Cat6 SFTP (۳۰۵ متری)',
      slug: 'legrand-cat6-sftp-305m-cable',
      description: 'کابل شبکه تمام مس قرقره‌ای لگراند فرانسه با شیلد و فویل آلومینیومی (SFTP) جهت حذف کامل نویزهای مغناطیسی در شبکه‌های حساس دفتری.',
      price: 14500000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 15,
      rating: 4.8,
      specs: JSON.stringify({
        'دسته‌بندی کابل': 'Cat6 SFTP (دارای شیلد و فویل)',
        'جنس مغزی کابل': '۱۰۰٪ مس خالص (CCC)',
        'طول بسته': 'قرقره ۳۰۵ متری استاندارد',
        'روکش کابل': 'LSZH (بدون هالوژن و دود سمی در آتش‌سوزی)',
        'سرعت انتقال داده': 'تا 10Gbps / فرکانس 250MHz'
      }),
      categoryId: catCable.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'کابل پچ‌کورد نگزنس Nexans Cat6 UTP (۳ متری)',
      slug: 'nexans-cat6-utp-patch-3m',
      description: 'کابل رابط شبکه (پچ‌کورد) نگزنس نویزگیر استاندارد با سوکت‌های پرسی کارخانه‌ای. اتصال مطمئن سیستم‌ها به سوئیچ شبکه.',
      price: 220000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 120,
      rating: 4.6,
      specs: JSON.stringify({
        'نوع کابل': 'پچ‌کورد Cat6 UTP (بدون شیلد)',
        'طول کابل': '۳ متر',
        'نوع سوکت': 'RJ45 تمام مس فشرده',
        'جنس روکش': 'PVC بادوام و انعطاف‌پذیر',
        'کاربرد': 'اتصال مینی‌کامپیوتر یا اسکنر به پریز شبکه'
      }),
      categoryId: catCable.id,
    },
  });

  // --- Category: Hub ---
  await prisma.product.create({
    data: {
      name: 'سوئیچ شبکه ۵ پورت گیگابیت TP-Link LS1005G',
      slug: 'tp-link-5port-gigabit-switch',
      description: 'سوئیچ شبکه رومیزی ۵ پورت تی‌پی‌لینک با سرعت گیگابیت. دارای بدنه فلزی محکم و بدون فن جهت عملکرد کاملاً بی‌صدا در محیط کار.',
      price: 1200000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 40,
      rating: 4.7,
      specs: JSON.stringify({
        'تعداد پورت': '۵ پورت RJ45',
        'سرعت پورت‌ها': '10/100/1000 Mbps (Gigabit Speed)',
        'فناوری هوشمند': 'Green Technology جهت بهینه‌سازی مصرف برق',
        'نوع بدنه': 'پلاستیک باکیفیت و مستحکم رومیزی',
        'پشتیبانی Auto-MDI/MDIX': 'دارد (تشخیص خودکار کابل راست یا کراس)'
      }),
      categoryId: catHub.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'هاب مولتی‌پورت ۹ کاره USB-C برند Ugreen',
      slug: 'ugreen-9in1-usb-c-hub',
      description: 'هاب آلومینیومی باکیفیت یوگرین جهت اتصال تمام تجهیزات جانبی مانند پد امضا، توکن و اسکنر به لپ‌تاپ‌های جدید که فقط پورت تایپ سی دارند.',
      price: 3400000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 22,
      rating: 4.8,
      specs: JSON.stringify({
        'اتصال ورودی': 'USB Type-C',
        'پورت‌های خروجی': '3x USB 3.0, 1x HDMI 4K, 1x VGA, 1x RJ45 Lan, SD/TF Card Reader, 1x Type-C PD 100W',
        'جنس بدنه': 'آلومینیوم ضدحرارت آنودایز شده',
        'سازگاری سیستم‌عامل': 'Windows, macOS, iPadOS, Android',
        'قابلیت انتقال برق (PD)': 'تا ۱۰۰ وات پشتیبانی شارژ ایمن'
      }),
      categoryId: catHub.id,
    },
  });

  // --- Category: Modem ---
  await prisma.product.create({
    data: {
      name: 'مودم روتر بی‌سیم VDSL/ADSL ایسوس DSL-AC51',
      slug: 'asus-dsl-ac51-modem-router',
      description: 'مودم روتر دوبانده و پرسرعت ایسوس با پشتیبانی از اینترنت پرسرعت VDSL و ADSL2. آنتن‌دهی عالی و پایدار برای تمام دستگاه‌های دفتری شما.',
      price: 4100000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 15,
      rating: 4.7,
      specs: JSON.stringify({
        'تکنولوژی مودم': 'ADSL, ADSL2+, VDSL2',
        'فرکانس بی‌سیم': 'دوبانده (2.4GHz / 5GHz)',
        'تعداد آنتن': '۳ عدد آنتن خارجی قدرتمند',
        'سرعت بی‌سیم': 'تا ۷۳۳ مگابیت بر ثانیه مجموع باندها',
        'پورت‌های شبکه': '۲ پورت LAN گیگابیت + ۱ پورت WAN'
      }),
      categoryId: catModem.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'مودم ۴G جیبی همراه دی‌لینک D-Link DWR-932C',
      slug: 'dlink-dwr-932c-4g-modem',
      description: 'مودم جیبی شارژی همراه دی‌لینک با باتری داخلی بادوام. بهترین گزینه برای دسترسی دائمی به سامانه ثبت و اینترنت در صورت قطع شدن خط تلفن دفترخانه.',
      price: 2900000,
      image: '/images/products/router_modem.png',
      type: 'PHYSICAL',
      inventory: 25,
      rating: 4.5,
      specs: JSON.stringify({
        'پشتیبانی شبکه': '4G LTE / 3G HSPA+',
        'ظرفیت باتری': '۲۰۰۰ میلی‌آمپر ساعت (تا ۵ ساعت کار مداوم)',
        'حداکثر سرعت دانلود': 'تا ۱۵۰ مگابیت بر ثانیه',
        'تعداد کاربر متصل': 'تا ۱۰ دستگاه همزمان به شبکه وای‌فای',
        'درگاه سیم‌کارت': 'سازگار با تمام اپراتورها (سیم‌کارت معمولی)'
      }),
      categoryId: catModem.id,
    },
  });

  // --- Category: Keyboard & Mouse ---
  await prisma.product.create({
    data: {
      name: 'ست کیبورد و ماوس بی‌سیم لاجیتک Logitech MK295',
      slug: 'logitech-mk295-keyboard-mouse',
      description: 'ست کیبورد و ماوس بی‌سیم بسیار آرام و سایلنت لاجیتک مجهز به فناوری SilentTouch. گزینه‌ای بی‌نظیر برای دفاتر اسناد رسمی جهت حذف صدای تق‌تق کلیدها.',
      price: 2450000,
      image: '/images/products/keyboard_mouse.png',
      type: 'PHYSICAL',
      inventory: 50,
      rating: 4.8,
      specs: JSON.stringify({
        'نوع اتصال': 'بی‌سیم با دانگل USB نانو (برد ۱۰ متر)',
        'فناوری کلیدها': 'SilentTouch (حذف ۹۰ درصد صدای تایپ)',
        'طراحی بدنه': 'مقاوم در برابر پاشش تصادفی مایعات',
        'عمر باتری کیبورد': '۳۶ ماه با باتری‌های اصلی آلکالاین',
        'عمر باتری ماوس': '۱۸ ماه کارکرد مداوم'
      }),
      categoryId: catKeyboardMouse.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'ماوس ارگونومیک ریزر Razer DeathAdder Essential',
      slug: 'razer-deathadder-essential-mouse',
      description: 'ماوس سیم‌دار ارگونومیک ریزر با سنسور نوری فوق‌العاده دقیق ۶۴۰۰ DPI. طراحی مهندسی شده برای استفاده طولانی‌مدت پرسنل اداری بدون ایجاد درد مچ دست.',
      price: 1750000,
      image: '/images/products/keyboard_mouse.png',
      type: 'PHYSICAL',
      inventory: 35,
      rating: 4.6,
      specs: JSON.stringify({
        'نوع حسگر': 'نوری دقیق (Optical Sensor)',
        'دقت حسگر': '6400 DPI',
        'نوع سوئیچ کلیدها': 'سوئیچ‌های مکانیکی ریزر با طول عمر ۱۰ میلیون کلیک',
        'تعداد کلیدها': '۵ کلید قابل برنامه‌ریزی مستقل',
        'نوع اتصال': 'کابل USB محافظت‌شده کنفی'
      }),
      categoryId: catKeyboardMouse.id,
    },
  });

  // --- Category: Exam Questions ---
  await prisma.product.create({
    data: {
      name: 'نمونه سوالات جامع آزمون سردفتری اسناد رسمی (با پاسخ تشریحی)',
      slug: 'notary-exam-questions-package',
      description: 'پکیج PDF دانلودی شامل بانک سوالات شبیه‌سازی شده آزمون سردفتری سال‌های گذشته همراه با کلید و پاسخ‌های کاملاً تشریحی و نکات مهم حقوق ثبت و ادبیات عرب.',
      price: 150000,
      image: '/images/products/eset.jpg',
      type: 'DIGITAL',
      downloadUrl: '/downloads/notary_exam_questions.pdf',
      rating: 4.7,
      specs: JSON.stringify({
        'فرمت فایل': 'PDF دانلودی (کیفیت بسیار بالا و قابل پرینت)',
        'تعداد صفحات': '۲۵۰ صفحه نمونه سوال تالیفی و کنکوری',
        'پاسخ تشریحی': 'دارد (تحلیل کامل ماده به ماده حقوق ثبت و تجارت)',
        'حجم فایل': '12MB',
        'نحوه تحویل': 'لینک دانلود آنی پس از پرداخت موفق در فاکتور خرید'
      }),
      categoryId: catExamQuestions.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'پکیج سوالات تخصصی آزمون کارشناس رسمی دادگستری رشته فناوری اطلاعات',
      slug: 'judicial-it-expert-exam-questions',
      description: 'مجموعه ارزشمند نمونه سوالات ادوار گذشته آزمون کارشناسان رسمی دادگستری در حوزه کامپیوتر، فناوری اطلاعات و امنیت شبکه به همراه پاسخ تشریحی.',
      price: 250000,
      image: '/images/products/eset.jpg',
      type: 'DIGITAL',
      downloadUrl: '/downloads/expert_it_exam.pdf',
      rating: 4.8,
      specs: JSON.stringify({
        'فرمت فایل': 'PDF فشرده زیپ شده',
        'بخش‌های پوشش داده شده': 'سخت‌افزار، شبکه، امنیت اطلاعات، مبانی جرایم رایانه‌ای و قوانین کارشناسی',
        'تعداد تست‌ها': 'بیش از ۶۰۰ تست واقعی ادوار گذشته',
        'نوع تحویل': 'ارسال به پنل کاربری و ایمیل بلافاصله بعد از خرید'
      }),
      categoryId: catExamQuestions.id,
    },
  });

  // --- Category: Webcam ---
  await prisma.product.create({
    data: {
      name: 'وب‌کم حرفه‌ای لاجیتک Logitech C922 Pro Stream',
      slug: 'logitech-c922-pro-webcam',
      description: 'وب‌کم فوق‌العاده باکیفیت ۱۰۸۰p لاجیتک مخصوص ویدئوکنفرانس‌های اداری و استریم زنده. دارای دو میکروفون استریو جهت ضبط صدای بدون نویز.',
      price: 7300000,
      image: '/images/products/webcam.png',
      type: 'PHYSICAL',
      inventory: 16,
      rating: 4.8,
      specs: JSON.stringify({
        'رزولوشن فیلم‌برداری': '1080p Full HD at 30fps / 720p at 60fps',
        'سیستم فوکوس': 'فوکوس خودکار هوشمند (Autofocus)',
        'زاویه دید': '۷۸ درجه میدان دید مورب',
        'میکروفون': 'دو عدد میکروفون استریو داخلی نویزگیر',
        'لوازم همراه': 'پایه سه‌پایه رومیزی تلسکوپی لاجیتک'
      }),
      categoryId: catWebcam.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'وب‌کم اچ‌دی ردراگون Redragon Fobos GW600',
      slug: 'redragon-fobos-gw600-webcam',
      description: 'وب‌کم خوش‌قیمت و باکیفیت ردراگون مناسب برای احراز هویت تصویری آنلاین در دفاتر ثبت اسناد و برگزاری کلاس‌های درسی آنلاین.',
      price: 2800000,
      image: '/images/products/webcam.png',
      type: 'PHYSICAL',
      inventory: 30,
      rating: 4.4,
      specs: JSON.stringify({
        'کیفیت تصویر': '720p HD Video resolution',
        'کنترل نور': 'تنظیم خودکار نوردهی و تراز سفیدی در محیط تاریک',
        'میکروفون داخلی': 'دارد (میکروفون دیجیتال تک‌کاناله)',
        'نحوه نصب': 'گیره کلیپسی چندمنظوره برای مانیتور و لپ‌تاپ',
        'اتصال': 'کارت بدون درایور Plug & Play با رابط USB'
      }),
      categoryId: catWebcam.id,
    },
  });

  // --- Category: Software License ---
  await prisma.product.create({
    data: {
      name: 'لایسنس یکساله آنتی‌ویروس ESET Internet Security',
      slug: 'eset-internet-security-1year',
      description: 'لایسنس ۱۰۰٪ اورجینال و قانونی ESET Internet Security برای یک کاربر به مدت یک سال. محافظت کامل در برابر ویروس‌ها، باج‌افزارها و امنیت درگاه پرداخت.',
      price: 580000,
      image: '/images/products/eset.jpg',
      type: 'DIGITAL',
      downloadUrl: '/downloads/eset_installer.zip',
      rating: 4.7,
      specs: JSON.stringify({
        'مدت اعتبار': '۳۶۵ روز (یک سال)',
        'تعداد کاربر': '۱ کاربر (PC/Android)',
        'نوع تحویل': 'ارسال آنی کد لایسنس به ایمیل و پنل کاربری',
        'پشتیبانی': 'دریافت مستقیم آپدیت‌ها از سرور اصلی ESET'
      }),
      categoryId: catSoftware.id,
    },
  });

  console.log('33 Products successfully seeded.');

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
یکی از چالش‌های قدیمی اسکنرهای اثر انگشت، امکان جعل با استفاده از اثر انگشت‌های ساخته شده از ژلاتین یا سیلیکون بود. اسکنرها مانند Suprema BioMini Plus 2 با استفاده از تکنولوژی LFD (Live Finger Detection) می‌توانند بافت زنده پوست را از مواد مصنوعی تشخیص داده و امنیت سیستم را به سطح بالایی برسانند.

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
