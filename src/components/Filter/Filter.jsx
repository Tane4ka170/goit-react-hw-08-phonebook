import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { filterContacts } from 'redux/contacts/sliseFilter';
import { selectFilter } from 'redux/contacts/selectors';

import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      filter: filter,
    },
  });

  const onSubmit = data => {
    dispatch(filterContacts(data.filter.trim()));
  };

  return (
    <form className={s.filterForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.title}>Find contacts by name</p>
      <input
        className={s.inpt}
        {...register('filter')}
        type="text"
        placeholder="Enter Name"
        onChange={event => dispatch(filterContacts(event.target.value.trim()))}
      />
    </form>
  );
};

export default Filter;
