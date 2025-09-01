interface IButton {
  title: string;
  type: string;
  icon: string;
}

import styles from './Button.module.scss'; // Importas los estilos como un objeto

function SpecialButton({title, type, icon} : IButton) {

  return (
    <button type="button" className={`${styles['special-btn']} ${styles[type]}`}>
      <i className={ icon }></i>  { title }
    </button>
  );
};

export default SpecialButton;