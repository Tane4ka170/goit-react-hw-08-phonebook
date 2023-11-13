import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from 'redux/auth/authOperations';
import { selectUser } from 'redux/auth/authSelectors';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <div className={s.userMenuContainer}>
        <p className={s.userMenuText}>
          Welcome, {userName ? userName.name : null}
        </p>
        <button
          type="button"
          className={s.userMenuButton}
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </>
  );
};
