import './Login.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { EMAIL_REGEX } from '../../utils/constants';

export default function Login({ isRequestInfo, setIsRequestInfo, onLogin }) {
  const { values, errors, isValid, resetForm, handleInputChange } =
    useFormWithValidation();

  useEffect(() => {
    setIsRequestInfo({
      isOpen: false,
    });
  }, []);

  const emailError = `${
    errors['email'] === 'Введите данные в нужном формате.'
      ? 'Недействительный email адрес'
      : errors['email']
  }`;

  const infoClassName = `login__request
    ${isRequestInfo.success ? 'login__request_success' : 'login__request_fail'} 
    ${isRequestInfo.isOpen && 'login__request_active'}`;

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email: values.email, password: values.password });
    resetForm();
  }

  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <img src={logo} alt='Логотип Movies Explorer' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit} noValidate>
        <div className='login__container'>
          <p className='login__input-text'>E-mail</p>
          <input
            className='login__input'
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
        <div className='login__container'>
          <p className='login__input-text'>Пароль</p>
          <input
            className='login__input'
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
          className='login__submit-button'
          aria-label='Кнопка войти'
          type='submit'
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
      <div className='login__link-register'>
        <p className='login__link-register-text'>Ещё не зарегистрированы?</p>
        <Link to='/signup' className='login__link-register-link'>
          Регистрация
        </Link>
      </div>
    </section>
  );
}
