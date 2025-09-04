import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Page not found',
  openGraph: {
    title: 'Page not found',
    description: 'Page not found ',
    url: 'https://08-zustand-iota-sooty.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notes application',
      },
    ],
  },
};

export default function notFound() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
