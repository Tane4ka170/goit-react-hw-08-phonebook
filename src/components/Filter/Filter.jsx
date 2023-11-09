import React from 'react';
import { useForm } from 'react-hook-form';
import s from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/sliseFilter';
import { selectFilter } from 'redux/selectors';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className={s.title}>Find contacts by name</p>
      <input
        className={s.inpt}
        {...register('filter')}
        type="text"
        onChange={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default Filter;
