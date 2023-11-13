import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { deleteContactThunk } from 'redux/contacts/operations';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectLoading,
} from 'redux/contacts/selectors';
import Loader from '../Loader/Loader';

import s from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredContacts = filter
    ? contacts.filter(
        contact =>
          contact.name &&
          contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, loading]);

  const onDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <ul className={s.ul}>
          {filteredContacts.map(({ id, name, number }) => (
            <li className={s.list} key={id}>
              <p>
                {name}: {number}
              </p>
              <button className={s.btn} onClick={() => onDeleteContact(id)}>
                &#128465;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
