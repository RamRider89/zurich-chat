import { useNavigate } from 'react-router-dom';
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
      <button className='btn btn-sm btn-primary' onClick={handleLogin}>Iniciar Sesión</button>
      <button className='btn btn-sm btn-link'onClick={handleLogout}>Cerrar Sesión</button>
      <hr />
    </div>
  );
};

export default LoginPage;