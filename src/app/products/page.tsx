import React from 'react';
import prisma from '../../lib/prisma';
import ProductCard from '../../components/ProductCard';
import styles from './products.module.css';

export const metadata = {
  title: 'کاتالوگ محصولات | سیدآی‌تی مارکت',
  description: 'لیست کامل محصولات سخت‌افزاری و نرم‌افزاری سیدآی‌تی مارکت شامل لپ‌تاپ‌های صنعتی لنوو ThinkPad، اسکنرهای اثر انگشت Suprema و لایسنس‌های آنتی‌ویروس.',
};

interface SearchParams {
  search?: string;
  category?: string;
  type?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || '';
  const categorySlug = params.category || '';
  const productType = params.type || '';

  // Get categories for filter list
  const categories = await prisma.category.findMany();

  // Build prisma query filters
  const whereClause: any = {};

  if (searchQuery) {
    whereClause.OR = [
      { name: { contains: searchQuery } },
      { description: { contains: searchQuery } },
    ];
  }

  if (categorySlug) {
    whereClause.category = { slug: categorySlug };
  }

  if (productType) {
    whereClause.type = productType;
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true,
    },
  });

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h2 className={styles.pageTitle}>کاتالوگ محصولات سیدآی‌تی</h2>
        <p className={styles.pageSubtitle}>ارائه سخت‌افزار صنعتی باکیفیت و لایسنس‌های نرم‌افزاری معتبر</p>
      </header>

      <div className={styles.contentLayout}>
        {/* Sidebar filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>جستجوی متنی</h4>
            <form method="GET" action="/products" className={styles.searchForm}>
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="نام کالا یا مشخصات..."
                className={styles.searchInput}
              />
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              {productType && <input type="hidden" name="type" value={productType} />}
              <button type="submit" className={styles.searchBtn}>اعمال</button>
            </form>
          </div>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>دسته‌بندی‌ها</h4>
            <div className={styles.filterLinks}>
              <a href="/products" className={!categorySlug ? styles.activeLink : ''}>
                همه دسته‌ها
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/products?category=${cat.slug}${productType ? `&type=${productType}` : ''}${
                    searchQuery ? `&search=${searchQuery}` : ''
                  }`}
                  className={categorySlug === cat.slug ? styles.activeLink : ''}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>نوع محصول</h4>
            <div className={styles.filterLinks}>
              <a
                href={`/products${categorySlug ? `?category=${categorySlug}` : ''}${
                  searchQuery ? `${categorySlug ? '&' : '?'}search=${searchQuery}` : ''
                }`}
                className={!productType ? styles.activeLink : ''}
              >
                همه محصولات
              </a>
              <a
                href={`/products?type=PHYSICAL${categorySlug ? `&category=${categorySlug}` : ''}${
                  searchQuery ? `&search=${searchQuery}` : ''
                }`}
                className={productType === 'PHYSICAL' ? styles.activeLink : ''}
              >
                سخت‌افزار فیزیکی
              </a>
              <a
                href={`/products?type=DIGITAL${categorySlug ? `&category=${categorySlug}` : ''}${
                  searchQuery ? `&search=${searchQuery}` : ''
                }`}
                className={productType === 'DIGITAL' ? styles.activeLink : ''}
              >
                دانلود آنی / دیجیتال
              </a>
            </div>
          </div>

          {(searchQuery || categorySlug || productType) && (
            <a href="/products" className={styles.clearFiltersBtn}>
              حذف همه فیلترها
            </a>
          )}
        </aside>

        {/* Products grid */}
        <main className={styles.gridSection}>
          {products.length === 0 ? (
            <div className={styles.noResults}>
              <h3>هیچ محصولی با مشخصات مورد نظر شما پیدا نشد.</h3>
              <p>لطفاً فیلترها را تغییر دهید یا عبارت دیگری را جستجو کنید.</p>
              <a href="/products" className={styles.resetBtn}>مشاهده همه محصولات</a>
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
