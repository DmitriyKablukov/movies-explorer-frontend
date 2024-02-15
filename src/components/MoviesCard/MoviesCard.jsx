import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCard({ movie, onClickLike }) {
  const page = useLocation().pathname;

  let defaultIsLiked;
  if (page === '/saved-movies') {
    defaultIsLiked = true;
  } else if (page === '/movies' && movie._id !== undefined) {
    defaultIsLiked = true;
  } else {
    defaultIsLiked = false;
  }

  const [isLiked, setIsLiked] = useState(defaultIsLiked);

  const isSavedButton = ` ${!isLiked ? 'movie-card__like-button' : ''} ${
    isLiked && page === '/saved-movies' ? 'movie-card__delete-button' : ''
  } ${isLiked && page === '/movies' ? 'movie-card__like-button_active' : ''}`;

  function calcDuration(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours === 0) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  }

  function handleClickLike(evt) {
    evt.stopPropagation();
    onClickLike(movie, isLiked, setIsLiked);
  }

  return (
    <article className='movie-card'>
      <a
        href={movie.trailerLink}
        target='_blank'
        rel='noopener noreferrer'
        className='movie-card__trailer-link'
      >
        <img
          className='movie-card__image'
          src={
            typeof movie.image === 'string'
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>
      <div className='movie-card__bottom-bar'>
        <div className='movie-card__container'>
          <h2 className='movie-card__name'>{movie.nameRU}</h2>
          <button
            className={isSavedButton}
            type='button'
            aria-label='Кнопка сохранить'
            onClick={handleClickLike}
          ></button>
        </div>
        <p className='movie-card__time'>{calcDuration(movie.duration)}</p>
      </div>
    </article>
  );
}
