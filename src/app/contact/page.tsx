'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageSquare, Send, CheckCircle2, ChevronDown, Clock, ShieldCheck, MapPin, Mail, Users } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('technical');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = 'تماس با ما | سیدی آی‌تی';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'راه‌های ارتباطی با سیدی آی‌تی. تماس تلفنی مستقیم با کارشناسان و ثبت تیکت پشتیبانی آنلاین در سریع‌ترین زمان ممکن.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('لطفاً تمامی فیلدهای ستاره‌دار را تکمیل نمایید.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          department,
          message,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'خطایی در ثبت تیکت رخ داد.');
      }

      setSubmitSuccess(true);
      setName('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      alert(err.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className="container">
          <span className={styles.badge}>ارتباط مستقیم</span>
          <h1 className={styles.title}>تماس با ما</h1>
          <p className={styles.subtitle}>
            سریع‌ترین راه‌های ارتباطی و حل مشکلات شما. کارشناسان ما آماده پاسخگویی هستند.
          </p>
        </div>
      </section>

      <section className={styles.mainSection}>
        <div className={`container ${styles.container}`}>
          
          {/* 1. Phone Card (Direct Call) */}
          <div className={styles.phoneHeroCard}>
            <div className={styles.phoneIconRing}>
              <PhoneCall size={32} className={styles.phoneIcon} />
            </div>
            <h2 className={styles.phoneTitle}>مشاوره و پشتیبانی تلفنی مستقیم</h2>
            
            <a href="tel:0218888XXXX" className={styles.phoneNumberDisplay} dir="ltr">
              ۰۲۱-۸۸۸۸XXXX
            </a>

            <a href="tel:0218888XXXX" className={styles.callActionButton}>
              <PhoneCall size={18} />
              <span>برقراری تماس مستقیم</span>
            </a>
          </div>

          {/* 2. Ticket Submission Section */}
          <div className={styles.ticketSection}>
            <div className={styles.ticketHeader}>
              <div className={styles.ticketTitleRow}>
                <MessageSquare size={24} className={styles.ticketTitleIcon} />
                <h2>ارسال تیکت پشتیبانی آنلاین</h2>
              </div>
              <p>در صورتی که در خارج از ساعات اداری قصد برقراری ارتباط دارید، یا نیاز به ارسال مستندات دارید، تیکت خود را ثبت کنید.</p>
            </div>

            <div className={styles.formCard}>
              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIconBox}>
                    <CheckCircle2 size={48} className={styles.successIcon} />
                  </div>
                  <h3>تیکت شما با موفقیت ثبت شد</h3>
                  <p>
                    کارشناسان ما درخواست شما را دریافت کردند. پاسخ تیکت در اسرع وقت از طریق پیامک یا تماس تلفنی به اطلاع شما خواهد رسید.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)} 
                    className={styles.resetBtn}
                  >
                    ثبت تیکت جدید
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
                      <label htmlFor="phone">شماره موبایل یا تماس <span className={styles.required}>*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="مثال: 09123456789"
                        required 
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department">انتخاب واحد مربوطه</label>
                    <div className={styles.selectWrapper}>
                      <select 
                        id="department" 
                        value={department} 
                        onChange={(e) => setDepartment(e.target.value)}
                        className={styles.selectInput}
                      >
                        <option value="technical">پشتیبانی فنی سخت‌افزار و شبکه</option>
                        <option value="sales">واحد فروش و استعلام قیمت</option>
                        <option value="billing">واحد مالی و فاکتورها</option>
                        <option value="management">ارتباط مستقیم با مدیریت</option>
                      </select>
                      <ChevronDown size={18} className={styles.selectChevron} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">متن تیکت / توضیحات درخواست <span className={styles.required}>*</span></label>
                    <textarea 
                      id="message" 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="لطفاً شرح کامل مشکل یا درخواست خود را در این بخش بنویسید..."
                      rows={6}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? 'در حال ثبت تیکت...' : 'ارسال تیکت پشتیبانی'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. Company & Team Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoTitleRow}>
              <Users size={22} className={styles.infoTitleIcon} />
              <h3>درباره تیم و خدمات سیدی آی‌تی</h3>
            </div>
            <p className={styles.teamDescription}>
              تیم سیدی آی‌تی متشکل از مهندسین و کارشناسان باسابقه حوزه فناوری اطلاعات، زیرساخت شبکه و امنیت سایبری است. ما با سال‌ها تجربه عملی در راه‌اندازی اتاق سرور و پشتیبانی شبکه سازمان‌ها، در تلاشیم تا بهترین سخت‌افزارها و مشاوره‌های فنی را به کسب‌وکارها و دفاتر اسناد رسمی در کشور ارائه کنیم.
            </p>
            
            <div className={styles.contactDetailsList}>
              <div className={styles.contactDetailItem}>
                <Mail size={18} className={styles.detailIcon} />
                <div>
                  <strong>پست الکترونیکی (ایمیل)</strong>
                  <a href="mailto:info@seyediit.com" className={styles.emailLink}>info@seyediit.com</a>
                </div>
              </div>
              
              <div className={styles.contactDetailItem}>
                <MapPin size={18} className={styles.detailIcon} />
                <div>
                  <strong>نشانی دفتر مرکزی</strong>
                  <p>تهران، خیابان ولیعصر، تقاطع میرداماد، مجتمع کامپیوتر پایتخت، طبقه سوم</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
