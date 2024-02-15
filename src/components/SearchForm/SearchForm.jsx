import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/search-icon.svg';
import { useEffect, useState } from 'react';

export default function SearchForm({
  values,
  handleInputChange,
  isValid,
  setIsValid,
  onSubmitSearch,
}) {
  const [isError, setIsError] = useState(false);

  function handleSearch(evt) {
    evt.preventDefault();
    if (values.film !== '' && values.film !== undefined) {
      setIsError(false);
      onSubmitSearch(values);
    } else {
      setIsError(true);
    }
  }

  useEffect(() => {
    onSubmitSearch(values);
  }, [values.shorts]);

  useEffect(() => {
    setIsValid(true);
  }, []);

  return (
    <div className='search-form'>
      <div className='search-form__container'>
        <img className='search-form__icon' src={icon} alt='Поиск' />
        <form
          className='search-form__form'
          name='search-form'
          onSubmit={handleSearch}
        >
          <div className='search-form__input-container'>
            <input
              className='search-form__input'
              name='film'
              type='text'
              id='movie'
              placeholder='Фильм'
              onChange={handleInputChange}
              value={values['film'] || ''}
            />
            <button
              className='search-form__button'
              type='submit'
              aria-label='Кнопка поиска'
              disabled={!isValid}
            >
              Найти
            </button>
          </div>

          <span
            className={`search-form__error ${
              isError && 'search-form__error_active'
            }`}
          >
            Нужно ввести ключевое слово
          </span>
          <FilterCheckbox onChange={handleInputChange} values={values} />
        </form>
      </div>
      <div className='search-form__underline'></div>
    </div>
  );
}
