import './FilterCheckbox.css';

export default function FilterCheckbox({ onChange, values }) {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          id='checkbox'
          name='shorts'
          checked={values.shorts ?? false}
          onChange={onChange}
        />
        <span className='filter-checkbox__switch'></span>
      </label>
    </div>
  );
}
