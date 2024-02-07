import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function App() {
  const [currentUser] = useState({
    name: 'Дмитрий',
    email: 'test@test.ru',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [isBurgerOpen, setIsBurgerOpened] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  function handleBurgerClick() {
    setIsBurgerOpened(!isBurgerOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={isLoggedIn}
          handleBurgerClick={handleBurgerClick}
          isBurgerOpen={isBurgerOpen}
        />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Main>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
              </Main>
            }
          />
          <Route
            exact
            path='/movies'
            element={
              <Main>
                <Movies isLoading={isLoading} isSaved={true} />
              </Main>
            }
          />
          <Route
            exact
            path='/saved-movies'
            element={
              <Main>
                <SavedMovies isLoading={isLoading} isSaved={false} />
              </Main>
            }
          />
          <Route
            exact
            path='/profile'
            element={
              <Main>
                <Profile />
              </Main>
            }
          />
          <Route
            exact
            path='/signin'
            element={
              <Main>
                <Login />
              </Main>
            }
          />
          <Route
            exact
            path='/signup'
            element={
              <Main>
                <Register />
              </Main>
            }
          />
          <Route
            path='/*'
            element={
              <Main>
                <NotFound />
              </Main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
