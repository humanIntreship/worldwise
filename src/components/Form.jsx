import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './css/Form.module.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import BackButton from './BackButton';
import { useParamsLocation } from '../Hooks/useParamsLocation';
import Message from './Message';
import Spinner from './Spinner';
import { useCity } from '../Contexts/CitiesContext';

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useParamsLocation();
  const [cityName, setCityName] = useState('');
  const { addCity, isLoading: isAddCityLoading } = useCity();
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(
    function () {
      async function fetcher() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();
          console.log(data);
          if (!data.city || !data.countryName)
            throw new Error('click somewhere else');
          setCityName(data.city || data.countryCode);
          setCountry(data.countryName);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetcher();
    },
    [lat, lng],
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      position: { lat, lng },
      cityName,
      country,
      date,
      notes,
    };
    await addCity(newCity);
    navigate('/app/cities');
  }
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form
      className={`${styles.form} ${isAddCityLoading ? styles.loading : ''}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(theDate) => setDate(theDate)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" buttonType="submit">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
