import css from './SidebarNotes.module.css';
import Link from 'next/link';

const tagsList: string[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const Sidebar = async () => {
  return (
    <ul className={css.menuList}>
      {tagsList.map((tag) => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
