import CityItem from './CityItem.jsx';
import styles from './css/CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCity } from '../Contexts/CitiesContext.jsx';
export default function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add new city to the list by clicking by the map" />
    );
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
