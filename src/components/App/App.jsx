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
          <Route exact path='/' element={<Main />} />
          <Route exact path='/movies' element={<Movies isLoading={isLoading} isSaved={true} />} />
          <Route
            exact
            path='/saved-movies'
            element={<SavedMovies isLoading={isLoading} isSaved={false} />}
          />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/signin' element={<Login />} />
          <Route exact path='/signup' element={<Register />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
