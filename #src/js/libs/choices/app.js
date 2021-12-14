import './choices.js';

const defaultSelect = () => {
  const element1 = document.querySelector('.select1')
  const element2 = document.querySelector('.select2')
  const choices1 = new Choices(element1, {
    searchEnabled: false,
    itemSelectText: ''
  });
  const choices2 = new Choices(element2, {
    searchEnabled: false,
    itemSelectText: ''
  });
}

defaultSelect();

