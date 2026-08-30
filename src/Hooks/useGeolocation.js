import { useState } from 'react';

export function useGeoLocation(defaultPosition = null) {
  const [currPosition, setCurrPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  function getCurrentPosition() {
    if (!navigator.geolocation)
      setError('YOUR BROWSER DOES NOT SUPPORT GEOLOCATION');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (res) => {
        setCurrPosition({
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        });
        setIsLoading(false);
      },
      (rej) => {
        setError(rej.message);
        setIsLoading(false);
      },
    );
  }
  return { getCurrentPosition, currPosition, isLoading, error };
}
