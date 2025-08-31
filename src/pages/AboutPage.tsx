import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <h1>Acerca de este Asistente IA</h1>
      <p>
        Esta es una aplicación de prueba desarrollada en React, TypeScript y Redux. 
        Su propósito es demostrar la integración de diversas tecnologías frontend.
      </p>
      <Link to="/">Volver al chat</Link>
    </div>
  );
};

export default AboutPage;