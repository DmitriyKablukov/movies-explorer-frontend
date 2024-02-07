import './MoviesCard.css';

export default function MoviesCard({ movie, isSaved }) {
  const isSavedButton = isSaved
    ? movie.saved
      ? 'movie-card__like-button_active'
      : 'movie-card__like-button'
    : 'movie-card__delete-button';

  return (
    <article className='movie-card'>
      <a
        href={movie.trailer}
        target='_blank'
        rel='noopener noreferrer'
        className='movie-card__trailer-link'
      >
        <img className='movie-card__image' src={movie.image} alt={movie.name} />
      </a>
      <div className='movie-card__bottom-bar'>
        <div className='movie-card__container'>
          <h2 className='movie-card__name'>{movie.name}</h2>
          <button
            className={isSavedButton}
            type='button'
            aria-label='Кнопка сохранить'
          ></button>
        </div>
        <p className='movie-card__time'>{movie.time}</p>
      </div>
    </article>
  );
}
