import type { Metadata } from 'next';
import Script from 'next/script';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import MobileNav from '../components/MobileNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'سیدی آی‌تی | سخت‌افزار صنعتی و لایسنس نرم‌افزار',
  description: 'فروشگاه آنلاین تخصصی ارائه لپ‌تاپ‌های مهندسی ThinkPad، تجهیزات بیومتریک و اسکنر اثر انگشت Suprema، و لایسنس‌های اورجینال نرم‌افزاری با ضمانت اصالت.',
  keywords: ['لپ تاپ صنعتی', 'اسکنر اثر انگشت', 'سوپریما', 'تینک پد', 'لایسنس آنتی ویروس', 'ESET', 'سخت افزار', 'خرید لپ تاپ'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head />
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            `,
          }}
        />
        <CartProvider>
          <PageLoader />
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
          <MobileNav />
        </CartProvider>
      </body>
    </html>
  );
}
