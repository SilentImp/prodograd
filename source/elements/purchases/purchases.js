"use strict";
(function() {

  class Purchases {

    constructor () {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let purchases = document.querySelector('.purchases__list');
      if (purchases === null) return;
      $(purchases).isotope({
        itemSelector: '.item',
        layoutMode: 'packery',
        packery:{
          gutter: 0
        }
      });
    }
  }

  new Purchases;

})();
