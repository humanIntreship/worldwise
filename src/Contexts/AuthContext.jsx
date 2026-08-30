import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setISAuth] = useState(false);
  const navigate = useNavigate();
  async function login(email, password) {
    const res = await fetch(
      `http://localhost:8001/users?email=${email}&password=${password}`,
    );

    const data = await res.json();
    const user = data[0];

    if (user) {
      setUser(user);
      setISAuth(true);
      navigate('/app');
    }
    if (!user) alert('wrong username / password');
  }

  async function signUp(name, email, password) {
    const res = await fetch(`http://localhost:8001/users?email=${email}`);

    const data = await res.json();
    const user = data[0];
    if (user) {
      alert('This email is already registered');
      return;
    }

    await fetch('http://localhost:8001/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        avatar: `https://i.pravatar.cc/100?u=${name}`,
      }),
    });
    await login(email, password);
  }

  function logOut() {
    setUser(null);
    setISAuth(false);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ login, signUp, logOut, user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const data = useContext(AuthContext);
  if (data === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return data;
}
export { useAuth, AuthProvider };
