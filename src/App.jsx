import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';

import HomePage from './pages/Homepage';
import Pricing from './pages/Pricing';
import AppLayout from './pages/AppLayout';
import Product from './pages/Product';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './Contexts/CitiesContext';
import { AuthProvider } from './Contexts/AuthContext';
import Protector from './components/Protector';

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/app"
            element={
              <Protector>
                <AppLayout />
              </Protector>
            }
          >
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CitiesProvider>
    </AuthProvider>
  );
}
