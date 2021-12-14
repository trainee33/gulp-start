import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Scrollbar]);

if (document.querySelector('.hero__slider')) {
  new Swiper('.hero__slider', {
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      speed: 800,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      direction: 'horizontal',
      navigation: {
        nextEl: '.hero-arrows__next',
        prevEl: '.hero-arrows__prev'
      },
      breakpoints: {
          560: {
            direction: 'vertical'
  
        }
      }   
    });
  }

  if (document.querySelector('.slider-about__slider')) {
    new Swiper('.slider-about__slider', {
      slidesPerView: 1.3,
      spaceBetween: 10,
      loop: true,
      speed: 800,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      navigation: {
        nextEl: '.about-arrows__next',
        prevEl: '.about-arrows__prev'
      },
      breakpoints: {
        560: {
          slidesPerView: 1 
      }
    } 
    });
  }
 
  if (document.querySelector('.slider-layout__slider')) {
  new Swiper('.slider-layout__slider', {
    slidesPerView: 1,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        768: {
          slidesPerView: 1.4,
          spaceBetween: 30
      },
        980: {
            slidesPerView: 1.6,
            spaceBetween: 30
        }
    }
  });
}
 
  if (document.querySelector('.slider-gallery')) {
    new Swiper('.slider-gallery', {
      slidesPerView: 1,
      spaceBetween: 15,      
      loop: true,
      speed: 800,
      observer: true,
      observerParents: true,
      observerSlideChildren: true,
      breakpoints: {
        560: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
      }
    });
  }

if (document.querySelector('.content-progress__slider')) {
  new Swiper('.content-progress__slider', {
    slidesPerView: 1,
    speed: 800,
    observer: true,
    observerParents: true,
    observerSlideChildren: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.progress-button__next',
      prevEl: '.progress-button__prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      560: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      980: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      1100: {
        slidesPerView: 6,
        spaceBetween: 30,
      }
    }
  });
}