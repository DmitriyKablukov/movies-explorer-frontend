import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__subtitle'>Страница не найдена</p>
      </div>
      <button className='not-found__button'>
        <p className='not-found__link-text' onClick={handleClick}>
          Назад
        </p>
      </button>
    </section>
  );
}
