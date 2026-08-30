import { createContext, useContext, useEffect, useReducer } from 'react';
import { citiesAPI } from '../services/api';
import logger from '../utils/logger';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: action.payload, error: null };
    case 'currentCity':
      return { ...state, currentCity: action.payload, error: null };
    case 'cities':
      return { ...state, cities: action.payload, error: null };
    case 'addCity':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        error: null,
      };
    case 'deleteCity':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        error: null,
      };
    case 'error':
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatcher] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatcher({ type: 'loading', payload: true });
        const data = await citiesAPI.getAll();
        dispatcher({ type: 'cities', payload: data });
      } catch (err) {
        logger.error('Failed to fetch cities', err);
        dispatcher({
          type: 'error',
          payload: err.message || 'Failed to load cities',
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      dispatcher({ type: 'loading', payload: true });
      const data = await citiesAPI.getById(id);
      dispatcher({ type: 'currentCity', payload: data });
    } catch (err) {
      logger.error('Failed to fetch city', err);
      dispatcher({
        type: 'error',
        payload: err.message || 'Failed to load city',
      });
    }
  }

  async function addCity(newCity) {
    try {
      dispatcher({ type: 'loading', payload: true });
      const data = await citiesAPI.add(newCity);
      dispatcher({ type: 'addCity', payload: data });
      dispatcher({ type: 'currentCity', payload: data });
    } catch (err) {
      logger.error('Failed to add city', err);
      dispatcher({
        type: 'error',
        payload: err.message || 'Failed to add city',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatcher({ type: 'loading', payload: true });
      await citiesAPI.delete(id);
      dispatcher({ type: 'deleteCity', payload: id });
    } catch (err) {
      logger.error('Failed to delete city', err);
      dispatcher({
        type: 'error',
        payload: err.message || 'Failed to delete city',
      });
    }
  }

  function clearError() {
    dispatcher({ type: 'error', payload: null });
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        getCity,
        currentCity,
        addCity,
        deleteCity,
        error,
        clearError,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCity() {
  const data = useContext(CitiesContext);
  if (data === undefined)
    throw new Error(
      'CitiesContext is not available. Make sure to wrap your app with CitiesProvider.',
    );

  return data;
}

export { CitiesProvider, useCity };
