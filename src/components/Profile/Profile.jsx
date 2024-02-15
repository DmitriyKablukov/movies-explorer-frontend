import './Profile.css';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Profile({
  isRequestInfo,
  setIsRequestInfo,
  handleEditProfile,
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, setIsValid, resetForm, handleInputChange } =
    useFormWithValidation();

  useEffect(() => {
    setIsRequestInfo({
      isOpen: false,
    });
  }, []);

  useEffect(() => {
    resetForm(
      { name: currentUser.name, email: currentUser.email },
      { name: '', email: '' }
    );
  }, [currentUser]);

  const nameError = `${
    errors['name'] === 'Введите данные в нужном формате.'
      ? 'Поле должно содержать только латиницу, кириллицу, пробел или дефис'
      : errors['name']
  }`;
  const emailError = `${
    errors['email'] === 'Введите данные в нужном формате.'
      ? 'Недействительный email адрес'
      : errors['email']
  }`;

  const infoClassName = `profile__request 
    ${
      isRequestInfo.success
        ? 'profile__request_success'
        : 'profile__request_fail'
    } 
    ${isRequestInfo.isOpen && 'profile__request_active'}`;

  function handleSubmitEditUser(evt) {
    evt.preventDefault();
    handleEditProfile({ name: values.name, email: values.email });
  }

  function handleOnChange(evt) {
    handleInputChange(evt);
    const currentValue = { ...values };
    const { name, value } = evt.target;
    currentValue[name] = value;
    if (
      currentUser.name === currentValue.name &&
      currentUser.email === currentValue.email
    ) {
      setIsValid(false);
    }
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form className='profile__form' onSubmit={handleSubmitEditUser}>
        <div className='profile__container-name'>
          <p className='profile__input-text'>Имя</p>
          <input
            className='profile__input'
            id='name'
            name='name'
            placeholder='Имя'
            type='text'
            required
            minLength='3'
            maxLength='30'
            pattern={USER_NAME_REGEX}
            value={values['name'] || ''}
            onChange={handleOnChange}
          />
          <span
            className={`profile__error ${
              errors['name'] && 'profile__error_active'
            }`}
          >
            {nameError}
          </span>
        </div>
        <div className='profile__container-email'>
          <p className='profile__input-text'>E-mail</p>
          <input
            className='profile__input'
            id='email'
            name='email'
            placeholder='E-mail'
            type='email'
            required
            pattern={EMAIL_REGEX}
            value={values['email'] || ''}
            onChange={handleOnChange}
          />
          <span
            className={`profile__error ${
              errors['email'] && 'profile__error_active'
            }`}
          >
            {emailError}
          </span>
        </div>
        <span className={infoClassName}>{isRequestInfo.text}</span>
        <button
          className='profile__edit-button'
          type='submit'
          disabled={!isValid}
          aria-label='Кнопка редактировать'
        >
          Редактировать
        </button>
        <Link to='/signin'>
          <button
            className='profile__exit-button'
            type='submit'
            onClick={handleSignOut}
            aria-label='Кнопка выйти из аккаунта'
          >
            Выйти из аккаунта
          </button>
        </Link>
      </form>
    </section>
  );
}
