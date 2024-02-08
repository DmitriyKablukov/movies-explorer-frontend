import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { movies } from '../../utils/movies';

export default function SavedMovies({ isLoading }) {
  return (
    <div className='saved-movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies.filter((card) => card.saved)} />
      )}
    </div>
  );
}
