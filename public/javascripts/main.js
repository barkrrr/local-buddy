'use strict';

function main () {   
  const loader = document.getElementById('load-wrapper');
  if (loader) {
    loader.classList.add('loaded');
  }
  /** Init Swiper */
  const swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    mousewheelControl: true,
    slidesPerView: 'auto',

    keyboard: {
      enabled: true
    },
    pagination: {
      el: '.swiper-pagination',
      draggable: true
    }
  });

  // const buddieProfile = document.getElementById('buddie-profile');
  const menuTrigger = document.getElementById('menu_trigger');
  const siteLogo = document.getElementById('site-logo');
  const menuContainer = document.getElementById('menu-container');

  siteLogo.addEventListener('click', () => {
    menuTrigger.classList.remove('open');
    menuContainer.classList.remove('open');
  });
  menuTrigger.addEventListener('click', () => {
    menuTrigger.classList.toggle('open');
    menuContainer.classList.toggle('open');
  });
}

let dateInputs = document.querySelectorAll('.date-input');

dateInputs.forEach(function (input) {
  input.value = new Date().toJSON().slice(0, 10);
});

window.addEventListener('load', main);

// const App = {
//   clickmenu : () => {
//     this.menuTrigger.addEventListener('click', () => {
//       this.menuTrigger.classList.toggle('open');
//       this.menuContainer.classList.toggle('open');
//     });
//   }
// };

/* Esto es para hacer la validación de las fechas del calendario */


window.onload = () => {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };
  
  function error(err) {
    console.error('ERROR(' + err.code + '): ' + err.message);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}
