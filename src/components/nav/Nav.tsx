import styles from './Nav.module.scss';

function SpecialNav() {

  return (
    <ul className={`justify-content-end 
                    ${styles['nav']}
                    ${styles['navbar-expand-md']}
                    ${styles['navbar-light']}
                    ${styles['bg-light']}
                    ${styles['fixed-top']}
    `}>
      <li className={`${styles['nav-item']}`}>
        <a className={`${styles['nav-link']} ${styles['active']}`} href="/about">Acerca de</a>
      </li>
      <li className={`${styles['nav-item']}`}>
        <a className={`${styles['nav-link']}`} href="/login">Login</a>
      </li>
      <li className={`${styles['nav-item']}`}>
        <a className={`${styles['nav-link']} ${styles['disabled']}`} href="#">Disabled</a>
      </li>

    </ul>
  );
};

export default SpecialNav;