import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { useEffect } from 'react';

export default function Protector({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuth) navigate('/');
    },
    [isAuth, navigate],
  );

  return isAuth ? children : null;
}
