import CountryItem from './CountryItem.jsx';
import styles from './css/CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCity } from '../Contexts/CitiesContext.jsx';
export default function CountryList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add new country to the list by clicking by the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
