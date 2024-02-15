import './Header.css';
import logo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ isAuth, handleBurgerClick, isBurgerOpen }) {
  const location = useLocation();
  const header = ['/', '/profile', '/movies', '/saved-movies'];

  if (header.includes(location.pathname))
    return (
      <header
        className={`header ${location.pathname === '/' && 'header_landing'}`}
      >
        <Link to='/' className='header__logo'>
          <img src={logo} alt='Логотип Movies Explorer' />
        </Link>
        <div className='header__container'>
          <Navigation
            isAuth={isAuth}
            handleBurgerClick={handleBurgerClick}
            isBurgerOpen={isBurgerOpen}
          />
        </div>
      </header>
    );
}
