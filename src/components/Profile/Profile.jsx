import './Profile.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';

export default function Profile() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
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
        <button
          className='profile__exit-button'
          type='button'
          aria-label='Кнопка выйти из аккаунта'
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}
