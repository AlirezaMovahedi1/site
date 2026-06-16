'use client';

import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cpu, 
  ShieldCheck, 
  Clock, 
  Activity, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  HardDrive,
  Settings,
  Flame,
  CheckCircle2
} from 'lucide-react';
import styles from './server-rack.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function ServerRackService() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Form States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = 'خدمات پشتیبانی سرور و اتاق سرور | سیدی آی‌تی';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'شرکت سیدی آی‌تی ارائه دهنده تمامی خدمات نگهداری، پشتیبانی تخصصی، عیب یابی، به روزرسانی و مانیتورینگ اتاق سرور و تجهیزات رک سازمان‌ها.');
    }
  }, []);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form fields
      setName('');
      setCompany('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  const faqs: FAQItem[] = [
    {
      question: 'آیا خدمات پشتیبانی شما شامل تأمین قطعات سرور هم می‌شود؟',
      answer: 'بله، سیدی آی‌تی به دلیل دسترسی مستقیم به بازار سخت‌افزار، تمامی قطعات اصلی و اورجینال سرورهای HP و Dell (شامل هارد، رم، پاور و پردازنده) را با گارانتی معتبر تأمین و تعویض می‌کند.'
    },
    {
      question: 'در صورت بروز خرابی اضطراری سرور، زمان واکنش شما چقدر است؟',
      answer: 'در خدمات پشتیبانی ویژه ما، کارشناسان به صورت آنی مانیتورینگ را رصد کرده و رفع مشکل نرم‌افزاری از راه دور در کمتر از ۱۵ دقیقه و اعزام کارشناس حضوری به محل در کمتر از ۱ ساعت انجام خواهد شد.'
    },
    {
      question: 'چگونه امنیت و محرمانگی اطلاعات سرورهای ما تضمین می‌شود؟',
      answer: 'پیش از شروع همکاری، قرارداد عدم افشای اطلاعات (NDA) بین طرفین امضا می‌شود. همچنین تمامی دسترسی‌ها محدود و نظارت‌شده بوده و سیستم‌های بکاپ به صورت رمزنگاری‌شده ذخیره می‌شوند.'
    },
    {
      question: 'مجازی‌سازی سرور چه مزیتی برای سازمان ما دارد؟',
      answer: 'مجازی‌سازی با ابزارهایی نظیر VMware ESXi اجازه می‌دهد چندین سیستم‌عامل و سرویس مجزا را روی یک سخت‌افزار فیزیکی قوی اجرا کنید که این امر هزینه‌های سخت‌افزاری، برق و نگهداری را تا ۷۰٪ کاهش می‌دهد.'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.tag}>خدمات سازمانی</div>
            <h1 className={styles.heroTitle}>خدمات پشتیبانی سرور و اتاق سرور</h1>
            <p className={styles.heroSubtitle}>
              سرورها قلب تپنده بخش فناوری اطلاعات هر سازمان هستند. تیم متخصص سیدی آی‌تی با ارائه خدمات ۲۴ ساعته مانیتورینگ، نگهداری، عیب‌یابی و تأمین قطعات سخت‌افزاری، پایداری ۱۰۰ درصدی دیتاسنتر شما را تضمین می‌کند.
            </p>
            <div className={styles.heroActions}>
              <a href="#request-form-section" className={styles.primaryBtn}>درخواست مشاوره تلفنی</a>
              <a href="#why-server-section" className={styles.secondaryBtn}>چرا خدمات سرور؟</a>
            </div>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.serverVisualCard}>
              <Server size={48} className={styles.serverIcon} />
              <div className={styles.serverLeds}>
                <span className={styles.ledGreen}></span>
                <span className={styles.ledGreen}></span>
                <span className={styles.ledGreen}></span>
                <span className={styles.ledPulse}></span>
              </div>
              <div className={styles.serverDetails}>
                <div className={styles.bar}></div>
                <div className={styles.bar2}></div>
              </div>
            </div>
            <div className={styles.serverStatusCard}>
              <div className={styles.statusHeader}>
                <Activity size={18} className={styles.pulseIcon} />
                <span>وضعیت شبکه دیتاسنتر</span>
              </div>
              <div className={styles.statusMetrics}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>پایداری (Uptime)</span>
                  <span className={styles.metricValue}>۹۹.۹۹٪</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>دمای اتاق سرور</span>
                  <span className={styles.metricValue}>۱۹°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>خدمات تخصصی ما در بخش سرور و اتاق رک</h2>
            <p className={styles.sectionDesc}>پوشش کامل نیازهای پسیو، اکتیو، سخت‌افزاری و نرم‌افزاری دیتاسنترها</p>
          </div>

          <div className={styles.servicesGrid}>
            {/* Service Item 1 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Cpu size={28} />
              </div>
              <h3>پشتیبانی و ارتقای سخت‌افزار</h3>
              <p>عیب‌یابی تخصصی مادربرد، پردازنده‌ها، ریدکنترلر و تعویض قطعات معیوب سرور با قطعات اورجینال دارای گارانتی تعویض.</p>
            </div>

            {/* Service Item 2 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Settings size={28} />
              </div>
              <h3>نصب و پیکربندی سیستم‌عامل</h3>
              <p>راه‌اندازی تخصصی ویندوز سرور و لینوکس، اکتیو دایرکتوری، اکستنشن‌های امنیتی، سرویس‌های فایل‌شرینگ و سطوح دسترسی کاربران.</p>
            </div>

            {/* Service Item 3 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <HardDrive size={28} />
              </div>
              <h3>مجازی‌سازی سرورها</h3>
              <p>راه‌اندازی و کانفیگ زیرساخت‌های مجازی با استفاده از VMware vSphere / ESXi و Hyper-V جهت استفاده حداکثری از پتانسیل سخت‌افزار.</p>
            </div>

            {/* Service Item 4 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <ShieldCheck size={28} />
              </div>
              <h3>پشتیبان‌گیری هوشمند (Backup)</h3>
              <p>پیاده‌سازی سناریوهای بکاپ‌گیری اتوماتیک با Veeam Backup به صورت دوره‌ای، بر روی فضاهای ذخیره‌سازی ابری و هارد دیسک‌های محلی.</p>
            </div>

            {/* Service Item 5 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Activity size={28} />
              </div>
              <h3>مانیتورینگ ۲۴/۷ اتاق سرور</h3>
              <p>نظارت مداوم بر کارکرد سخت‌افزارها، رم، پهنای باند شبکه و ارسال آلارم‌های هوشمند در صورت بروز اختلال یا بالارفتن بار کاری سرور.</p>
            </div>

            {/* Service Item 6 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Flame size={28} />
              </div>
              <h3>سیستم‌های ایمنی و محیطی</h3>
              <p>نظارت بر سیستم‌های خنک‌کننده اتاق سرور، سنسورهای اعلام و اطفای حریق، اتصال یوپی‌اس (UPS) و بهینه‌سازی توزیع برق مصرفی.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Server Section */}
      <section id="why-server-section" className={styles.whyServerSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>چرا مدیریت و نگهداری اتاق سرور حیاتی است؟</h2>
            <p className={styles.sectionDesc}>بررسی چالش‌ها، مخاطرات و لزوم رسیدگی مستمر به دیتاسنترها</p>
          </div>

          <div className={styles.whyServerGrid}>
            <div className={styles.whyServerArticle}>
              <h3>سرور، مغز متفکر و محل تمرکز داده‌های سازمان شماست</h3>
              <p>
                در دنیای مدرن کسب‌وکار، تمامی دارایی‌های دیجیتال سازمان شامل اطلاعات مالی، فایل‌های مشتریان، ایمیل‌های اداری و پایگاه داده سیستم‌های یکپارچه (مانند ERP یا CRM) روی سرورها میزبانی و پردازش می‌شوند. هرگونه نقص در عملکرد سرور می‌تواند کل چرخه تجاری را متوقف کرده و ضررهای جبران‌ناپذیری به بار آورد.
              </p>
              <p>
                بسیاری از مدیران تصور می‌کنند تا زمانی که سیستم‌ها بدون مشکل کار می‌کنند، نیازی به رسیدگی وجود ندارد؛ اما واقعیت این است که مشکلات اتاق سرور معمولاً به صورت پنهان انباشته می‌شوند تا اینکه ناگهان به یک فاجعه (DOWN شدن سرتاسری شبکه یا از دست رفتن داده‌ها) ختم شوند.
              </p>
              
              <div className={styles.bulletList}>
                <div className={styles.bulletItem}>
                  <span className={styles.bulletNumber}>۱</span>
                  <div>
                    <h4>پیشگیری از توقف کارکرد کارکنان (Zero Downtime)</h4>
                    <p>وقتی سرور قطع شود، دسترسی پرسنل به فایل‌ها، نرم‌افزارهای داخلی و اینترنت قطع خواهد شد. نگهداری مستمر کمک می‌کند علائم خرابی (مانند پر شدن دیسک‌ها یا نشت حافظه) پیش از قطع کامل شناسایی و رفع شوند.</p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <span className={styles.bulletNumber}>۲</span>
                  <div>
                    <h4>امنیت اطلاعات و حفاظت در برابر باج‌افزارها</h4>
                    <p>سرورهایی که به‌روزرسانی‌های امنیتی را دریافت نکنند یا فایروال آن‌ها به درستی پیکربندی نشده باشد، اولین هدف باج‌افزارها هستند. پشتیبانی فنی شامل آپدیت منظم و مانیتورینگ امنیتی است.</p>
                  </div>
                </div>

                <div className={styles.bulletItem}>
                  <span className={styles.bulletNumber}>۳</span>
                  <div>
                    <h4>تضمین بازگردانی اطلاعات در صورت بروز بحران (Disaster Recovery)</h4>
                    <p>خرابی سخت‌افزاری، آتش‌سوزی یا اشتباهات انسانی همیشه ممکن است رخ دهد. داشتن یک سناریوی بکاپ‌گیری دوره‌ای و تست مداوم بازیابی اطلاعات، تنها راه بیمه کردن کسب‌وکار شما در برابر فاجعه است.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.whyServerSidebar}>
              <div className={styles.sidebarCard}>
                <h4>آمار و فکت‌های کلیدی</h4>
                <ul className={styles.statList}>
                  <li>
                    <strong>۹۵٪</strong>
                    <span>کسب‌وکارهای کوچک و متوسط در صورت از دست رفتن داده‌های کلیدی برای بیش از یک هفته، تا یک سال بعد ورشکست می‌شوند.</span>
                  </li>
                  <li>
                    <strong>۷۰٪</strong>
                    <span>از خرابی‌های سخت‌افزاری سرورها به دلیل نوسانات دما، رطوبت یا تجمع گرد و غبار رخ می‌دهد که با نگهداری فیزیکی قابل پیشگیری است.</span>
                  </li>
                  <li>
                    <strong>۸۵٪</strong>
                    <span>حملات باج‌افزاری از طریق آسیب‌پذیری‌های وصله‌نشده سیستم‌عامل سرورها نفوذ می‌کنند.</span>
                  </li>
                </ul>
              </div>
              
              <div className={styles.sidebarActionBox}>
                <h4>آیا سرورهای شما ایمن هستند؟</h4>
                <p>همین امروز می‌توانید درخواست ممیزی و تست سلامت فیزیکی و نرم‌افزاری اتاق سرور خود را به صورت رایگان ثبت کنید.</p>
                <a href="#request-form-section" className={styles.sidebarLinkBtn}>درخواست ممیزی رایگان</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="request-form-section" className={styles.formSection}>
        <div className="container">
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <h2>درخواست مشاوره تخصصی و پیش‌فاکتور</h2>
              <p>
                برای بررسی وضعیت سرورها و اتاق سرور سازمان خود و دریافت پلن پیشنهادی شخصی‌سازی شده، اطلاعات تماس خود را در فرم روبرو وارد نمایید. کارشناسان آی‌تی ما در کمتر از ۱ ساعت با شما تماس خواهند گرفت.
              </p>
              <div className={styles.formContactInfo}>
                <div className={styles.contactItem}>
                  <PhoneCall size={20} className={styles.contactIcon} />
                  <div>
                    <h4>تماس مستقیم با بخش سرور</h4>
                    <p>۰۲۱-۸۸۸۸XXXX (داخلی ۱۰۳)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>درخواست شما با موفقیت ثبت شد</h3>
                  <p>کارشناسان بخش سرور سیدی آی‌تی به زودی با شما تماس خواهند گرفت. از حسن اعتماد شما سپاسگزاریم.</p>
                  <button 
                    onClick={() => setSubmitSuccess(false)} 
                    className={styles.resetFormBtn}
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">نام و نام خانوادگی <span className={styles.required}>*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="مثال: علیرضا موحدی"
                        required 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="company">نام شرکت / سازمان</label>
                      <input 
                        type="text" 
                        id="company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="مثال: شرکت توسعه فناوری"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">شماره تماس (همراه یا ثابت) <span className={styles.required}>*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="مثال: 09123456789"
                        required 
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">آدرس ایمیل</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>



                  <div className={styles.formGroup}>
                    <label htmlFor="message">توضیحات بیشتر یا نیازهای خاص دیتاسنتر</label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="لطفاً تعداد سرورها، سیستم‌عامل‌ها یا هر توضیحی که به ما در ارائه پیشنهاد بهتر کمک می‌کند را بنویسید..."
                      rows={4}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'در حال ارسال درخواست...' : 'ارسال درخواست مشاوره'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>سوالات متداول پشتیبانی اتاق سرور</h2>
            <p className={styles.sectionDesc}>پاسخ به برخی از رایج‌ترین سوالات شما</p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${activeFaq === index ? styles.faqActive : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className={styles.faqQuestion}>
                  <span>{faq.question}</span>
                  {activeFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
