import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';
import type { AppDispatch } from '../store';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simula una autenticación exitosa con un rol de 'user'
    dispatch(login({ name: 'Usuario Prueba', roles: ['user'] }));
    navigate('/'); // Redirige a la página principal
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>
        Haz clic en el botón para simular una autenticación exitosa.
      </p>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <hr />
      <Link to="/">Volver al chat (Si estás logueado)</Link>
    </div>
  );
};

export default LoginPage;