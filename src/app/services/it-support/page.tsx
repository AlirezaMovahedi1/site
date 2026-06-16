'use client';

import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Server, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  Settings,
  ShieldAlert,
  Headphones,
  Users2
} from 'lucide-react';
import styles from './it-support.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function ITSupportService() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Cost Estimator Inputs
  const [computers, setComputers] = useState<number>(15);
  const [serversCount, setServersCount] = useState<number>(1);
  const [supportType, setSupportType] = useState<string>('hybrid');
  const [addVoip, setAddVoip] = useState<boolean>(false);
  const [addSecurity, setAddSecurity] = useState<boolean>(false);
  const [addBackup, setAddBackup] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Calculated Price
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  // Set page meta title
  useEffect(() => {
    document.title = 'پشتیبانی خدمات IT و شبکه | سیدی آی‌تی';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'کاهش هزینه‌ها و افزایش بهره‌وری کسب‌وکار با خدمات پشتیبانی آی‌تی و شبکه سیدی آی‌تی. پشتیبانی حضوری و دورکاری، هلپ‌دسک و مانیتورینگ سیستم‌ها.');
    }
  }, []);

  // Calculate price whenever inputs change
  useEffect(() => {
    let basePrice = 0;
    let pricePerClient = 0;
    let pricePerServer = 0;

    if (supportType === 'remote') {
      pricePerClient = 180000;
      pricePerServer = 1200000;
      basePrice = 1000000; // Base system setup & support fee
    } else if (supportType === 'hybrid') {
      pricePerClient = 350000;
      pricePerServer = 2200000;
      basePrice = 2500000; // Includes periodic onsite visits
    } else if (supportType === 'dedicated') {
      pricePerClient = 120000;
      pricePerServer = 1500000;
      basePrice = 28000000; // Dedicated onsite admin salary base
    }

    let total = basePrice + (computers * pricePerClient) + (serversCount * pricePerServer);

    // Add ons
    if (addVoip) total += 1500000;
    if (addSecurity) total += 2500000;
    if (addBackup) total += 1800000;

    setEstimatedPrice(total);
  }, [computers, serversCount, supportType, addVoip, addSecurity, addBackup]);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const handleApplyEstimate = () => {
    const formattedEstimateText = `تعداد سیستم‌ها: ${computers}، تعداد سرورها: ${serversCount}، نوع پشتیبانی: ${
      supportType === 'remote' ? 'فقط دورکاری' : supportType === 'hybrid' ? 'هیبریدی (حضوری + دورکاری)' : 'ادمین مقیم حضوری'
    }، امکانات اضافی: ${[
      addVoip ? 'تلفن ویپ' : '',
      addSecurity ? 'امنیت پیشرفته' : '',
      addBackup ? 'بکاپ ابری' : ''
    ].filter(Boolean).join(' - ') || 'ندارد'}. هزینه تخمینی: ${estimatedPrice.toLocaleString('fa-IR')} تومان.`;

    setMessage(formattedEstimateText + '\n\n' + message);
    
    // Scroll to form
    const formSection = document.getElementById('request-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setCompany('');
      setPhone('');
      setMessage('');
    }, 1500);
  };

  const faqs: FAQItem[] = [
    {
      question: 'پشتیبانی شبکه شما دارای قرارداد تضمین خدمات (SLA) است؟',
      answer: 'بله، تمامی قراردادهای پشتیبانی سیدی آی‌تی همراه با موافقت‌نامه سطح خدمات (SLA) رسمی منعقد می‌شود که در آن زمان پاسخگویی به مشکلات (معمولاً کمتر از ۲ ساعت برای هلپ‌دسک و ۱ ساعت برای شرایط بحرانی) و کیفیت انجام تعهدات به صورت حقوقی تضمین می‌گردد.'
    },
    {
      question: 'کلاینت‌ها و پرسنل ما چگونه مشکلات خود را ثبت یا اعلام می‌کنند؟',
      answer: 'ما سیستم تیکتینگ اختصاصی را در سازمان شما مستقر می‌کنیم. همچنین کاربران می‌توانند از طریق تماس تلفنی مستقیم با خطوط پشتیبانی هلپ‌دسک سیدی آی‌تی یا پیام‌رسان‌های توافق‌شده، مشکلات روزمره خود را به سرعت مطرح کنند.'
    },
    {
      question: 'آیا امکان اعزام کارشناس به صورت حضوری وجود دارد؟',
      answer: 'بله، در پلن هیبریدی و مقیم، کارشناسان ما به صورت منظم جهت بازدیدهای دوره‌ای سخت‌افزاری و نرم‌افزاری در محل شما حاضر می‌شوند. همچنین در موارد اضطراری که امکان حل مشکل از راه دور نباشد، کارشناس ما در سریع‌ترین زمان اعزام خواهد شد.'
    },
    {
      question: 'خدمات ممیزی و شناسنامه‌دار کردن سیستم‌ها چیست؟',
      answer: 'در بدو شروع قرارداد، کارشناسان ما تمام سخت‌افزارها، مشخصات فنی کامپیوترها، نرم‌افزارهای نصب‌شده و ارتباطات شبکه شما را ممیزی کرده و برای تک‌تک کلاینت‌ها شناسنامه فنی تهیه می‌کنند تا روند عیب‌یابی و پشتیبانی‌های بعدی دقیق‌تر و سریع‌تر انجام شود.'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.tag}>خدمات سازمانی</div>
            <h1 className={styles.heroTitle}>پشتیبانی خدمات IT و شبکه شرکت‌ها</h1>
            <p className={styles.heroSubtitle}>
              مشکلات کامپیوتری، قطعی شبکه و دغدغه‌های امنیتی سازمانتان را به کارشناسان سیدی آی‌تی بسپارید و با خیالی آسوده، تمام تمرکز خود را روی توسعه و رشد کسب‌وکارتان بگذارید.
            </p>
            
            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.statItem}>
                <TrendingUp className={styles.statIcon} />
                <div>
                  <h4>۸۰+ شرکت فعال</h4>
                  <p>پشتیبانی مستمر شبکه</p>
                </div>
              </div>
              <div className={styles.statItem}>
                <Users className={styles.statIcon} />
                <div>
                  <h4>۹۸٪ رضایت</h4>
                  <p>بر اساس نظرسنجی دوره‌ای</p>
                </div>
              </div>
            </div>

            <div className={styles.heroActions}>
              <a href="#estimator-section" className={styles.primaryBtn}>محاسبه هزینه پشتیبانی</a>
              <a href="#request-form-section" className={styles.secondaryBtn}>درخواست بازدید حضوری رایگان</a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.helpdeskCard}>
              <Headphones size={36} className={styles.helpdeskIcon} />
              <div>
                <h4>هلپ‌دسک و پشتیبانی ۲۴ ساعته</h4>
                <p>پاسخگویی سریع به تیکت‌ها و مشکلات پرسنل شما</p>
              </div>
            </div>
            
            <div className={styles.networkShieldCard}>
              <ShieldCheck size={40} className={styles.shieldIcon} />
              <div>
                <h4>امنیت تضمین‌شده</h4>
                <p>پشتیبان‌گیری هوشمند، مانیتورینگ آنتی‌ویروس‌ها و امنیت فایروال</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Portfolio */}
      <section className={styles.portfolioSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>محدوده خدمات پشتیبانی آی‌تی</h2>
            <p className={styles.sectionDesc}>پشتیبانی همه‌جانبه زیرساخت‌های نرم‌افزاری، سخت‌افزاری و شبکه شما</p>
          </div>

          <div className={styles.portfolioGrid}>
            <div className={styles.portfolioCard}>
              <div className={styles.pIconBox}>🖥️</div>
              <h3>پشتیبانی کلاینت‌ها و کاربران</h3>
              <p>رفع مشکلات روزمره سیستم‌عامل، نرم‌افزارهای آفیس، اتصال به پرینترها، رفع کندی سیستم و نصب نرم‌افزارهای کاربردی.</p>
            </div>

            <div className={styles.portfolioCard}>
              <div className={styles.pIconBox}>🔌</div>
              <h3>پسیو و سخت‌افزار شبکه</h3>
              <p>داکت‌کشی، کابل‌کشی مجدد، مرتب‌سازی رک، آرایش کابل‌ها، رفع خرابی پریزهای شبکه (کیستون) و تست صحت کابل‌ها.</p>
            </div>

            <div className={styles.portfolioCard}>
              <div className={styles.pIconBox}>🔒</div>
              <h3>امنیت و لایسنسینگ</h3>
              <p>نصب آنتی‌ویروس تحت شبکه، مدیریت امنیت فایروال‌ها، بستن پورت‌های غیرمجاز و نصب لایسنس‌های قانونی نرم‌افزاری.</p>
            </div>

            <div className={styles.portfolioCard}>
              <div className={styles.pIconBox}>📞</div>
              <h3>راه‌اندازی و نگهداری VOIP</h3>
              <p>پیاده‌سازی تلفن‌های تحت شبکه (ویپ)، برنامه‌ریزی تلفن گویا (IVR)، صف تماس، ضبط مکالمات و پشتیبانی خطوط تلفن SIP.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Estimator Widget */}
      <section id="custom-estimator-section" className={styles.estimatorSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>محاسبه‌گر هوشمند هزینه پشتیبانی شبکه</h2>
            <p className={styles.sectionDesc}>تعداد منابع خود را مشخص کنید تا هزینه تقریبی ماهیانه محاسبه شود</p>
          </div>

          <div className={styles.estimatorContainer}>
            <div className={styles.estimatorControls}>
              {/* Range Slider for Computers */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <label>تعداد کامپیوترها و کلاینت‌ها: <strong>{computers}</strong> دستگاه</label>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={computers} 
                  onChange={(e) => setComputers(parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <div className={styles.rangeLabels}>
                  <span>۵</span>
                  <span>۳۰</span>
                  <span>۶۰</span>
                  <span>۹۰</span>
                  <span>۱۲۰+</span>
                </div>
              </div>

              {/* Range Slider for Servers */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <label>تعداد سرورهای شبکه: <strong>{serversCount}</strong> عدد</label>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  step="1"
                  value={serversCount} 
                  onChange={(e) => setServersCount(parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <div className={styles.rangeLabels}>
                  <span>۰</span>
                  <span>۲</span>
                  <span>۴</span>
                  <span>۶</span>
                  <span>۸+</span>
                </div>
              </div>

              {/* Support Type Radio */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>مدل ارائه خدمات پشتیبانی:</label>
                <div className={styles.radioGrid}>
                  <label className={`${styles.radioLabel} ${supportType === 'remote' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="supportType" 
                      value="remote" 
                      checked={supportType === 'remote'}
                      onChange={() => setSupportType('remote')}
                    />
                    <div>
                      <strong>فقط از راه دور (Remote Helpdesk)</strong>
                      <p>پشتیبانی ۲۴ ساعته آنلاین و تلفنی بدون مراجعه حضوری (مخصوص شرکت‌های کوچک)</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${supportType === 'hybrid' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="supportType" 
                      value="hybrid" 
                      checked={supportType === 'hybrid'}
                      onChange={() => setSupportType('hybrid')}
                    />
                    <div>
                      <strong>مدل هیبریدی (حضوری + دورکاری)</strong>
                      <p>پشتیبانی آنلاین مداوم + بازدیدهای حضوری هفتگی و رفع خرابی فیزیکی (پیشنهاد اکثر شرکت‌ها)</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${supportType === 'dedicated' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="supportType" 
                      value="dedicated" 
                      checked={supportType === 'dedicated'}
                      onChange={() => setSupportType('dedicated')}
                    />
                    <div>
                      <strong>ادمین مقیم (Dedicated Admin)</strong>
                      <p>استقرار کارشناس آی‌تی ثابت به صورت تمام‌وقت در محل شرکت شما در روزهای کاری</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Add-ons Checkboxes */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>خدمات و سرویس‌های پیشرفته (اختیاری):</label>
                <div className={styles.checkboxGrid}>
                  <label className={`${styles.checkboxLabel} ${addVoip ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addVoip} 
                      onChange={(e) => setAddVoip(e.target.checked)} 
                    />
                    <span>راه‌اندازی و پشتیبانی سیستم تلفن ویپ (VOIP)</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addSecurity ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addSecurity} 
                      onChange={(e) => setAddSecurity(e.target.checked)} 
                    />
                    <span>مانیتورینگ پیشرفته امنیت و تست نفوذ دوره‌ای</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addBackup ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addBackup} 
                      onChange={(e) => setAddBackup(e.target.checked)} 
                    />
                    <span>راه‌اندازی سیستم بکاپ ابری (Cloud Backup) خودکار</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Output */}
            <div className={styles.estimatorOutput}>
              <div className={styles.outputBox}>
                <h3>هزینه ماهیانه تخمینی پشتیبانی</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceAmount}>{estimatedPrice.toLocaleString('fa-IR')}</span>
                  <span className={styles.priceUnit}>تومان / ماهانه</span>
                </div>
                <div className={styles.priceNote}>
                  <p>مبلغ محاسبه‌شده بر اساس تعرفه استاندارد سال جاری تخمین زده شده است و در قرارداد نهایی بسته به توافق زمان واکنش و شرایط جغرافیایی شرکت شما نهایی می‌گردد.</p>
                </div>
                <button 
                  onClick={handleApplyEstimate}
                  className={styles.applyBtn}
                >
                  ارسال درخواست پیش‌فاکتور رسمی
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperation Steps Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>مراحل آغاز همکاری با سیدی آی‌تی</h2>
            <p className={styles.sectionDesc}>از اولین تماس تا استقرار کارشناسان و مانیتورینگ شبکه</p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۱</div>
              <div className={styles.stepContent}>
                <h3>مشاوره تلفنی اولیه</h3>
                <p>تماس با کارشناسان ما، تشریح نیازهای اولیه و هماهنگی جهت بازدید حضوری از محل شرکت شما.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۲</div>
              <div className={styles.stepContent}>
                <h3>بازدید حضوری و ممیزی شبکه</h3>
                <p>کارشناس ارشد شبکه ما در محل شما حضور یافته، نقشه فیزیکی و نرم‌افزاری شبکه را بررسی کرده و نواقص موجود را مستند می‌کند.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۳</div>
              <div className={styles.stepContent}>
                <h3>ارائه پروپوزال و توافق SLA</h3>
                <p>ارائه مستندات تحلیل شبکه به همراه پروپوزال فنی حاوی هزینه‌های نهایی و امضای قرارداد رسمی پشتیبانی با بندهای تضمین کیفیت خدمات.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۴</div>
              <div className={styles.stepContent}>
                <h3>استقرار و آغاز پشتیبانی</h3>
                <p>راه‌اندازی سیستم تیکتینگ، نصب آنتی‌ویروس و سیستم مانیتورینگ بر روی سیستم‌ها و شروع رسمی پشتیبانی فعال هلپ‌دسک.</p>
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
              <h2>ثبت درخواست پشتیبانی آی‌تی</h2>
              <p>
                برای شروع فرآیند یا هماهنگی بازدید حضوری رایگان کارشناس ممیزی شبکه، فرم روبرو را پر نمایید. اطلاعات محاسبه‌گر هزینه در صورت کلیک روی دکمه اعمال، به توضیحات فرم اضافه خواهد شد.
              </p>
              
              <div className={styles.formContactItem}>
                <PhoneCall size={20} className={styles.formContactIcon} />
                <div>
                  <h4>شماره تماس مستقیم کارشناسان IT</h4>
                  <p>۰۲۱-۸۸۸۸XXXX (داخلی ۱۰۴)</p>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>درخواست شما با موفقیت دریافت شد</h3>
                  <p>کارشناسان بخش پشتیبانی آی‌تی سیدی آی‌تی در سریع‌ترین زمان ممکن (حداکثر ۱ ساعت آینده) برای هماهنگی نهایی با شما تماس خواهند گرفت.</p>
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
                        placeholder="مثال: آژانس دیجیتال پیشرو"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">شماره تماس مستقیم <span className={styles.required}>*</span></label>
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
                    <label htmlFor="message">جزئیات درخواست یا اطلاعات محاسبه هزینه</label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="لطفاً محدوده آدرس شرکت، نرم‌افزارهای خاص یا مشکلات فعلی شبکه خود را بنویسید..."
                      rows={5}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'در حال ثبت اطلاعات...' : 'ثبت درخواست و تماس کارشناس'}
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
            <h2 className={styles.sectionTitle}>سوالات متداول خدمات پشتیبانی شبکه</h2>
            <p className={styles.sectionDesc}>پاسخ به سوالات متداول سازمان‌ها پیش از بستن قرارداد</p>
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
