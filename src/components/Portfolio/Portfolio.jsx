import './Portfolio.css';
import icon from '../../images/link-icon.svg';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links-container'>
        <li className='portfolio__link-container'>
          <a
            href='https://github.com/DmitriyKablukov/how-to-learn'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Статичный сайт</p>
            <img
              className='portfolio__logo'
              src={icon}
              alt='Ссылка на портфолио'
            />
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            href='https://github.com/DmitriyKablukov/russian-travel'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Адаптивный сайт</p>
            <img
              className='portfolio__logo'
              src={icon}
              alt='Ссылка на портфолио'
            />
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            href='https://github.com/DmitriyKablukov/react-mesto-api-full-gha'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Одностраничное приложение</p>
            <img
              className='portfolio__logo'
              src={icon}
              alt='Ссылка на портфолио'
            />
          </a>
        </li>
      </ul>
    </section>
  );
}
