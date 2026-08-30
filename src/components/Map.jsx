import styles from './css/Map.module.css';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCity } from '../Contexts/CitiesContext';
import { useGeoLocation } from '../Hooks/useGeolocation';
import { useParamsLocation } from '../Hooks/useParamsLocation';
export default function Map() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [lat, lng] = useParamsLocation();
  const { cities } = useCity();
  const {
    getCurrentPosition,
    currPosition,
    isLoading: iscurrLocationLoaded,
  } = useGeoLocation();

  useEffect(
    function () {
      if (currPosition) setPosition([currPosition.lat, currPosition.lng]);
    },
    [currPosition],
  );

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div
      className={styles.mapContainer}
      /*  onClick={() => navigate('form')} */
    >
      {!currPosition && (
        <Button type="position" onClick={getCurrentPosition}>
          {iscurrLocationLoaded ? 'Loading...' : 'Get My Currnet Location'}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities
          .filter((c) => c && c.position)
          .map((each) => (
            <Marker
              position={[each.position.lat, each.position.lng]}
              key={each.id}
            >
              <Popup>{each.cityName}</Popup>
            </Marker>
          ))}
        <ChangingCenter position={position} />
        <DetetctClick />
      </MapContainer>
    </div>
  );
}
function ChangingCenter({ position }) {
  useMap().setView(position);
  return null;
}
function DetetctClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
