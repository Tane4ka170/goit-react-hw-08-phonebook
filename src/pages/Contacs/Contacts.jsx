import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllContactsThunk } from 'redux/contacts/operations';
import s from './Contacts.module.css';

export const Contacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllContactsThunk());
  }, [dispatch]);
  return (
    <div className={s.div}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={s.title}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
