import './Promo.css';
import logo from '../../images/promo-logo.svg';

export default function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <div className='promo__logo-container'>
        <img className='promo__logo' src={logo} alt='Логотип' />
      </div>
    </section>
  );
}
