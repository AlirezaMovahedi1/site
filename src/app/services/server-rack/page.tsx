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
  const [selectedPlan, setSelectedPlan] = useState<string>('silver');
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

  const handlePlanSelect = (planKey: string) => {
    setSelectedPlan(planKey);
    // Scroll smoothly to form section
    const formSection = document.getElementById('request-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      answer: 'در پلن طلایی پشتیبانی، کارشناسان ما به صورت آنی مانیتورینگ را رصد کرده و رفع مشکل نرم‌افزاری از راه دور در کمتر از ۱۵ دقیقه و اعزام کارشناس حضوری به محل در کمتر از ۱ ساعت انجام خواهد شد.'
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
              <a href="#plans-section" className={styles.primaryBtn}>مشاهده پلن‌های پشتیبانی</a>
              <a href="#request-form-section" className={styles.secondaryBtn}>مشاوره رایگان تلفنی</a>
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

      {/* Plans Section */}
      <section id="plans-section" className={styles.plansSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>پلن‌های پشتیبانی و نگهداری سرور</h2>
            <p className={styles.sectionDesc}>یکی از پلن‌های متناسب با مقیاس کسب‌وکار خود را انتخاب کنید</p>
          </div>

          <div className={styles.plansGrid}>
            {/* Bronze Plan */}
            <div 
              className={`${styles.planCard} ${selectedPlan === 'bronze' ? styles.activePlan : ''}`}
              onClick={() => setSelectedPlan('bronze')}
            >
              <div className={styles.planHeader}>
                <h3>پلن برنزی</h3>
                <p>مناسب شرکت‌های کوچک و سرویس‌های غیربحرانی</p>
              </div>
              <ul className={styles.planFeatures}>
                <li><Check size={16} /> ۱ بازدید حضوری دوره‌ای در ماه</li>
                <li><Check size={16} /> پشتیبانی راه دور نامحدود (AnyDesk)</li>
                <li><Check size={16} /> زمان پاسخگویی تلفنی کمتر از ۱ ساعت</li>
                <li><Check size={16} /> عیب‌یابی و گزارش‌دهی ماهیانه سخت‌افزار</li>
                <li className={styles.disabledFeature}><Check size={16} /> مانیتورینگ لحظه‌ای ۲۴ ساعته</li>
                <li className={styles.disabledFeature}><Check size={16} /> مانیتورینگ اختصاصی بکاپ‌گیری روزانه</li>
              </ul>
              <button 
                type="button" 
                className={styles.planBtn}
                onClick={(e) => { e.stopPropagation(); handlePlanSelect('bronze'); }}
              >
                انتخاب این پلن
              </button>
            </div>

            {/* Silver Plan */}
            <div 
              className={`${styles.planCard} ${styles.popularPlan} ${selectedPlan === 'silver' ? styles.activePlan : ''}`}
              onClick={() => setSelectedPlan('silver')}
            >
              <div className={styles.popularBadge}>پیشنهادی</div>
              <div className={styles.planHeader}>
                <h3>پلن نقره‌ای</h3>
                <p>مناسب شرکت‌های متوسط و کسب‌وکارهای در حال رشد</p>
              </div>
              <ul className={styles.planFeatures}>
                <li><Check size={16} /> ۳ بازدید حضوری دوره‌ای در ماه</li>
                <li><Check size={16} /> پشتیبانی راه دور نامحدود (تلفنی و آنلاین)</li>
                <li><Check size={16} /> زمان پاسخگویی به مشکلات اضطراری زیر ۴ ساعت</li>
                <li><Check size={16} /> مانیتورینگ نیمه‌وقت سرویس‌ها و منابع سرور</li>
                <li><Check size={16} /> راه‌اندازی و مانیتورینگ منظم سیستم بکاپ هفتگی</li>
                <li><Check size={16} /> ممیزی دوره‌ای امنیت شبکه و فایروال</li>
              </ul>
              <button 
                type="button" 
                className={styles.planBtn}
                onClick={(e) => { e.stopPropagation(); handlePlanSelect('silver'); }}
              >
                انتخاب این پلن
              </button>
            </div>

            {/* Gold Plan */}
            <div 
              className={`${styles.planCard} ${selectedPlan === 'gold' ? styles.activePlan : ''}`}
              onClick={() => setSelectedPlan('gold')}
            >
              <div className={styles.planHeader}>
                <h3>پلن طلایی</h3>
                <p>مناسب سازمان‌ها و سرویس‌های با حساسیت بالا</p>
              </div>
              <ul className={styles.planFeatures}>
                <li><Check size={16} /> بازدیدهای حضوری هفتگی منظم (۴+ بار در ماه)</li>
                <li><Check size={16} /> پشتیبانی شبانه‌روزی (۲۴/۷) با خط تلفن مستقیم ادمین</li>
                <li><Check size={16} /> اعزام کارشناس به محل در کمتر از ۱ ساعت (فوری)</li>
                <li><Check size={16} /> مانیتورینگ لحظه‌ای پیشرفته دیتاسنتر</li>
                <li><Check size={16} /> سیستم بکاپ روزانه چندگانه (محلی و ابری)</li>
                <li><Check size={16} /> ارائه ادمین مقیم در سازمان در صورت نیاز</li>
              </ul>
              <button 
                type="button" 
                className={styles.planBtn}
                onClick={(e) => { e.stopPropagation(); handlePlanSelect('gold'); }}
              >
                انتخاب این پلن
              </button>
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
                    <label htmlFor="plan">پلن مورد نظر</label>
                    <select 
                      id="plan" 
                      value={selectedPlan} 
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                      <option value="bronze">پلن برنزی (پشتیبانی پایه)</option>
                      <option value="silver">پلن نقره‌ای (پشتیبانی پیشرفته پیشنهادی)</option>
                      <option value="gold">پلن طلایی (پشتیبانی ویژه ۲۴ ساعته)</option>
                    </select>
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
