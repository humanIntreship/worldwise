import styles from './css/Button.module.css';
export default function Button({ children, type, buttonType, onClick }) {
  return (
    <button
      onClick={onClick}
      type={buttonType ? buttonType : 'button'}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}
