"use strict";
(function() {

  class Sort {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let sort = document.querySelector('.sort');
      if (sort === null) return;

      this.widget = sort;
      let buttons = this.widget.querySelectorAll('.sort__button');
      this.current = this.widget.querySelector('.sort__button_current');

      [].forEach.call(buttons, (button)=> {
        button.addEventListener("click", this.sortIt.bind(this));
      });
    }

    sortIt (event) {

      if (!event.currentTarget.classList.contains('sort__button_current')) {

        this.current.classList.remove('sort__button_current');
        this.current.classList.remove('sort__button_forward');
        this.current.classList.remove('sort__button_backward');

        this.current = event.currentTarget;

        this.current.classList.add('sort__button_current');
        this.current.classList.add('sort__button_forward');
      } else {
        this.current.classList.toggle('sort__button_forward');
        this.current.classList.toggle('sort__button_backward');
      }
    }

  }

  new Sort;

})();
