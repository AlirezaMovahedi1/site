'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Code, 
  Layout, 
  ShoppingBag, 
  Landmark, 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  CheckCircle2, 
  Monitor, 
  Star, 
  BarChart 
} from 'lucide-react';
import styles from './web-design.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function WebDesignService() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Estimator States
  const [siteType, setSiteType] = useState<string>('corporate');
  const [pagesCount, setPagesCount] = useState<number>(10);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [addChat, setAddChat] = useState<boolean>(false);
  const [addSeo, setAddSeo] = useState<boolean>(false);
  const [addSms, setAddSms] = useState<boolean>(false);
  const [addMultiLang, setAddMultiLang] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  useEffect(() => {
    document.title = 'خدمات حرفه‌ای طراحی سایت | سیدی آی‌تی';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'طراحی تخصصی وب‌سایت‌های شرکتی، فروشگاهی و پرتال‌های دفاتر اسناد رسمی با کدنویسی استاندارد، سئو قوی و کاملاً واکنش‌گرا در سیدی آی‌تی.');
    }
  }, []);

  // Calculate pricing based on choices
  useEffect(() => {
    let basePrice = 0;
    let pricePerPage = 0;

    if (siteType === 'corporate') {
      basePrice = 8500000;
      pricePerPage = 200000;
    } else if (siteType === 'ecommerce') {
      basePrice = 14000000;
      pricePerPage = 300000;
    } else if (siteType === 'notary') {
      basePrice = 9000000; // Special portal for notary offices with custom tools
      pricePerPage = 150000;
    } else if (siteType === 'personal') {
      basePrice = 5000000;
      pricePerPage = 150000;
    }

    let total = basePrice + (pagesCount * pricePerPage);

    // Add-on options
    if (addPayment) total += 1500000;
    if (addChat) total += 800000;
    if (addSeo) total += 3000000;
    if (addSms) total += 1000000;
    if (addMultiLang) total += 4000000;

    setEstimatedPrice(total);
  }, [siteType, pagesCount, addPayment, addChat, addSeo, addSms, addMultiLang]);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const handleApplyEstimate = () => {
    const typeLabel = 
      siteType === 'corporate' ? 'شرکتی / سازمانی' : 
      siteType === 'ecommerce' ? 'فروشگاه آنلاین' : 
      siteType === 'notary' ? 'دفترخانه اسناد رسمی' : 'شخصی / معرفی رزومه';

    const featuresText = [
      addPayment ? 'درگاه پرداخت' : '',
      addChat ? 'چت آنلاین' : '',
      addSeo ? 'بهینه‌سازی سئو' : '',
      addSms ? 'پنل پیامک' : '',
      addMultiLang ? 'چندزبانه' : ''
    ].filter(Boolean).join(' - ') || 'ندارد';

    const formattedEstimateText = `نوع سایت مورد نظر: ${typeLabel}، تعداد صفحات: ${pagesCount}، امکانات تکمیلی: ${featuresText}. هزینه تخمینی طراحی: ${estimatedPrice.toLocaleString('fa-IR')} تومان.`;

    setMessage(formattedEstimateText + '\n\n' + message);
    
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
      question: 'مدت زمان طراحی و تحویل وب‌سایت چقدر است؟',
      answer: 'زمان تحویل سایت بستگی به امکانات درخواستی و نوع سایت دارد. سایت‌های شخصی و معرفی دفاتر اسناد رسمی معمولاً بین ۲ تا ۳ هفته و سایت‌های شرکتی بزرگ یا فروشگاه‌های اینترنتی پیچیده بین ۴ تا ۶ هفته زمان می‌برند.'
    },
    {
      question: 'آیا امکان مدیریت وب‌سایت توسط خودمان وجود دارد؟',
      answer: 'بله، تمامی وب‌سایت‌های طراحی‌شده دارای پنل مدیریت کاملاً فارسی، آسان و کاربرپسند هستند. پس از تحویل نهایی سایت، یک جلسه آموزشی رایگان برای پرسنل شما برگزار می‌شود تا بتوانید به راحتی مطالب و محصولات خود را مدیریت کنید.'
    },
    {
      question: 'طراحی سایت دفاتر اسناد رسمی چه تفاوت‌هایی با سایت‌های معمولی دارد؟',
      answer: 'سایت‌های دفترخانه‌ها شامل بخش‌های ویژه‌ای نظیر محاسبه‌گر آنلاین هزینه سند (بر اساس بخشنامه‌های جدید)، سامانه نوبت‌دهی آنلاین، بخش استعلام مدارک مورد نیاز برای هر سند، و لینک‌های دسترسی سریع به سامانه‌های ثبت من و ثنا هستند که منطبق با قوانین سازمان ثبت طراحی می‌شوند.'
    },
    {
      question: 'آیا سایت‌ها برای موبایل و تبلت بهینه‌سازی می‌شوند؟',
      answer: 'بله صددرصد. تمامی وب‌سایت‌ها با استفاده از استانداردهای روز به صورت کاملاً ریسپانسیو (واکنش‌گرا) طراحی می‌شوند تا روی هر اندازه صفحه‌نمایش (از گوشی‌های موبایل تا مانیتورهای عریض) به زیباترین شکل ممکن نمایش داده شوند.'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.tag}>خدمات سازمانی</div>
            <h1 className={styles.heroTitle}>طراحی وب‌سایت حرفه‌ای و اختصاصی</h1>
            <p className={styles.heroSubtitle}>
              سیدی آی‌تی ارائه‌دهنده خدمات تخصصی طراحی وب‌سایت با کدنویسی مدرن، سئو قوی و امنیت بالا. ما متناسب با نیازهای شرکت‌ها، استارتاپ‌ها و به خصوص دفاتر اسناد رسمی، هویت دیجیتال شما را خلق می‌کنیم.
            </p>

            {/* Quick Badges */}
            <div className={styles.heroBadges}>
              <div className={styles.badgeItem}>
                <Monitor className={styles.badgeIcon} />
                <span>رابط کاربری اختصاصی (UI/UX)</span>
              </div>
              <div className={styles.badgeItem}>
                <Star className={styles.badgeIcon} />
                <span>پنل مدیریت ساده و فارسی</span>
              </div>
            </div>

            <div className={styles.heroActions}>
              <a href="#custom-estimator-section" className={styles.primaryBtn}>محاسبه هزینه طراحی سایت</a>
              <a href="#request-form-section" className={styles.secondaryBtn}>مشاوره رایگان تلفنی</a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.browserMockup}>
              <div className={styles.browserHeader}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
                <div className={styles.browserAddress}>seyediit.com/web-design</div>
              </div>
              <div className={styles.browserBody}>
                <div className={styles.mockupLayout}>
                  <div className={styles.mockupSidebar}></div>
                  <div className={styles.mockupContent}>
                    <div className={styles.mockupLine}></div>
                    <div className={styles.mockupLine2}></div>
                    <div className={styles.mockupGrid}>
                      <span className={styles.mockupBox}></span>
                      <span className={styles.mockupBox}></span>
                      <span className={styles.mockupBox}></span>
                    </div>
                  </div>
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
            <h2 className={styles.sectionTitle}>خدمات تخصصی طراحی و توسعه وب</h2>
            <p className={styles.sectionDesc}>راه‌حل‌های نرم‌افزاری متناسب با کسب‌وکار و صنف شغلی شما</p>
          </div>

          <div className={styles.servicesGrid}>
            {/* Service 1 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Landmark size={28} />
              </div>
              <h3>سایت‌های دفاتر اسناد رسمی و قضایی</h3>
              <p>طراحی پرتال‌های ویژه برای دفترخانه‌ها همراه با پنل‌های نوبت‌دهی آنلاین، سیستم پیش‌نویس سند، جدول مدارک لازم و محاسبه‌گر اتوماتیک تعرفه قانونی اسناد.</p>
            </div>

            {/* Service 2 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Globe size={28} />
              </div>
              <h3>وب‌سایت‌های شرکتی و سازمانی</h3>
              <p>طراحی وب‌سایت‌های معرفی خدمات شرکت‌ها، کاتالوگ آنلاین محصولات، تاریخچه و ارتباط با سهام‌داران همراه با امنیت فوق‌العاده بالا و سئوی اولیه استاندارد.</p>
            </div>

            {/* Service 3 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <ShoppingBag size={28} />
              </div>
              <h3>فروشگاه‌های آنلاین و تجارت الکترونیک</h3>
              <p>راه‌اندازی فروشگاه‌های آنلاین مجهز به درگاه پرداخت مستقیم، سیستم انبارداری، مدیریت تخفیف‌ها، سبد خرید مدرن، فاکتور هوشمند و اتصال به سامانه پیامک.</p>
            </div>

            {/* Service 4 */}
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <BarChart size={28} />
              </div>
              <h3>سئو و بهینه‌سازی موتورهای جستجو</h3>
              <p>بهبود رتبه وب‌سایت شما در نتایج جستجوی گوگل، بهینه‌سازی سرعت لود صفحات، متاتگ‌های اصولی و استراتژی تولید محتوای هوشمند برای کسب ورودی حداکثری.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Estimator Widget */}
      <section id="custom-estimator-section" className={styles.estimatorSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>محاسبه‌گر هزینه طراحی وب‌سایت</h2>
            <p className={styles.sectionDesc}>ویژگی‌های مد نظر خود را انتخاب کنید تا هزینه تقریبی به صورت آنی محاسبه شود</p>
          </div>

          <div className={styles.estimatorContainer}>
            <div className={styles.estimatorControls}>
              {/* Site Type Radio */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>نوع وب‌سایت درخواستی:</label>
                <div className={styles.radioGrid}>
                  <label className={`${styles.radioLabel} ${siteType === 'corporate' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="siteType" 
                      value="corporate" 
                      checked={siteType === 'corporate'}
                      onChange={() => setSiteType('corporate')}
                    />
                    <div>
                      <strong>وب‌سایت شرکتی / سازمانی</strong>
                      <p>معرفی خدمات شرکت، گالری پروژه‌ها، فرم‌های استخدام و کاتالوگ آنلاین محصولات</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${siteType === 'ecommerce' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="siteType" 
                      value="ecommerce" 
                      checked={siteType === 'ecommerce'}
                      onChange={() => setSiteType('ecommerce')}
                    />
                    <div>
                      <strong>فروشگاه آنلاین (E-Commerce)</strong>
                      <p>سبد خرید تعاملی، درگاه پرداخت، تعریف محصولات نامحدود، مدیریت تخفیفات و فیلترهای محصول</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${siteType === 'notary' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="siteType" 
                      value="notary" 
                      checked={siteType === 'notary'}
                      onChange={() => setSiteType('notary')}
                    />
                    <div>
                      <strong>وب‌سایت دفاتر اسناد رسمی و قضایی</strong>
                      <p>سیستم نوبت‌دهی آنلاین سند، محاسبه‌گر تعرفه اسناد بر اساس قوانین ثبتی و جدول راهنمای مدارک</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${siteType === 'personal' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="siteType" 
                      value="personal" 
                      checked={siteType === 'personal'}
                      onChange={() => setSiteType('personal')}
                    />
                    <div>
                      <strong>سایت شخصی / نمونه‌کار</strong>
                      <p>معرفی بیوگرافی و مهارت‌ها، گالری نمونه‌کارها، راه‌های ارتباطی و وبلاگ شخصی ساده</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Range Slider for Pages */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <label>تعداد صفحات حدودی وب‌سایت: <strong>{pagesCount}</strong> صفحه</label>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="50" 
                  step="1"
                  value={pagesCount} 
                  onChange={(e) => setPagesCount(parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <div className={styles.rangeLabels}>
                  <span>۳ صفحه</span>
                  <span>۱۵</span>
                  <span>۳۰</span>
                  <span>۴۰</span>
                  <span>۵۰+</span>
                </div>
              </div>

              {/* Checkbox Features */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>امکانات و ویژگی‌های تکمیلی وب‌سایت:</label>
                <div className={styles.checkboxGrid}>
                  <label className={`${styles.checkboxLabel} ${addPayment ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addPayment} 
                      onChange={(e) => setAddPayment(e.target.checked)} 
                    />
                    <span>اتصال به درگاه پرداخت آنلاین و سیستم فاکتوردهی</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addChat ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addChat} 
                      onChange={(e) => setAddChat(e.target.checked)} 
                    />
                    <span>نصب و فعال‌سازی ابزار چت آنلاین پشتیبانی</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addSeo ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addSeo} 
                      onChange={(e) => setAddSeo(e.target.checked)} 
                    />
                    <span>سئوی پایه، سرعت بهینه و ثبت در سرچ کنسول گوگل</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addSms ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addSms} 
                      onChange={(e) => setAddSms(e.target.checked)} 
                    />
                    <span>اتصال به پنل ارسال پیامک کد تایید و فاکتور</span>
                  </label>

                  <label className={`${styles.checkboxLabel} ${addMultiLang ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addMultiLang} 
                      onChange={(e) => setAddMultiLang(e.target.checked)} 
                    />
                    <span>قابلیت دو زبانه یا چند زبانه بودن وب‌سایت</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Output */}
            <div className={styles.estimatorOutput}>
              <div className={styles.outputBox}>
                <h3>هزینه تقریبی طراحی و توسعه</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceAmount}>{estimatedPrice.toLocaleString('fa-IR')}</span>
                  <span className={styles.priceUnit}>تومان (برآورد اولیه)</span>
                </div>
                <div className={styles.priceNote}>
                  <p>این مبلغ شامل هزینه هاست، دامنه ملی (.ir)، پنل مدیریتی، واکنش‌گرایی موبایل و ۳ ماه پشتیبانی فنی رایگان اولیه پس از تحویل نهایی می‌باشد.</p>
                </div>
                <button 
                  onClick={handleApplyEstimate}
                  className={styles.applyBtn}
                >
                  اعمال محاسبات به فرم درخواست
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>مراحل طراحی و تحویل وب‌سایت در سیدی آی‌تی</h2>
            <p className={styles.sectionDesc}>چگونه ایده شما را به محصول واقعی تبدیل می‌کنیم؟</p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۱</div>
              <div className={styles.stepContent}>
                <h3>مشاوره و نیازسنجی دقیق</h3>
                <p>در این مرحله ساختار سایت، دسته‌بندی‌ها، اهداف تجاری و سلیقه بصری شما به طور کامل بررسی می‌شود تا بهترین خروجی به دست آید.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۲</div>
              <div className={styles.stepContent}>
                <h3>طراحی قالب اولیه (UI/UX Mockup)</h3>
                <p>پیش‌نمایش گرافیکی صفحات اصلی سایت بر اساس برندینگ شما طراحی و ارسال می‌شود تا پس از تایید شما، وارد فاز توسعه شود.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۳</div>
              <div className={styles.stepContent}>
                <h3>کدنویسی و توسعه فنی</h3>
                <p>پیاده‌سازی قالب به صورت داینامیک، برنامه‌نویسی دیتابیس، پنل مدیریت فارسی و ادغام ابزارهای مانیتورینگ سرعت و بهینه‌سازی کدهای سئو.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>۴</div>
              <div className={styles.stepContent}>
                <h3>تست نهایی، آموزش و تحویل</h3>
                <p>سایت روی هاست اصلی آپلود شده، تمام تست‌های کارایی و ریسپانسیو انجام می‌شود، نحوه کار با پنل به پرسنل آموزش داده شده و اطلاعات تحویل می‌شود.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form-section" className={styles.formSection}>
        <div className="container">
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <h2>درخواست سفارش طراحی سایت</h2>
              <p>
                برای سفارش وب‌سایت سازمان، شرکت یا دفترخانه خود، لطفاً اطلاعات تماس را وارد نمایید. در صورت تمایل می‌توانید پیش از ارسال، محاسبات قیمت را از ابزار محاسبه‌گر بالا به این فرم اعمال کنید تا کارشناسان ما دید کاملی از ساختار مورد نظر شما داشته باشند.
              </p>
              <div className={styles.formContactItem}>
                <PhoneCall size={20} className={styles.formContactIcon} />
                <div>
                  <h4>تلفن تماس بخش طراحی وب</h4>
                  <p>۰۲۱-۸۸۸۸XXXX (داخلی ۱۰۵)</p>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>درخواست سفارش شما ثبت شد</h3>
                  <p>کارشناسان توسعه نرم‌افزار سیدی آی‌تی در اولین ساعت کاری آینده با شما تماس خواهند گرفت تا جلسه مشاوره اولیه را هماهنگ نمایند.</p>
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
                      <label htmlFor="company">نام شرکت یا شماره دفترخانه</label>
                      <input 
                        type="text" 
                        id="company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="مثال: دفتر اسناد رسمی شماره ۱۲۳"
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
                    <label htmlFor="message">جزئیات ایده یا کپی مشخصات وب‌سایت محاسباتی</label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="چه صفحاتی نیاز دارید؟ آیا سیستم خاصی مد نظرتان هست؟ توضیح دهید..."
                      rows={5}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'در حال ثبت اطلاعات...' : 'ثبت سفارش و هماهنگی مشاوره'}
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
            <h2 className={styles.sectionTitle}>سوالات متداول طراحی وب‌سایت</h2>
            <p className={styles.sectionDesc}>پاسخ به سوالات پرتکرار مشتریان طراحی سایت</p>
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
