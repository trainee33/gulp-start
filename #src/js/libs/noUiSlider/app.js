import './nouislider.js';
import './wNumb.js'

const uiSlider1 = document.querySelector('#uiSlider1');
const areamin = document.querySelector('#label-form__areamin');
const areamax = document.querySelector('#label-form__areamax');
const uiSlider2 = document.querySelector('#uiSlider2');
const levelmin = document.querySelector('#label-form__levelmin');
const levelmax = document.querySelector('#label-form__levelmax');
const area = [areamin, areamax];
const level = [levelmin, levelmax];

noUiSlider.create(uiSlider1, {
    start: [40, 100],
    step: 1,
    tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
    connect: true,
    range: {
        'min': 40,
        'max': 100
    }
});

uiSlider1.noUiSlider.on('update', function (values, handle) {
  area[handle].value = Math.round(values[handle]);
});

noUiSlider.create(uiSlider2, {
  start: [1, 20],
  step: 1,
  tooltips: [ wNumb({ decimals: 0 }), wNumb({ decimals: 0 }) ],
  connect: true,
  range: {
      'min': 1,
      'max': 20
  }
});

uiSlider2.noUiSlider.on('update', function (values, handle) {
  level[handle].value = Math.round(values[handle]);
});