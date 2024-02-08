import './Footer.css';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const footer = ['/movies', '/saved-movies', '/'];

  const location = useLocation();
  
  if (footer.includes(location.pathname))
    return (
      <footer className='footer'>
        <h2 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className='footer__bottom-bar'>
          <p className='footer__copyright'>© 2024. Kablukov Dmitrii</p>
          <div className='footer__links-bar'>
            <a
              href='https://practicum.yandex.ru/'
              className='footer__link'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
            <a
              href='https://github.com/DmitriyKablukov/movies-explorer-frontend'
              className='footer__link'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    );
}
