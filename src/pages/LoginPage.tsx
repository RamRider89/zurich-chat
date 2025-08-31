import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>
        En esta página se manejaría la lógica de autenticación y autorización.
      </p>
      <Link to="/">Volver al chat</Link>
    </div>
  );
};

export default LoginPage;