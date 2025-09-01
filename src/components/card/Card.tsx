interface ICard {
  title: string;
  text: string;
  type?: string;
}

import styles from './Card.module.scss'; // Importas los estilos como un objeto

function SpecialCard({title, text} : ICard) {

  return (
    <div className={styles['special-card']}>
      <div className="card-body">
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">{ text }</p>
      </div>
    </div>
  );
};

export default SpecialCard;