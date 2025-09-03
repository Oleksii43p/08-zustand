'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import css from './TagsMenu.module.css';

const tags: string[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        <p>Notes</p>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TagsMenu;