import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

export default function App() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [isRequestInfo, setIsRequestInfo] = useState({
    isOpen: false,
    success: false,
    text: '',
  });

  function checkToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      api
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res.user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log('Ошибка:' + err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleRegister(values) {
    api
      .register(values)
      .then(() => {
        handleLogin(values);
      })
      .catch((err) => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: err,
        });
      });
  }

  function handleLogin(values) {
    api
      .login(values)
      .then(() => {
        const jwt = localStorage.getItem('token');
        api
          .getUserInfo(jwt)
          .then((data) => {
            setCurrentUser(data.user);
            setIsLoggedIn(true);
            navigate('/movies');
          })
          .catch((err) => {
            setIsRequestInfo({
              isOpen: true,
              text: err,
            });
          });
      })
      .catch((err) => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: err,
        });
      });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('filterParams');
    localStorage.removeItem('movieList');
    localStorage.removeItem('filteredMoviesList');
    setFilteredMoviesList([]);
    setCurrentUser({});
    navigate('/');
  }

  function handleEditProfile(values) {
    const jwt = localStorage.getItem('token');
    api
      .sendUserInfo(values, jwt)
      .then((data) => {
        setCurrentUser(data.user);
        setIsRequestInfo({
          isOpen: true,
          success: true,
          text: 'Данные пользователя изменены',
        });
      })
      .catch((err) => {
        setIsRequestInfo({
          isOpen: true,
          success: false,
          text: err,
        });
      });
  }

  function onClickLike(movie, isLiked, setIsLiked) {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      if (isLiked) {
        api
          .deleteSavedMovie(movie._id, jwt)
          .then(() => {
            setIsLiked(false);
            movie._id = undefined;
            setSavedMoviesList(
              savedMoviesList.filter((film) => film._id !== movie._id)
            );
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      } else {
        api
          .postSavedMovie(movie, jwt)
          .then((res) => {
            setIsLiked(true);
            movie._id = res.movie._id;
          })
          .catch((err) => console.log(`Ошибка: ${err}`));
      }
    } else setIsLoggedIn(false);
  }

  function getMovieList() {
    const movieList = JSON.parse(localStorage.getItem('movieList'));
    if (!movieList) {
      return moviesApi.getMovies();
    } else {
      return movieList;
    }
  }

  function filterMovieList() {
    setIsRequestInfo({
      isOpen: false,
      success: false,
      text: '',
    });
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsLoading(true);
      Promise.all([getMovieList(), api.getSavedMovies(jwt)])
        .then((promisesResults) => {
          const [movies, savedMovies] = promisesResults;
          const filterMoviesParams = JSON.parse(
            localStorage.getItem('filterParams')
          );
          let filteredMovies;
          if (filterMoviesParams) {
            const movieName = filterMoviesParams.film;
            const onlyShorts = filterMoviesParams.shorts ?? false;
            if (onlyShorts) {
              filteredMovies = movies.filter((movie) => {
                return movie.duration <= 40;
              });
              if (movieName) {
                filteredMovies = filteredMovies.filter((movie) =>
                  movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                );
              }
            } else {
              filteredMovies = movies.filter((movie) => {
                return movie.nameRU
                  .toLowerCase()
                  .includes(movieName.toLowerCase());
              });
            }
            localStorage.setItem(
              'filteredMoviesList',
              JSON.stringify(filteredMovies)
            );
            const savedMoviesIds = {};
            savedMovies.forEach((e) => (savedMoviesIds[e.movieId] = e._id));
            filteredMovies = filteredMovies.map((movie) => {
              if (savedMoviesIds[movie.id] !== undefined) {
                movie._id = savedMoviesIds[movie.id];
              }
              return movie;
            });
            if (filteredMovies.length === 0) {
              setIsRequestInfo({
                isOpen: true,
                success: false,
                text: 'Ничего не найдено',
              });
              setFilteredMoviesList([]);
            } else {
              setIsRequestInfo({
                isOpen: false,
                success: true,
                text: '',
              });
              setFilteredMoviesList(filteredMovies);
            }
          } else {
            localStorage.setItem('filteredMoviesList', []);
            setFilteredMoviesList([]);
          }
        })
        .catch(() => {
          setIsRequestInfo({
            isOpen: true,
            success: false,
            text: `Во время запроса произошла ошибка. Возможно, проблема с соединением 
            или сервер недоступен. Подождите немного и попробуйте ещё раз`,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }

  function renderSavedMovies(moviesList) {
    const jwt = localStorage.getItem('token');
    if (isLoggedIn && jwt) {
      setIsLoading(true);
      api
        .getSavedMovies(jwt)
        .then((savedMovies) => {
          const savedMoviesIds = {};
          savedMovies.forEach((movie) => {
            savedMoviesIds[movie.movieId] = movie._id;
          });
          moviesList = moviesList.map((movie) => {
            if (savedMoviesIds[movie.id] !== undefined) {
              movie._id = savedMoviesIds[movie.id];
            }
            return movie;
          });
          setFilteredMoviesList(moviesList);
        })
        .catch(() => {
          setIsRequestInfo({
            isOpen: true,
            success: false,
            text: `Во время запроса произошла ошибка. Возможно, проблема с соединением 
            или сервер недоступен. Подождите немного и попробуйте ещё раз`,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }

  function filterSavedMovies(filters) {
    const jwt = localStorage.getItem('token');
    if (isLoggedIn && jwt) {
      setIsLoading(true);
      api
        .getSavedMovies(jwt)
        .then((res) => {
          let filteredSavedMovies;
          if (filters.film || filters.shorts) {
            const movieName = filters.film;
            const onlyShorts = filters.shorts ?? false;
            if (onlyShorts) {
              filteredSavedMovies = res.filter((movie) => {
                return movie.duration <= 40;
              });
              if (movieName) {
                filteredSavedMovies = filteredSavedMovies.filter((movie) =>
                  movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
                );
              }
            } else {
              filteredSavedMovies = res.filter((movie) => {
                return movie.nameRU
                  .toLowerCase()
                  .includes(movieName.toLowerCase());
              });
            }
            if (filteredSavedMovies.length === 0) {
              setIsRequestInfo({
                isOpen: true,
                success: false,
                text: 'Ничего не найдено',
              });
              setSavedMoviesList([]);
            }
          } else {
            filteredSavedMovies = res;
            if (filteredSavedMovies.length === 0) {
              setIsRequestInfo({
                isOpen: true,
                success: false,
                text: 'Вы не сохранили ни одного фильма.',
              });
              setSavedMoviesList([]);
            }
          }
          if (filteredSavedMovies.length !== 0) {
            setIsRequestInfo({
              isOpen: false,
              success: true,
              text: '',
            });
            setSavedMoviesList(filteredSavedMovies);
          }
        })
        .catch(() => {
          setIsRequestInfo({
            isOpen: true,
            success: false,
            text: `Во время запроса произошла ошибка. Возможно, проблема с соединением 
            или сервер недоступен. Подождите немного и попробуйте ещё раз`,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }

  function onSubmitSearch(values) {
    if (values.film) {
      localStorage.setItem('filterParams', JSON.stringify(values));
      filterMovieList();
    }
  }

  function onSubmitSearchSaved(values) {
    filterSavedMovies(values);
  }

  function handleBurgerClick() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isAuth={isLoggedIn}
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
            path='/signup'
            element={
              !isLoggedIn ? (
                <Main>
                  <Register
                    isRequestInfo={isRequestInfo}
                    setIsRequestInfo={setIsRequestInfo}
                    onRegister={handleRegister}
                  />
                </Main>
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/signin'
            element={
              !isLoggedIn ? (
                <Main>
                  <Login
                    isRequestInfo={isRequestInfo}
                    setIsRequestInfo={setIsRequestInfo}
                    onLogin={handleLogin}
                  />
                </Main>
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/movies'
            element={
              <Main>
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  getMovieList={getMovieList}
                  onSubmitSearch={onSubmitSearch}
                  filteredMoviesList={filteredMoviesList}
                  filterMovieList={filterMovieList}
                  renderSavedMovies={renderSavedMovies}
                  onClickLike={onClickLike}
                  isRequestInfo={isRequestInfo}
                  setIsRequestInfo={setIsRequestInfo}
                />
              </Main>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <Main>
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onClickLike={onClickLike}
                  onSubmitSearch={onSubmitSearchSaved}
                  isRequestInfo={isRequestInfo}
                  setIsRequestInfo={setIsRequestInfo}
                  savedMoviesList={savedMoviesList}
                  filterSavedMovies={filterSavedMovies}
                />
              </Main>
            }
          />
          <Route
            path='/profile'
            element={
              <Main>
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  handleSignOut={handleSignOut}
                  handleEditProfile={handleEditProfile}
                  isRequestInfo={isRequestInfo}
                  setIsRequestInfo={setIsRequestInfo}
                />
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
          ></Route>
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
