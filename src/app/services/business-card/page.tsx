'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  CheckCircle2, 
  QrCode, 
  Layers, 
  Printer, 
  Truck, 
  PenTool, 
  Landmark,
  Image as ImageIcon 
} from 'lucide-react';
import styles from './business-card.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function BusinessCardService() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Estimator States
  const [designStyle, setDesignStyle] = useState<string>('standard');
  const [material, setMaterial] = useState<string>('laminate');
  const [quantity, setQuantity] = useState<number>(1000);
  const [addQr, setAddQr] = useState<boolean>(false);
  const [addUrgent, setAddUrgent] = useState<boolean>(false);

  // Form States
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  useEffect(() => {
    document.title = 'طراحی اختصاصی کارت ویزیت پرمیوم | سیدی آی‌تی';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'طراحی حرفه‌ای و خلاقانه کارت ویزیت شرکتی و دفاتر اسناد رسمی همراه با چاپ باکیفیت لمینت، برجسته، طلاکوب و پی‌وی‌سی شیک در سیدی آی‌تی.');
    }
  }, []);

  // Calculate pricing based on choices
  useEffect(() => {
    let designCost = designStyle === 'standard' ? 650000 : 1200000;
    let printCostPerThousand = 0;

    if (material === 'none') {
      printCostPerThousand = 0;
    } else if (material === 'laminate') {
      printCostPerThousand = 850000;
    } else if (material === 'velvet-gold') {
      printCostPerThousand = 2200000; // Spot gold foil velvet
    } else if (material === 'pvc') {
      printCostPerThousand = 3200000; // Thick PVC card
    } else if (material === 'pvc-trans') {
      printCostPerThousand = 3800000; // Translucent PVC
    }

    let multiplier = quantity === 1000 ? 1 : 1.7; // discount for 2000 print quantity
    let totalPrintCost = printCostPerThousand * multiplier;

    let total = designCost + totalPrintCost;

    if (addQr) total += 300000; // smart QR integration
    if (addUrgent) total += 500000; // rushed print delivery

    setEstimatedPrice(total);
  }, [designStyle, material, quantity, addQr, addUrgent]);

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const handleApplyEstimate = () => {
    const styleLabel = designStyle === 'standard' ? 'طراحی استاندارد دورو' : 'طراحی لوکس و اختصاصی با هویت برند';
    const materialLabel = 
      material === 'none' ? 'فقط فایل طراحی (بدون چاپ)' :
      material === 'laminate' ? 'لمینت مات دورگرد' :
      material === 'velvet-gold' ? 'لمینت برجسته طلاکوب مخملی' :
      material === 'pvc' ? 'کارت پی‌وی‌سی ضخیم (شبیه کارت بانکی)' : 'پی‌وی‌سی شیشه‌ای نیمه‌شفاف';

    const formattedEstimateText = `سبک طراحی: ${styleLabel}، نوع جنس چاپ: ${materialLabel}، تیراژ: ${
      material === 'none' ? 'ندارد' : `${quantity} عدد`
    }، امکانات اضافی: ${[
      addQr ? 'کیوآرکد هوشمند' : '',
      addUrgent ? 'چاپ فوری' : ''
    ].filter(Boolean).join(' - ') || 'ندارد'}. هزینه برآورد شده طراحی و چاپ: ${estimatedPrice.toLocaleString('fa-IR')} تومان.`;

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
      question: 'آیا امکان سفارش طراحی بدون چاپ هم وجود دارد؟',
      answer: 'بله کاملاً. شما می‌توانید در محاسبه‌گر قیمت، گزینه جنس چاپ را روی «فقط فایل طراحی (بدون چاپ)» قرار دهید. در این صورت پس از تایید طرح، فایل لایه‌باز لیتوگرافی (PSD یا AI) به همراه خروجی‌های استاندارد چاپخانه به شما تحویل داده می‌شود.'
    },
    {
      question: 'فرآیند طراحی کارت ویزیت به چه صورت انجام می‌شود؟',
      answer: 'پس از ثبت درخواست، اطلاعات اولیه شامل لوگو، متون و رنگ سازمانی را دریافت می‌کنیم. کارشناس گرافیک ما ۲ اتود متمایز طراحی و ارسال می‌کند. اتود انتخابی شما تا زمان رسیدن به رضایت کامل دستخوش ویرایش‌های نامحدود قرار می‌گیرد.'
    },
    {
      question: 'کارت ویزیت هوشمند با کد QR چیست و چه مزیتی دارد؟',
      answer: 'در این خدمات ما یک کیوآرکد اختصاصی روی کارت ویزیت شما قرار می‌دهیم. هنگامی که مخاطب آن را با دوربین موبایل اسکن کند، یک صفحه پروفایل وب زیبا باز می‌شود که مخاطب می‌تواند با فشردن یک دکمه، اطلاعات تماس شما (نام، تلفن، ایمیل) را مستقیماً در مخاطبین گوشی خود ذخیره کند و همچنین پیوندهای شبکه‌های اجتماعی و آدرس شرکت شما را ببیند.'
    },
    {
      question: 'زمان طراحی و چاپ سفارش چقدر طول می‌کشد؟',
      answer: 'فاز طراحی اتودها بین ۲ تا ۳ روز کاری زمان می‌برد. پس از تایید نهایی فایل، فاز چاپ در حالت عادی بین ۷ تا ۱۰ روز کاری و در حالت سفارش چاپ فوری بین ۳ تا ۴ روز کاری زمان خواهد برد.'
    }
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.tag}>خدمات گرافیک و چاپ</div>
            <h1 className={styles.heroTitle}>طراحی اختصاصی کارت ویزیت پرمیوم</h1>
            <p className={styles.heroSubtitle}>
              کارت ویزیت شما، سفیر برند شما در دستان مشتری است. ما در سیدی آی‌تی با ترکیب خلاقیت هنری، اصول بازاریابی بصری و استانداردهای روز لیتوگرافی، کارت ویزیتی طراحی می‌کنیم که اعتبار کسب‌وکار شما یا دفترخانه شما را در اولین نگاه اثبات کند.
            </p>

            <div className={styles.heroBadges}>
              <div className={styles.badgeItem}>
                <Layers className={styles.badgeIcon} />
                <span>۲ اتود متمایز و ویرایش نامحدود</span>
              </div>
              <div className={styles.badgeItem}>
                <QrCode className={styles.badgeIcon} />
                <span>امکان اتصال به کیوآرکد هوشمند</span>
              </div>
            </div>

            <div className={styles.heroActions}>
              <a href="#custom-estimator-section" className={styles.primaryBtn}>محاسبه هزینه طراحی و چاپ</a>
              <a href="#request-form-section" className={styles.secondaryBtn}>سفارش آنلاین سریع</a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            {/* Card Front */}
            <div className={styles.businessCardFront}>
              <div className={styles.cardLogo}>
                <svg viewBox="0 0 100 120" className={styles.cardLogoIcon}>
                  <polygon points="18,28 49,10 49,46" fill="#e2e8f0" />
                  <polygon points="82,28 51,10 51,46" fill="#e2e8f0" />
                  <polygon points="18,30 82,67 82,93 18,56" fill="#c084fc" />
                </svg>
                <span>سیدی آی‌تی</span>
              </div>
              <div className={styles.cardOwner}>
                <h3>علیرضا موحدی</h3>
                <p>مدیر توسعه فناوری اطلاعات</p>
              </div>
            </div>

            {/* Card Back */}
            <div className={styles.businessCardBack}>
              <div className={styles.cardDetails}>
                <div className={styles.detailLine}><span>📞</span> ۰۲۱-۸۸۸۸XXXX</div>
                <div className={styles.detailLine}><span>🌐</span> seyediit.com</div>
                <div className={styles.detailLine}><span>📍</span> تهران، مجتمع کامپیوتر پایتخت</div>
              </div>
              <div className={styles.cardQrBox}>
                <QrCode size={40} className={styles.qrIcon} />
                <span>اسکن کنید</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services styles section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>انواع سبک‌ها و متریال‌های کارت ویزیت</h2>
            <p className={styles.sectionDesc}>کارت ویزیتی بسازید که نشان‌دهنده کلاس کاری شما باشد</p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Layers size={26} />
              </div>
              <h3>طراحی مینیمال و شرکتی مدرن</h3>
              <p>استفاده هوشمندانه از فضاهای خالی، تایپوگرافی‌های چشم‌نواز و ترکیب رنگ متوازن. مناسب برای برنامه‌نویسان، شرکت‌های دانش‌بنیان و طراحان.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Landmark size={26} />
              </div>
              <h3>کارت‌های رسمی و اداری کلاسیک</h3>
              <p>ساختار منظم، فونت‌های خوانا و قالب‌های شیک و موقر. مناسب برای سردفتران اسناد رسمی، وکلا، مشاوران مالی و اصناف حقوقی.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <Sparkles size={26} />
              </div>
              <h3>متریال‌های خاص و طلاکوب</h3>
              <p>چاپ روی کارت‌های لمینت مخملی با برجسته‌سازی موضعی (یووی موضعی) و بخش‌های براق طلاکوب یا نقره‌کوب برای تاثیرگذاری دوچندان.</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.cardIconBox}>
                <QrCode size={26} />
              </div>
              <h3>کارت ویزیت هوشمند دیجیتالی</h3>
              <p>افزودن کیوآرکد اختصاصی روی کارت با لینک اختصاصی. مخاطب با اسکن کارت می‌تواند بلافاصله اطلاعات شما را در گوشی خود ذخیره کند.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estimator Section */}
      <section id="custom-estimator-section" className={styles.estimatorSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>محاسبه‌گر هزینه طراحی و چاپ کارت ویزیت</h2>
            <p className={styles.sectionDesc}>با انتخاب گزینه‌های زیر، برآورد آنلاین و آنی تعرفه را دریافت کنید</p>
          </div>

          <div className={styles.estimatorContainer}>
            <div className={styles.estimatorControls}>
              {/* Design Type */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>انتخاب سطح طراحی گرافیک:</label>
                <div className={styles.radioGrid}>
                  <label className={`${styles.radioLabel} ${designStyle === 'standard' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="designStyle" 
                      value="standard" 
                      checked={designStyle === 'standard'}
                      onChange={() => setDesignStyle('standard')}
                    />
                    <div>
                      <strong>طراحی استاندارد دورو (۶۵۰,۰۰۰ تومان)</strong>
                      <p>طراحی مدرن بر اساس متون و لوگوی ارسال‌شده توسط شما (۲ اتود خلاقانه)</p>
                    </div>
                  </label>

                  <label className={`${styles.radioLabel} ${designStyle === 'luxury' ? styles.radioSelected : ''}`}>
                    <input 
                      type="radio" 
                      name="designStyle" 
                      value="luxury" 
                      checked={designStyle === 'luxury'}
                      onChange={() => setDesignStyle('luxury')}
                    />
                    <div>
                      <strong>طراحی لوکس اختصاصی (۱,۲۰۰,۰۰۰ تومان)</strong>
                      <p>طراحی هویت بصری سفارشی، اتودهای تصویرسازی یا متریال‌های طلاکوب برجسته اختصاصی</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Material Dropdown */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel} htmlFor="material">نوع جنس چاپ و متریال کارت:</label>
                <select 
                  id="material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="none">فقط فایل طراحی (بدون چاپ فیزیکی)</option>
                  <option value="laminate">لمینت مات دورگرد (بسیار محبوب و بادوام) (+۸۵۰,۰۰۰ تومان)</option>
                  <option value="velvet-gold">لمینت برجسته طلاکوب مخملی (بسیار لوکس) (+۲,۲۰۰,۰۰۰ تومان)</option>
                  <option value="pvc">کارت پی‌وی‌سی ۷۶۰ میکرون ضخیم (شبیه کارت بانکی) (+۳,۲۰۰,۰۰۰ تومان)</option>
                  <option value="pvc-trans">پی‌وی‌سی شیشه‌ای / نیمه‌شفاف خاص (+۳,۸۰۰,۰۰۰ تومان)</option>
                </select>
              </div>

              {/* Quantity (if print is selected) */}
              {material !== 'none' && (
                <div className={styles.controlGroup}>
                  <label className={styles.groupLabel}>تیراژ چاپ کارت ویزیت:</label>
                  <div className={styles.quantityGrid}>
                    <button 
                      type="button"
                      className={`${styles.quantityBtn} ${quantity === 1000 ? styles.qtyActive : ''}`}
                      onClick={() => setQuantity(1000)}
                    >
                      ۱۰۰۰ عدد (یک جعبه)
                    </button>
                    <button 
                      type="button"
                      className={`${styles.quantityBtn} ${quantity === 2000 ? styles.qtyActive : ''}`}
                      onClick={() => setQuantity(2000)}
                    >
                      ۲۰۰۰ عدد (دو جعبه - با تخفیف چاپ)
                    </button>
                  </div>
                </div>
              )}

              {/* Extra Addons */}
              <div className={styles.controlGroup}>
                <label className={styles.groupLabel}>گزینه‌های تکمیلی سفارش:</label>
                <div className={styles.checkboxGrid}>
                  <label className={`${styles.checkboxLabel} ${addQr ? styles.checkboxSelected : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addQr} 
                      onChange={(e) => setAddQr(e.target.checked)} 
                    />
                    <span>ایجاد کیوآرکد هوشمند ذخیره مخاطب و لوکیشن (+۳۰۰,۰۰۰ تومان)</span>
                  </label>

                  {material !== 'none' && (
                    <label className={`${styles.checkboxLabel} ${addUrgent ? styles.checkboxSelected : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={addUrgent} 
                        onChange={(e) => setAddUrgent(e.target.checked)} 
                      />
                      <span>چاپ فوری و ارسال ۳ روزه (+۵۰۰,۰۰۰ تومان)</span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Price Output */}
            <div className={styles.estimatorOutput}>
              <div className={styles.outputBox}>
                <h3>هزینه نهایی طراحی و چاپ</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.priceAmount}>{estimatedPrice.toLocaleString('fa-IR')}</span>
                  <span className={styles.priceUnit}>تومان</span>
                </div>
                <div className={styles.priceNote}>
                  <p>
                    {material === 'none' 
                      ? 'هزینه برآوردشده شامل طراحی ۲ اتود، ویرایش‌های درخواستی و تحویل فایل باکیفیت لایه‌باز می‌باشد.' 
                      : 'هزینه برآوردشده شامل طراحی اتودها، زینک و فیلم لیتوگرافی، چاپ افست درجه یک، بسته‌بندی جعبه‌ای و ارسال به محل می‌باشد.'}
                  </p>
                </div>
                <button 
                  onClick={handleApplyEstimate}
                  className={styles.applyBtn}
                >
                  اعمال محاسبات به فرم سفارش
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
            <h2 className={styles.sectionTitle}>مراحل ثبت سفارش و طراحی کارت ویزیت</h2>
            <p className={styles.sectionDesc}>فرآیند ساده و حرفه‌ای ما برای تبدیل ایده به محصول چاپ‌شده</p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}><PenTool size={20} /></div>
              <div className={styles.stepContent}>
                <h3>۱. ثبت اطلاعات و نیازسنجی</h3>
                <p>پس از ارسال فرم سفارش، اطلاعات تماس، لوگو و متون لازم روی کارت ویزیت را از شما دریافت و به طراح اختصاص می‌دهیم.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}><ImageIcon size={20} /></div>
              <div className={styles.stepContent}>
                <h3>۲. طراحی اتودها و بررسی</h3>
                <p>ظرف ۲ روز کاری، ۲ اتود کاملاً متفاوت برای شما ارسال می‌شود. شما می‌توانید طرح دلخواه را انتخاب یا تغییرات را اعلام کنید.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}><Printer size={20} /></div>
              <div className={styles.stepContent}>
                <h3>۳. لیتوگرافی و چاپ</h3>
                <p>طرح نهایی تاییدشده وارد لیتوگرافی و چاپخانه افست می‌شود تا با دستگاه‌های اتوماتیک روی کاغذهای باکیفیت چاپ شود.</p>
              </div>
            </div>

            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}><Truck size={20} /></div>
              <div className={styles.stepContent}>
                <h3>۴. بسته‌بندی و ارسال</h3>
                <p>کارت‌های چاپ‌شده به صورت جعبه‌ای بسته‌بندی شده و با پیک ویژه یا پست پیشتاز به آدرس شما ارسال می‌گردند.</p>
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
              <h2>سفارش سریع طراحی کارت ویزیت</h2>
              <p>
                جهت شروع فرآیند طراحی یا ثبت سفارش چاپ فیزیکی، فرم روبرو را پر نمایید. اطلاعات محاسبه‌گر هزینه را با کلیک روی دکمه فوق می‌توانید به این فرم اضافه کنید تا طراحان ما از متریال مورد علاقه شما آگاه شوند.
              </p>
              
              <div className={styles.formContactItem}>
                <PhoneCall size={20} className={styles.formContactIcon} />
                <div>
                  <h4>تماس مستقیم با دپارتمان طراحی گرافیک</h4>
                  <p>۰۲۱-۸۸۸۸XXXX (داخلی ۱۰۶)</p>
                </div>
              </div>
            </div>

            <div className={styles.formBox}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h3>سفارش شما با موفقیت ثبت شد</h3>
                  <p>طراحان بخش گرافیک سیدی آی‌تی به زودی جهت دریافت فایل لوگو و متون لازم روی کارت ویزیت با شما تماس خواهند گرفت.</p>
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
                      <label htmlFor="company">نام شرکت / شماره دفترخانه</label>
                      <input 
                        type="text" 
                        id="company" 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)} 
                        placeholder="مثال: سردفتر اسناد رسمی شماره ۱۲۳"
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
                    <label htmlFor="message">توضیحات سفارش طراحی و متریال درخواستی</label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="متن‌هایی که می‌خواهید روی کارت ویزیت نوشته شود یا توضیحات چاپ..."
                      rows={5}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'در حال ثبت اطلاعات...' : 'ثبت سفارش و شروع طراحی'}
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
            <h2 className={styles.sectionTitle}>سوالات متداول طراحی و چاپ کارت ویزیت</h2>
            <p className={styles.sectionDesc}>پاسخ به سوالات متداول مشتریان دپارتمان گرافیک</p>
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
