import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { addContactThunk } from 'redux/contacts/operations';
import { selectContacts } from 'redux/contacts/selectors';

import s from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExist = contacts.some(
      ({ name: existingName }) =>
        existingName.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      toast.warn(`${name} is already in contacts.`);
    } else {
      dispatch(addContactThunk(contact));
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <label className={s.label}>
        <p className={s.title}>Name</p>
        <input
          className={s.input}
          type="text"
          {...register('name', { required: true })}
          id="addName"
          required
          placeholder="Please provide a name"
        />
      </label>

      <label className={s.label}>
        <p className={s.title}>Number</p>
        <input
          className={s.input}
          type="tel"
          {...register('number', { required: true })}
          id="addNumber"
          placeholder="Please enter a valid phone number"
          required
        />
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
