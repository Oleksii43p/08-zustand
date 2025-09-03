'use client';

import css from './page.module.css';

export default function Loading() {
  return (
    <div>
      <p className={css.main}>Loading, please wait...</p>
    </div>
  );
}
