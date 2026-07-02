import React from 'react';
import prisma from '../../lib/prisma';
import ProductCard from '../../components/ProductCard';
import styles from './products.module.css';

export const metadata = {
  title: 'کاتالوگ محصولات | سیدی آی‌تی',
  description: 'لیست کامل محصولات سخت‌افزاری و نرم‌افزاری سیدی آی‌تی شامل لپ‌تاپ‌های صنعتی لنوو ThinkPad، اسکنرهای اثر انگشت Suprema و لایسنس‌های آنتی‌ویروس.',
};

interface SearchParams {
  search?: string;
  category?: string;
  sort?: string;
  special?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const searchQuery = params.search || '';
  const categorySlug = params.category || '';
  const sort = params.sort || 'default';
  const showSpecial = params.special === 'true';

  // Get categories for filter list
  const categories = await prisma.category.findMany();

  // Helper for clean parameter URLs
  const getQueryUrl = (newParams: { sort?: string; category?: string; search?: string; special?: boolean | null }) => {
    const finalParams = {
      sort: newParams.sort !== undefined ? newParams.sort : sort,
      category: newParams.category !== undefined ? newParams.category : categorySlug,
      search: newParams.search !== undefined ? newParams.search : searchQuery,
      special: newParams.special !== undefined ? (newParams.special ? 'true' : '') : (showSpecial ? 'true' : ''),
    };

    const parts = [];
    if (finalParams.sort && finalParams.sort !== 'default') parts.push(`sort=${finalParams.sort}`);
    if (finalParams.category) parts.push(`category=${finalParams.category}`);
    if (finalParams.search) parts.push(`search=${encodeURIComponent(finalParams.search)}`);
    if (finalParams.special === 'true') parts.push(`special=true`);

    return `/products${parts.length > 0 ? `?${parts.join('&')}` : ''}`;
  };

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

  // Check count of real special offers in DB
  const specialCount = await prisma.product.count({
    where: { isSpecialOffer: true }
  });

  let showSpecialMock = false;
  if (showSpecial) {
    if (specialCount > 0) {
      whereClause.isSpecialOffer = true;
    } else {
      showSpecialMock = true;
    }
  }

  // Determine ordering
  let orderByClause: any = {};
  if (sort === 'newest') {
    orderByClause = { id: 'desc' };
  } else if (sort === 'price-desc') {
    orderByClause = { price: 'desc' };
  } else if (sort === 'price-asc') {
    orderByClause = { price: 'asc' };
  } else if (sort === 'popular') {
    orderByClause = { rating: 'desc' };
  } else {
    orderByClause = { id: 'asc' };
  }

  let products = await prisma.product.findMany({
    where: whereClause,
    orderBy: orderByClause,
    include: {
      category: true,
    },
  });

  if (showSpecialMock) {
    // Mock mode: slice top 5 products and map them as special offers
    products = products.slice(0, 5).map((prod, idx) => {
      const offerEnd = new Date();
      offerEnd.setDate(offerEnd.getDate() + 1);
      return {
        ...prod,
        isSpecialOffer: true,
        specialPrice: Math.round(prod.price * (0.8 + (idx * 0.03))), // 20%, 17%, 14% ...
        specialOfferEnd: offerEnd,
      };
    });
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.sortBar}>
        <div className={styles.sortLabel}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={styles.sortIcon}
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="14" y1="18" x2="20" y2="18" />
          </svg>
          <span>مرتب سازی بر اساس</span>
        </div>
        <div className={styles.sortOptions}>
          <a
            href={getQueryUrl({ sort: 'default' })}
            className={`${styles.sortChip} ${sort === 'default' ? styles.sortChipActive : ''}`}
          >
            پیش‌فرض
          </a>
          <a
            href={getQueryUrl({ sort: 'newest' })}
            className={`${styles.sortChip} ${sort === 'newest' ? styles.sortChipActive : ''}`}
          >
            جدیدترین
          </a>
          <a
            href={getQueryUrl({ sort: 'price-desc' })}
            className={`${styles.sortChip} ${sort === 'price-desc' ? styles.sortChipActive : ''}`}
          >
            بیشترین قیمت
          </a>
          <a
            href={getQueryUrl({ sort: 'price-asc' })}
            className={`${styles.sortChip} ${sort === 'price-asc' ? styles.sortChipActive : ''}`}
          >
            کمترین قیمت
          </a>
          <a
            href={getQueryUrl({ sort: 'popular' })}
            className={`${styles.sortChip} ${sort === 'popular' ? styles.sortChipActive : ''}`}
          >
            پرفروش‌ترین
          </a>
        </div>
      </div>

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
              {sort && sort !== 'default' && <input type="hidden" name="sort" value={sort} />}
              {showSpecial && <input type="hidden" name="special" value="true" />}
              <button type="submit" className={styles.searchBtn}>اعمال</button>
            </form>
          </div>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>دسته‌بندی‌ها</h4>
            <div className={styles.filterLinks}>
              {/* Special Offers Toggle Link */}
              <a
                href={getQueryUrl({ special: !showSpecial })}
                className={`${showSpecial ? styles.activeLink : ''}`}
                style={{ color: '#ef4056', fontWeight: showSpecial ? 'bold' : 'normal' }}
              >
                🔥 پیشنهادهای ویژه
              </a>

              <a
                href={getQueryUrl({ category: '', special: false })}
                className={!categorySlug && !showSpecial ? styles.activeLink : ''}
              >
                همه دسته‌ها
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={getQueryUrl({ category: cat.slug })}
                  className={categorySlug === cat.slug ? styles.activeLink : ''}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {(searchQuery || categorySlug || showSpecial || (sort && sort !== 'default')) && (
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
