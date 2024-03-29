import './Login.css';
import logo from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <img src={logo} alt='Логотип Movies Explorer' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form'>
        <div className='login__container'>
          <p className='login__input-text'>E-mail</p>
          <input
            className='login__input'
            id='email'
            name='email'
            required
            placeholder='Введите e-mail'
          />
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
          />
        </div>
        <button
          className='login__submit-button'
          type='button'
          aria-label='Кнопка войти'
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
