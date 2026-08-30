import { useAuth } from '../Contexts/AuthContext';
import Button from './Button';
import styles from './css/User.module.css';

function User() {
  const { user, isAuth, logOut } = useAuth();
  if (!user) return;

  function handleClick() {
    logOut();
  }
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <Button onClick={handleClick} buttonType="button" type="primary">
        logout
      </Button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
