import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';

export default function MoviesCardList({ movies, isSaved }) {
  // ИЗМЕНИТЬ ЗНАЧЕНИЕ ДЛЯ ПРОВЕРКИ КНОПКИ "ЕЩЕ"
  const [countMovies, setCountMovies] = useState(12);

  // ИЗМЕНИТЬ ЗНАЧЕНИЕ ДЛЯ ПРОВЕРКИ КНОПКИ "ЕЩЕ"
  function handleClickMoreMovies() {
    setCountMovies(countMovies + 12);
  }

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        {movies.slice(0, countMovies).map((movie) => (
          <MoviesCard movie={movie} key={movie.id} isSaved={isSaved} />
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
