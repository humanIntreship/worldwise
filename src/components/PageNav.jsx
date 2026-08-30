import style from './css/PageNav.module.css';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../Contexts/AuthContext';
export default function PageNav() {
  const { isAuth } = useAuth();
  return (
    <div className={style.nav}>
      <ul>
        <Logo />

        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {!isAuth && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
