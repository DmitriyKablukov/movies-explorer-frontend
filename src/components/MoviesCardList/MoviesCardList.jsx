import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';

export default function MoviesCardList({ movies, onClickLike, isRequestInfo }) {
  const [countMovies, setCountMovies] = useState(16);
  const [addMovies, setAddMovies] = useState(4);

  function countShowMovies() {
    const width = window.innerWidth;
    if (width >= 1280) {
      setCountMovies(16);
      setAddMovies(4);
    } else if (width >= 990) {
      setCountMovies(12);
      setAddMovies(3);
    } else if (width >= 660) {
      setCountMovies(8);
      setAddMovies(2);
    } else {
      setCountMovies(5);
      setAddMovies(2);
    }
  }

  useEffect(() => {
    countShowMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', countShowMovies);
    }, 3600);
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
