import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from 'redux/auth/authOperations';
import { selectUser } from 'redux/auth/authSelectors';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <div>
        <p>Welcome, {userName ? userName.name : null}</p>
        <button type="button" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </>
  );
};
