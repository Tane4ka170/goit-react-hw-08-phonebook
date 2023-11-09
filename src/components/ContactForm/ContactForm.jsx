import s from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from '@reduxjs/toolkit';
import { addContactThunk } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      id: nanoid(),
      name: event.currentTarget.elements.name.value,
      phone: event.currentTarget.elements.phone.value,
    };

    const isExist = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      return toast.warn(`${contact.name} is already in contacts.`);
    }

    dispatch(addContactThunk(contact));
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        <p className={s.title}>Name</p>
        <input
          className={s.input}
          type="text"
          name="name"
          placeholder="Name"
          required
        />
      </label>
      <label className={s.label}>
        <p className={s.title}>Number</p>
        <input
          className={s.input}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        />
      </label>
      <button className={s.button}>Add contact</button>
    </form>
  );
};

export default ContactForm;
