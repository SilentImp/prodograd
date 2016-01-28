"use strict";
(function() {

  class Filters {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.filters');
      if (widget == null) return;

      this.widget = widget;

      let more = this.widget.querySelector('.filters__more')
        , less = this.widget.querySelector('.filters__less');

      this.selects = this.widget.querySelectorAll('select.filters__select');

      this.showMore = this.showMore.bind(this);
      this.showLess = this.showLess.bind(this);
      this.reset = this.reset.bind(this);

      more.addEventListener('click', this.showMore);
      less.addEventListener('click', this.showLess);

      this.widget.addEventListener('reset', this.reset);

      [].forEach.call(this.selects, (select)=> {
        $(select).select2({
          placeholder: select.getAttribute('placeholder'),
          allowClear: false,
          minimumResultsForSearch: 20
        });
        $(select).select2("val", "");
      });
    }

    reset () {
      [].forEach.call(this.selects, (select)=> {
        $(select).select2("val", "");
      });
    }

    showMore (event) {
      event.preventDefault();
      this.widget.classList.toggle('filters_more', true);
    }

    showLess (event) {
      event.preventDefault();
      this.widget.classList.toggle('filters_more', false);
    }

  }

  new Filters;

})();
