import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { movies } from '../../utils/movies';

export default function Movies({ isLoading, isSaved }) {
  return (
    <section className='movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} isSaved={isSaved} />
      )}
    </section>
  );
}
