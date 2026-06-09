import type { Metadata } from 'next';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'سیدآی‌تی مارکت | سخت‌افزار صنعتی و لایسنس نرم‌افزار',
  description: 'فروشگاه آنلاین تخصصی ارائه لپ‌تاپ‌های مهندسی ThinkPad، تجهیزات بیومتریک و اسکنر اثر انگشت Suprema، و لایسنس‌های اورجینال نرم‌افزاری با ضمانت اصالت.',
  keywords: ['لپ تاپ صنعتی', 'اسکنر اثر انگشت', 'سوپریما', 'تینک پد', 'لایسنس آنتی ویروس', 'ESET', 'سخت افزار', 'خرید لپ تاپ'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
