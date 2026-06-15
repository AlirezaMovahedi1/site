import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import styles from './post-details.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return {
      title: 'مقاله یافت نشد | سیدی آی‌تی مارکت',
    };
  }

  return {
    title: `${post.title} | وبلاگ سیدی آی‌تی`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(post.createdAt);

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.breadcrumb}>
        <Link href="/">خانه</Link>
        <span> / </span>
        <Link href="/blog">وبلاگ</Link>
        <span> / </span>
        <span className={styles.breadcrumbCurrent}>{post.title}</span>
      </div>

      <article className={styles.post}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <User size={16} />
              <span>نویسنده: تیم فنی سیدی آی‌تی</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className={styles.imageWrapper}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className={styles.image}
            priority
          />
        </div>

        <p className={styles.summary}>{post.summary}</p>

        <div className={styles.body}>
          {post.content.split('\n\n').map((block, idx) => {
            if (block.startsWith('### ')) {
              return <h3 key={idx}>{block.replace('### ', '')}</h3>;
            }
            if (block.startsWith('* ') || block.startsWith('1. ')) {
              return (
                <ul key={idx} className={styles.list}>
                  {block.split('\n').map((li, lIdx) => (
                    <li key={lIdx}>{li.replace(/^(\*\s|1\.\s|\d+\.\s)/, '')}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{block}</p>;
          })}
        </div>
      </article>

      <div className={styles.footerNav}>
        <Link href="/blog" className={styles.backBtn}>
          <ArrowRight size={18} /> بازگشت به لیست مقالات
        </Link>
      </div>
    </div>
  );
}
