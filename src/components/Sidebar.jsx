import { Outlet } from 'react-router-dom';
import styles from './css/SideBar.module.css';
import Logo from './Logo';
import AppNav from './AppNav';

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} WorldWise inc.
        </p>
      </footer>
    </div>
  );
}
