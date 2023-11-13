import React from 'react';

import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';

import { UserMenu } from 'components/UserMenu/UserMenu';

import s from './Layout.module.css';

export const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.container}>
      <header className={s.header}>
        <nav className={s.nav}>
          <NavLink to="/" className={s.link}>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/contacts" className={s.link}>
                Contacts
              </NavLink>
              <UserMenu className={s.userMenu} />
            </>
          ) : (
            <div className={s.linkContainer}>
              <NavLink to="/register" className={s.link}>
                Register
              </NavLink>
              <NavLink to="/login" className={s.link}>
                Log In
              </NavLink>
            </div>
          )}
        </nav>
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
