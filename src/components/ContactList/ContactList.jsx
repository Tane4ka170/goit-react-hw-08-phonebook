import React from 'react';
import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContactThunk } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectFilter,
  selectLoading,
} from 'redux/selectors';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

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
          {filteredContacts.map(({ id, name, phone }) => (
            <li className={s.list} key={id}>
              <p>
                {name}: {phone}
              </p>
              <button className={s.btn} onClick={() => onDeleteContact(id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
