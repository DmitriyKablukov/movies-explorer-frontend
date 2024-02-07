import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__text-container'>
        <div className='about-project__text-card'>
          <h3 className='about-project__text-card-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__text-card-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__text-card'>
          <h3 className='about-project__text-card-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__text-card-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__progress'>
        <div className='about-project__backend'>
          <p className='about-project__backend-timeline'>1 неделя</p>
          <p className='about-project__progress-subtitle'>Back-end</p>
        </div>
        <div className='about-project__frontend'>
          <p className='about-project__frontend-timeline'>4 недели</p>
          <p className='about-project__progress-subtitle'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
