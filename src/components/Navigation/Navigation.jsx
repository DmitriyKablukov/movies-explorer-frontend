import './Navigation.css';
import profileIcon from '../../images/profile-icon.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Navigation({
  isAuth,
  isBurgerOpen,
  handleBurgerClick,
}) {
  const location = useLocation();

  const linkActive = `navigation__link_active-${
    isBurgerOpen ? 'tablet' : 'desktop'
  }`;

  function handleClickOverlay(e) {
    e.stopPropagation();
  }

  return (
    <>
      {isAuth ? (
        <nav
          className={`navigation navigation_state-${
            isBurgerOpen ? 'open' : 'close'
          }`}
          onClick={isBurgerOpen ? handleBurgerClick : undefined}
        >
          <BurgerMenu
            isBurgerOpen={isBurgerOpen}
            handleBurgerClick={handleBurgerClick}
          />
          <ul
            className={`navigation__list navigation__list_auth navigation__list_state-${
              isBurgerOpen ? 'open' : 'close'
            }`}
            onClick={handleClickOverlay}
          >
            <div className='navigation__links'>
              {isBurgerOpen && (
                <li className='navigation__item'>
                  <NavLink
                    to='/'
                    className={({ isActive }) =>
                      isActive
                        ? 'navigation__link ' + linkActive
                        : 'navigation__link'
                    }
                  >
                    Главная
                  </NavLink>
                </li>
              )}
              <li className='navigation__item'>
                <NavLink
                  to='/movies'
                  className={({ isActive }) =>
                    isActive
                      ? 'navigation__link ' + linkActive
                      : 'navigation__link'
                  }
                >
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink
                  to='/saved-movies'
                  className={({ isActive }) =>
                    isActive
                      ? 'navigation__link ' + linkActive
                      : 'navigation__link'
                  }
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </div>
            <div className='navigation__item'>
              <Link to='/profile' className='navigation__profile'>
                <p className='navigation__profile-text'>Аккаунт</p>
                <div
                  className={`navigation__profile-icon ${
                    location.pathname === '/' &&
                    'navigation__profile-icon_landing'
                  }`}
                >
                  <img src={profileIcon} alt='Иконка профиля' />
                </div>
              </Link>
            </div>
          </ul>
        </nav>
      ) : (
        <nav className='navigation navigation__list-not-auth'>
          <Link
            className='navigation__link navigation__link-register'
            to='/signup'
          >
            Регистрация
          </Link>
          <Link className='navigation__link navigation__link-auth' to='/signin'>
            Войти
          </Link>
        </nav>
      )}
    </>
  );
}
