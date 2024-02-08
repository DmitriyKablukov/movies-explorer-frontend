import './Techs.css';

export default function Techs() {
  return (
    <section className='technologies'>
      <h2 className='technologies__title'>Технологии</h2>
      <div className='technologies__container'>
        <h3 className='technologies__text-title'>7 технологий</h3>
        <p className='technologies__text-subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <div className='technologies__links'>
        <ul className='technologies__list'>
          <li className='technologies__link'>HTML</li>
          <li className='technologies__link'>CSS</li>
          <li className='technologies__link'>JS</li>
          <li className='technologies__link'>React</li>
          <li className='technologies__link'>Git</li>
          <li className='technologies__link'>Express.js</li>
          <li className='technologies__link'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
