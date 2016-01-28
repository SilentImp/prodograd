"use strict";
(function() {

  class OrderCreate {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let form = document.querySelector('.order-create');
      if (form === null) return;

      this.widget = form;
      [].forEach.call(form.querySelectorAll('.order-create__select'), (select)=> {
        $(select).select2({
          placeholder: select.getAttribute('placeholder'),
          allowClear: false,
          minimumResultsForSearch: 20
        });
        $(select).select2("val", "");
      });
    }

  }

  new OrderCreate;

})();
