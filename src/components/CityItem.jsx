import styles from './css/CityItem.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from './City';
import { useCity } from '../Contexts/CitiesContext';
export default function CityItem({ city }) {
  const { cityName, date, id, position } = city || {};
  const lat = position?.lat;
  const lng = position?.lng;
  const { currentCity, deleteCity } = useCity();
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li style={{ listStyleType: 'none' }}>
      <Link
        className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
