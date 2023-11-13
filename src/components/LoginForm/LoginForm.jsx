import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginThunk } from 'redux/auth/authOperations';
import { selectIsLoggedIn } from 'redux/auth/authSelectors';
import { selectError } from 'redux/contacts/selectors';

import s from './LoginForm.module.css';

export const LoginForm = () => {
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
    dispatch(loginThunk(data));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formGroup}>
        <label className={s.label}>Email</label>
        <input
          {...register('email', {
            required: 'Please provide your email',
            minLength: {
              value: 6,
              message: 'Ensure your email is at least 6 characters long',
            },
          })}
          className={s.input}
          type="email"
          placeholder="Email"
        />
        {formErrors.email && (
          <p className={s.errorMessage}>{formErrors.email.message}</p>
        )}
      </div>
      <div className={s.formGroup}>
        <label className={s.label}>Password</label>
        <input
          {...register('password', {
            required: 'Please enter your password',
            minLength: {
              value: 6,
              message: 'Make sure your password is at least 6 characters long',
            },
          })}
          className={s.input}
          type="password"
          placeholder="Password"
        />
        {formErrors.password && (
          <p className={s.errorMessage}>{formErrors.password.message}</p>
        )}
        <div className={s.centerBtn}>
          <button className={s.logBtn}>Sign in</button>
        </div>

        <span className={s.registerLink}>
          New here? <Link to={'/register'}>Create an account</Link>
        </span>
      </div>
    </form>
  );
};
