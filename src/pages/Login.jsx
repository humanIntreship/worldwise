import styles from './css/Login.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PageNav from '../components/PageNav';
import Button from '../components/Button';
import { useAuth } from '../Contexts/AuthContext';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('1@gmail.com');
  const [password, setPassword] = useState('1');
  const { login, isAuth, user } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(
    function () {
      if (isAuth) navigate('/app');
    },
    [isAuth, navigate],
  );
  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button styles={{ flex: 1 }} type="primary" buttonType="submit">
            login
          </Button>

          <Link
            to="/signup"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button styles={{ flex: 1 }} type="primary">
              signup
            </Button>
          </Link>
        </div>
      </form>
    </main>
  );
}
