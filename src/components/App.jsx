import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { Contacts } from 'pages/Contacs/Contacts';
import { Layout } from './Layout/Layout';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';
import { Register } from 'pages/Register/Register';
import NotFound from 'pages/NotFound/NotFound';
import { selectIsRefreshing } from 'redux/auth/authSelectors';
import { refreshThunk } from 'redux/auth/authOperations';
import Loader from '../components/Loader/Loader';

const App = () => {
  const dispatch = useDispatch();
  const refresh = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return refresh ? (
    <Loader />
  ) : (
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
