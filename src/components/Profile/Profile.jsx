import './Profile.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form className='profile__form'>
        <div className='profile__container-name'>
          <p className='profile__input-text'>Имя</p>
          <input
            className='profile__input'
            id='name'
            name='name'
            placeholder='Имя'
            // value={currentUser.name}
          />
        </div>
        <div className='profile__container-email'>
          <p className='profile__input-text'>E-mail</p>
          <input
            className='profile__input'
            id='email'
            name='email'
            placeholder='E-mail'
            // value={currentUser.email}
          />
        </div>
        <button
          className='profile__edit-button'
          type='button'
          aria-label='Кнопка редактировать'
        >
          Редактировать
        </button>
        <Link to='/signin'>
          <button
            className='profile__exit-button'
            type='button'
            aria-label='Кнопка выйти из аккаунта'
          >
            Выйти из аккаунта
          </button>
        </Link>
      </form>
    </section>
  );
}
