import './AboutMe.css';
import photo from '../../images/student-photo.jpeg';

export default function AboutMe() {
  return (
    <section className='about'>
      <h2 className='about__title'>Студент</h2>
      <div className='about__container'>
        <div className='about__student-container'>
          <div>
            <h3 className='about__student-name'>Дмитрий</h3>
            <p className='about__student-job'>Фронтенд-разработчик, 28 лет</p>
            <p className='about__student-description'>
              Я живу в Москве. У меня есть жена и кот. Закончил факультет
              математики и компьютерных наук Ивановского Государственного
              университета. В свободное время увлекаюсь музыкой и бегом. С 2017
              года работаю по специальности "Техническая защита информации".
              Решил сменить сферу деятельности и пошел на курсы
              Яндекс.Практикума.
            </p>
          </div>
          <a
            href='https://github.com/DmitriyKablukov'
            className='about__student-link'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about__photo' src={photo} alt='Фотография студента' />
      </div>
    </section>
  );
}
