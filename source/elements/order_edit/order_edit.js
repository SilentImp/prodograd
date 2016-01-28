"use strict";
(function() {

  class OrderEdit {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let form = document.querySelector('.order-edit');
      if (form === null) return;

      this.widget = form;
      this.reset = this.reset.bind(this);
      this.selects = form.querySelectorAll('.order-edit__select');
      
      this.widget.querySelector('.order-edit__reset').addEventListener("click", this.reset);

      [].forEach.call(this.selects, (select)=> {
        $(select).select2({
          placeholder: select.getAttribute('placeholder'),
          allowClear: false,
          minimumResultsForSearch: 20
        });
        $(select).select2("val", "");
      });
    }

    reset() {
      [].forEach.call(this.selects, (select)=> {
        $(select).select2("val", "");
      });
    }

  }

  new OrderEdit;

})();
