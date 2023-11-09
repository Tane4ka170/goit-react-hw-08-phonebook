import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContactThunk } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      phone: data.phone,
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      return toast.warn(`${contact.name} is already in contacts.`);
    }

    dispatch(addContactThunk(contact));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <label className={s.label}>
        <p className={s.title}>Name</p>
        <input
          className={s.input}
          {...register('name', { required: 'Name is required' })}
          type="text"
          placeholder="Name"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label className={s.label}>
        <p className={s.title}>Number</p>
        <input
          className={s.input}
          {...register('phone', { required: 'Phone number is required' })}
          type="tel"
          placeholder="Phone Number"
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
