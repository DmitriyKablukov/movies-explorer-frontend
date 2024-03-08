import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import {
  DEBOUNCE_TIME,
  SCREEN_DESKTOP,
  SCREEN_TABLET,
  SCREEN_MOBILE,
  COUNT_MOVIES_DESKTOP_WIDESCREEN,
  COUNT_MOVIES_DESKTOP,
  COUNT_MOVIES_TABLET,
  COUNT_MOVIES_MOBILE,
  ADD_MOVIES_DESKTOP_WIDESCREEN,
  ADD_MOVIES_DESKTOP,
  ADD_MOVIES_TABLET,
  ADD_MOVIES_MOBILE,
} from '../../utils/constants';

export default function MoviesCardList({ movies, onClickLike, isRequestInfo }) {
  const [countMovies, setCountMovies] = useState(
    COUNT_MOVIES_DESKTOP_WIDESCREEN
  );
  const [addMovies, setAddMovies] = useState(ADD_MOVIES_DESKTOP_WIDESCREEN);

  function countShowMovies() {
    const width = window.innerWidth;
    if (width <= SCREEN_MOBILE) {
      setCountMovies(COUNT_MOVIES_MOBILE);
      setAddMovies(ADD_MOVIES_MOBILE);
    } else if (width <= SCREEN_TABLET) {
      setCountMovies(COUNT_MOVIES_TABLET);
      setAddMovies(ADD_MOVIES_TABLET);
    } else if (width <= SCREEN_DESKTOP) {
      setCountMovies(COUNT_MOVIES_DESKTOP);
      setAddMovies(ADD_MOVIES_DESKTOP);
    } else {
      setCountMovies(COUNT_MOVIES_DESKTOP_WIDESCREEN);
      setAddMovies(ADD_MOVIES_DESKTOP_WIDESCREEN);
    }
  }

  useEffect(() => {
    countShowMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', countShowMovies);
    }, DEBOUNCE_TIME);
  });

  function handleClickMoreMovies() {
    setCountMovies(countMovies + addMovies);
  }

  return (
    <section className='movies-card-list'>
      <p
        className={`movies-card-list__error ${
          isRequestInfo.isOpen && 'movies-card-list__error_active'
        }`}
      >
        {isRequestInfo.text}
      </p>
      <div className='movies-card-list__container'>
        {movies.slice(0, countMovies).map((movie) => (
          <MoviesCard
            key={movie._id ?? movie.id}
            movie={movie}
            onClickLike={onClickLike}
          />
        ))}
      </div>
      {countMovies < movies.length && (
        <button
          className='movies-card-list__open-button'
          onClick={handleClickMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
