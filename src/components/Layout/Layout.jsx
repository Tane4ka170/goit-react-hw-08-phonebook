import { UserMenu } from 'components/UserMenu/UserMenu';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

export const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/contacts">
            <button>Contacts</button>
          </NavLink>
          <UserMenu />
        </>
      ) : (
        <>
          <NavLink to="/register">
            <button>Register</button>
          </NavLink>
          <NavLink to="/login">
            <button>Log In</button>
          </NavLink>
        </>
      )}
      <div>
        <Suspense fallback={null}>
          <div>
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};
