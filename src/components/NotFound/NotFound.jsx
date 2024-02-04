import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <h2 className='not-found__title'>404</h2>
        <p className='not-found__subtitle'>Страница не найдена</p>
      </div>
      <Link to='/' className='not-found__link'>
        <p className='not-found__link-text'>Назад</p>
      </Link>
    </section>
  );
}
