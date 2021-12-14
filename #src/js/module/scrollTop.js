import {menu_close} from './menu.js';
import {body_lock_remove} from './function.js'

let menuLinks = document.querySelectorAll('.menu__link');

for (let i = 0; i < menuLinks.length; i++) {

  menuLinks[i].addEventListener('click', function (e) {
    if (document.querySelector('.menu__body._active')) {
      menu_close();
      body_lock_remove(500);
    }

    scrollMenu(this.getAttribute('href'));

    })
}

// функция скролла
function scrollMenu(blockId) {
  let temp;

  // отмена анимации
  cancelAnimationFrame(temp);

  // время начала анимации
  let start = performance.now();

  // высота скролла страницы
  let from = window.pageYOffset || document.documentElement.scrollTop,
      // высота от верхнего края окна браузера до блока
      to = document.querySelector(blockId).getBoundingClientRect().top;

  // время анимации из расчета 3000px за секунду
  let duration = 1000 * Math.abs(to) / 4000;

  // анимация скролла
  requestAnimationFrame(function step(timestamp, e) {
      // timestamp метка времени от начала анимации
      // сколько прошло времени (timestamp - start)
      // (timestamp - start) / duration приравниваем к 1
      var progress = (timestamp - start) / duration;
      1 <= progress && (progress = 1);
      // from + to расстояние от верха документа до верха блока
      // from + to * progress промежуточное расстояние до блока. progress == 1 мы на месте
      // изменение высоты скролла
      window.scrollTo(0, from + to * progress | 0);

      // остановка анимации
      // 1 > progress анимация продолжается или
      // задаем hash 

      (1 > progress) ? temp = requestAnimationFrame(step): (document.location.hash = blockId);

      // отменяем прокрутку если крутим колесом мышки
      // document.addEventListener("wheel", function () {
      //     cancelAnimationFrame(temp);
      // })
  })
}