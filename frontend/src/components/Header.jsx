import styles from './Header.module.css';

const Header = () => {
    return (
      <header className={`${styles.bgHeader} ${styles.heightHeader} ${styles.widthHeader} ${styles.flexCenter}`}>
        <div className='header'></div>
      </header>
    );
  };
  
  export default Header;