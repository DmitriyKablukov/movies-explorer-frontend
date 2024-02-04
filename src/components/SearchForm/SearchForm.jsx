import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/search-icon.svg';

export default function SearchForm() {
  return (
    <div className='search-form'>
      <div className='search__container'>
        <div className='search-form__container'>
          <img className='search-form__icon' src={icon} alt='Поиск' />
          <form className='search-form__form'>
            <input
              className='search-form__input'
              type='text'
              name='movie'
              id='movie'
              placeholder='Фильм'
            />
            <button
              className='search-form__button'
              type='button'
              aria-label='Кнопка поиска'
            >
              Найти
            </button>
          </form>
        </div>

        <FilterCheckbox />
      </div>
      <div className='search-form__underline'></div>
    </div>
  );
}
