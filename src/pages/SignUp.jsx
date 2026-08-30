import styles from './css/Login.module.css';
import { useState } from 'react';

import PageNav from '../components/PageNav';
import Button from '../components/Button';
import { useAuth } from '../Contexts/AuthContext';

export default function SignUp() {
  // PRE-FILL FOR DEV PURPOSES
  const [name, setName] = useState('human');
  const [email, setEmail] = useState('2@gmail.com');
  const [password, setPassword] = useState('12');
  const { signUp } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    signUp(name, email, password);
  }
  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div>
          <Button type="primary" buttonType="submit">
            SignUp
          </Button>
        </div>
      </form>
    </main>
  );
}
