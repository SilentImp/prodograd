"use strict";
(function() {

  class Sliders {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let view = document.querySelector('.sliders__slider_view'),
        previews = document.querySelector('.sliders__slider_preview');

      if (view === null || previews === null) return;

      $(view).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        asNavFor: previews
      });
      $(previews).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: view,
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        variableWidth: true
      });
    }
  }

  new Sliders;

})();
