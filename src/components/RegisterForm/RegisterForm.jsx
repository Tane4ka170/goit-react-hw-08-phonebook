import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerThunk } from 'redux/auth/authOperations';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';
import { selectError } from 'redux/contacts/selectors';
import s from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  } = useForm();
  const error = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = data => {
    dispatch(registerThunk(data));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Ім'я</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters',
            },
          })}
          type="text"
          placeholder="Full Name"
        />
        {formErrors.name && <p>{formErrors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            minLength: {
              value: 6,
              message: 'Email should be at least 6 characters',
            },
          })}
          type="email"
          placeholder="Email"
        />
        {formErrors.email && <p>{formErrors.email.message}</p>}
      </div>
      <div>
        <label>Пароль</label>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
            },
          })}
          type="password"
          placeholder="Password"
        />
        {formErrors.password && <p>{formErrors.password.message}</p>}
        <div className={s.centerBtn}>
          <button className={s.logBtn}>Sign up</button>
        </div>

        <span>
          Have an account? <Link to={'/login'}>Log in</Link>
        </span>
      </div>
    </form>
  );
};
export default RegisterForm;
