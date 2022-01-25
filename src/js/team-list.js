const link = document.querySelector('.footer__link');
const backdropModalEl = document.querySelector('[data-backdrop]');
const modalCartEl = document.querySelector('.modal__card');
const modalEl = document.querySelector('.modal');
const arrowTop = document.querySelector('.arrowTop');
const header = document.querySelector('header');
const debounce = require('lodash.debounce');
import teamMarkup from '../hbs/team-list.hbs';

link.addEventListener('click', onOpenTeamList);
window.addEventListener('scroll', debounce(onFetchToScroll, 150));
arrowTop.addEventListener('click', onScrollUp);

function onOpenTeamList(e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';
  modalEl.style.padding = 0;
  modalEl.style.display = 'flex';
  modalCartEl.style.flex = '1 1 100%';
  backdropModalEl.classList.remove('is-hidden');
  modalCartEl.innerHTML = teamMarkup();

  const nameList = document.querySelectorAll('.name__item span');
  const descriptionList = document.querySelectorAll('.description__item');
  nameList.forEach((el, ind) => {
    el.addEventListener('click', e => {
      document.querySelector('.name__item.active').classList.remove('active');
      document.querySelector('.description__item.active').classList.remove('active');
      e.target.parentNode.classList.add('active');
      descriptionList[ind].classList.add('active');
    });
  });
}

function onFetchToScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop >= 300) {
    arrowTop.classList.add('show');
  } else {
    arrowTop.classList.remove('show');
  }
}

function onScrollUp(e) {
  e.preventDefault();
  header.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

const markup = `<ul class='team-list'>
<li class='team-list__name'>
  <ul class='name'>
    <li class='name__item active'><span>Пирон Евгений</span></li>
    <li class='name__item'><span>Жабоедова Анастасия</span></li>
    <li class='name__item'><span>Бондарь Виктор</span></li>
    <li class='name__item'><span>Дзема Виталий</span></li>
    <li class='name__item'><span>Хливненко Ольга</span></li>
    <li class='name__item'><span>Варуник Виталий</span></li>
    <li class='name__item'><span>Остафийчук Алексей</span></li>
  </ul>
</li>
<li class='team-list__description'>
  <ul class='description'>
    <li class='description__item active'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='../src/images/team/piron.webp 1x, ../src/images/team/piron@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='../src/images/team/piron.jpg 1x, ../src/images/team/piron@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='imageURL/images/team/piron.jpg'
            alt='Пирон Женя'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut
      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/anastasia.webp 1x, images/team/anastasia@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/anastasia.jpg 1x, images/team/anastasia@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/anastasia.jpg'
            alt='Анастасія Жабоєдова'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/viktor_bondar.webp 1x, images/team/viktor_bondar@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/viktor_bondar.jpg 1x, images/team/viktor_bondar@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/viktor_bondar.jpg'
            alt='Виктор Бондар'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam

      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/vitalik_dzema.webp 1x, images/team/vitalik_dzema@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/vitalik_dzema.jpg 1x, images/team/vitalik_dzema@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/vitalik_dzema.jpg'
            alt='Виталик Дзема'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/Olga.webp 1x, images/team/Olga@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/Olga.jpg 1x, images/team/Olga@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/Olga.jpg'
            alt='Ольга Хливненко'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>

        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/vitalii_varunyk.webp 1x, images/team/vitalii_varunyk@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/vitalii_varunyk.jpg 1x, images/team/vitalii_varunyk@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/vitalii_varunyk.jpg'
            alt='Віталій Варуник'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
      </p>
    </li>
    <li class='description__item'>
      <div class='description__wrapper'>
        <picture class='description__picture'>
          <source
            srcset='images/team/oleksii_ostafiichuk.webp 1x, images/team/oleksii_ostafiichuk@2x.webp 2x'
            type='image/webp'
          />
          <source
            srcset='images/team/oleksii_ostafiichuk.jpg 1x, images/team/oleksii_ostafiichuk@2x.jpg 2x'
            type='image/jpeg'
          />
          <img
            class='description__img'
            src='../images/team/oleksii_ostafiichuk.jpg'
            alt='Остафийчук Алексй'
            width='85'
            height='85'
          />
        </picture>
      </div>
      <p class='description__text'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam
        iste cum assumenda eum eaque eveniet aut. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sequi quam cumque odio veniam iste cum assumenda eum eaque eveniet aut.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quam cumque odio veniam

      </p>
    </li>
  </ul>
</li>
</ul>`;
