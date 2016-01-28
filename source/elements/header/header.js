"use strict";
(function () {

  class Navigation {

    constructor () {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let button_open = document.querySelector('.header__items');
      if (button_open === null) return;
      
      let button_close = document.querySelector('.header__close')
          , mobile_switch = document.querySelector('.header__mobile-switch')
          , mobile_switch_close = document.querySelector('.header__mobile-close');
      
      this.user_submenu = document.querySelector('.header__user');
      this.city_submenu = document.querySelector('.header__city');
      this.navigation  = document.querySelector('.header__dropdown_items');
      this.navigation_mobile  = document.querySelector('.header__mobile');
      
      this.onResize = this.onResize.bind(this);
      this.toggleNavigation = this.toggleNavigation.bind(this);
      this.toggleNavigationUser = this.toggleNavigationUser.bind(this);
      this.toggleNavigationCity = this.toggleNavigationCity.bind(this);
      this.toggleNavigationMobile = this.toggleNavigationMobile.bind(this);
      
      this.user_submenu.addEventListener('click', this.toggleNavigationUser);
      this.city_submenu.addEventListener('click', this.toggleNavigationCity);
      
      mobile_switch.addEventListener('click', this.toggleNavigationMobile);
      mobile_switch_close.addEventListener('click', this.toggleNavigationMobile);
      
      button_open.addEventListener('click', this.toggleNavigation);
      button_close.addEventListener('click', this.toggleNavigation);
      
      window.addEventListener('resize', this.onResize);
    }
    
    onResize () {
      let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      if (w<1300) return;
      
      let elements = document.querySelectorAll('.header__user_open, .header__city_open, .header__mobile_open');
      [].forEach.call( elements, (element)=> {
        element.classList.toggle('header__user_open', false);
        element.classList.toggle('header__city_open', false);
        element.classList.toggle('header__mobile_open', false);
      });
    }
    
    toggleNavigationUser () {
      this.user_submenu.classList.toggle('header__user_open');
    }

    toggleNavigationCity () {
      this.city_submenu.classList.toggle('header__city_open');
    }

    toggleNavigationMobile () {
      this.navigation_mobile.classList.toggle('header__mobile_open');
      
      this.navigation.classList.toggle('header__dropdown_open', false);
    }
    
    toggleNavigation () {
      this.navigation.classList.toggle('header__dropdown_open');
      
      this.navigation_mobile.classList.toggle('header__mobile_open', false);
    }

  }

  new Navigation;

})();
