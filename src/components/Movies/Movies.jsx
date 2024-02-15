import './Movies.css';
import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import useFormWithValidation from '../../hooks/useFormWithValidation';

export default function Movies({
  isLoading,
  setIsLoading,
  onClickLike,
  filteredMoviesList,
  filterMovieList,
  renderSavedMovies,
  isRequestInfo,
  setIsRequestInfo,
  onSubmitSearch,
}) {
  const { values, setIsValid, setValues, isValid, handleInputChange } =
    useFormWithValidation();

  useEffect(() => {
    setIsLoading(true);
    setIsRequestInfo({
      isOpen: false,
      success: true,
      text: '',
    });
    const filterMovies = JSON.parse(localStorage.getItem('filterParams'));
    if (filterMovies) {
      setValues(filterMovies);
    }
    const filteredMoviesLocalStorage = JSON.parse(
      localStorage.getItem('filteredMoviesList')
    );
    if (filteredMoviesLocalStorage) {
      renderSavedMovies(filteredMoviesLocalStorage);
    } else if (filterMovies) {
      filterMovieList();
    }
  }, []);

  return (
    <section className='movies'>
      <SearchForm
        values={values}
        handleInputChange={handleInputChange}
        isValid={isValid}
        setIsValid={setIsValid}
        onSubmitSearch={onSubmitSearch}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isRequestInfo={isRequestInfo}
          movies={filteredMoviesList}
          onClickLike={onClickLike}
        />
      )}
    </section>
  );
}
