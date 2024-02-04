import './Register.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <section className='register'>
      <Link to='/' className='register__logo'>
        <img src={logo} alt='Логотип Movies Explorer' />
      </Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form'>
        <div className='register__container'>
          <p className='register__input-text'>Имя</p>
          <input
            className='register__input'
            id='name'
            name='name'
            placeholder='Введите имя'
          />
        </div>
        <div className='register__container'>
          <p className='register__input-text'>E-mail</p>
          <input
            className='register__input'
            id='email'
            name='email'
            placeholder='Введите e-mail'
          />
        </div>
        <div className='register__container'>
          <p className='register__input-text'>Пароль</p>
          <input
            className='register__input'
            id='password'
            name='password'
            placeholder='Введите пароль'
          />
        </div>
        <button
          className='register__submit-button'
          type='button'
          aria-label='Кнопка зарегистрироваться'
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
