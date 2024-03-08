import './Register.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { USER_NAME_REGEX, EMAIL_REGEX } from '../../utils/constants';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Register({
  isRequestInfo,
  setIsRequestInfo,
  onRegister,
}) {
  const { values, errors, isValid, resetForm, handleInputChange } =
    useFormWithValidation();

  useEffect(() => {
    setIsRequestInfo({
      isOpen: false,
    });
  }, []);

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

  const infoClassName = `register__request
  ${
    isRequestInfo.success
      ? 'register__request_success'
      : 'register__request_fail'
  } 
  ${isRequestInfo.isOpen && 'register__request_active'}`;

  function handleSubmit(evt) {
    evt.preventDefault();
    resetForm();
    onRegister(values);
  }

  return (
    <section className='register'>
      <Link to='/' className='register__logo'>
        <img src={logo} alt='Логотип Movies Explorer' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <div className='register__container'>
          <p className='register__input-text'>Имя</p>
          <input
            className='register__input'
            id='name'
            name='name'
            required
            minLength='2'
            maxLength='30'
            placeholder='Введите имя'
            type='text'
            pattern={USER_NAME_REGEX}
            value={values['name'] ?? ''}
            onChange={handleInputChange}
          />
          <span
            className={`auth__error ${errors['name'] && 'auth__error_active'}`}
          >
            {nameError}
          </span>
        </div>
        <div className='register__container'>
          <p className='register__input-text'>E-mail</p>
          <input
            className='register__input'
            id='email'
            name='email'
            required
            placeholder='Введите e-mail'
            type='email'
            pattern={EMAIL_REGEX}
            value={values['email'] ?? ''}
            onChange={handleInputChange}
          />
          <span
            className={`auth__error ${errors['email'] && 'auth__error_active'}`}
          >
            {emailError}
          </span>
        </div>
        <div className='register__container'>
          <p className='register__input-text'>Пароль</p>
          <input
            className='register__input'
            id='password'
            name='password'
            required
            minLength='6'
            maxLength='30'
            placeholder='Введите пароль'
            type='password'
            value={values['password'] ?? ''}
            onChange={handleInputChange}
          />
          <span
            className={`auth__error ${
              errors['password'] && 'auth__error_active'
            }`}
          >
            {errors['password']}
          </span>
        </div>
        <span className={infoClassName}>{isRequestInfo.text}</span>
        <button
          className='register__submit-button'
          type='submit'
          aria-label='Кнопка зарегистрироваться'
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className='register__link-login'>
        <p className='register__link-login-text'>Уже зарегистрированы?</p>
        <Link to='/signin' className='register__link-login-link'>
          Войти
        </Link>
      </div>
    </section>
  );
}
