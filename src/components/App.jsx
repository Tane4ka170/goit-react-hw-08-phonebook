import { useEffect } from 'react';
import { fetchAllContactsThunk } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { Contacts } from 'pages/Contacs/Contacts';
import { Layout } from './Layout/Layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import { Register } from 'pages/Register/Register';
import NotFound from 'pages/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllContactsThunk());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />

          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />

          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
