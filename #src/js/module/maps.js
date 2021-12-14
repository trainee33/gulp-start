document.addEventListener('DOMContentLoaded', function() {

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map-location', {
      center: [55.75186531335753,37.62356116821074],
      zoom: 13,
      controls: [] // Убираем все элементы управления
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            //clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 64,
            // Макет метки кластера pieChart.
            clusterIconLayout: "default#pieChart"
        });
    myMap.geoObjects.add(objectManager);

    //Клик по метке в карте (смена иконки)
    
    // objectManager.objects.overlays.events.add('click', function (e) {
    //   objectManager.objects.setObjectOptions(        
    //     e.get('objectId'),
    //     {
    //       iconImageHref: 'img/icons/map2.png'
    //     }
    //   );
    // });
    
    let blockElement = document.getElementById('myElement'),
        
        divListeners = ymaps.domEvent.manager.group(blockElement)
            .add('click', function (e) {
              let listElement = document.querySelectorAll('.location-items__item');
                for (let index = 0; index < listElement.length; index++) {
                  const el = listElement[index];
                  if(el.classList.contains('active')){
                    el.classList.remove('active');
                  }
                }   
               
              
              e.get('target').classList.add('active');
              let category = e.get('target').getAttribute('data-category');
               
              if(category === "Школы") {
                objectManager.setFilter('properties.hintContent == "Школа"');
              } else if(category === "Аптеки") {
                objectManager.setFilter('properties.hintContent == "Аптека"');
              } else if(category === "Поликлиники") {
                objectManager.setFilter('properties.hintContent == "Поликлиника"');
              } else if(category === "Магазины") {
                objectManager.setFilter('properties.hintContent == "Магазин"');
              }                
            });

    //objectManager.setFilter('properties.hintContent == "Школы"');

    async function getProducts() {
        const file = 'resources/data.json';
        let response = await fetch(file, {
          metod: 'GET'
        });
        if (response.ok) {
          let result = await response.json();
          objectManager.add(result);
        } else {
          alert('Ошибка');
        }
      }
    getProducts();
  }
});