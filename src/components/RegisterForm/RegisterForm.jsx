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
    <form className={s.regiserForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.rTitle}>Register </p>
      <p className={s.rMessage}>Join now for complete access to the app </p>
      <div>
        <label className={s.rLabel}>Name</label>
        <input
          {...register('name', {
            required: 'Please provide your name',
            minLength: {
              value: 3,
              message: 'Please enter a name with at least 3 characters',
            },
          })}
          type="text"
          placeholder="Full Name"
          className={s.rInput}
        />
        {formErrors.name && (
          <p className={s.errorMessage}>{formErrors.name.message}</p>
        )}
      </div>
      <div className={s.rFormGroup}>
        <label className={s.rLabel}>Email</label>
        <input
          {...register('email', {
            required: 'Please provide your email',
            minLength: {
              value: 6,
              message: 'Ensure your email is at least 6 characters long',
            },
          })}
          type="email"
          placeholder="Email"
          className={s.rInput}
        />
        {formErrors.email && (
          <p className={s.errorMessage}>{formErrors.email.message}</p>
        )}
      </div>
      <div className={s.rFormGroup}>
        <label className={s.rLabel}>Password</label>
        <input
          {...register('password', {
            required: 'Please enter your password',
            minLength: {
              value: 6,
              message: 'Make sure your password is at least 6 characters long',
            },
          })}
          type="password"
          placeholder="Password"
          className={s.rInput}
        />
        {formErrors.password && (
          <p className={s.errorMessage}>{formErrors.password.message}</p>
        )}
        <div className={s.centerBtn}>
          <button className={s.logBtn}>Sign up</button>
        </div>

        <span className={s.loginLink}>
          Have an account already? <Link to={'/login'}>Log in now</Link>
        </span>
      </div>
    </form>
  );
};
export default RegisterForm;
