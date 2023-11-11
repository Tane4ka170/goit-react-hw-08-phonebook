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
            required: 'Email is required',
            minLength: {
              value: 6,
              message: 'Email should be at least 6 characters',
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
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be at least 6 characters',
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
          Don't have an account? <Link to={'/register'}>Register</Link>
        </span>
      </div>
    </form>
  );
};
