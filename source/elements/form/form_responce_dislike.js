"use strict";
(function() {

  class DislikeForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_dislike');
      if (widget == null) return;

      this.widget = widget;
      this.complete = this.complete.bind(this);
      this.widget.addEventListener('submit', this.complete);
    }

    complete (event) {
      event.preventDefault();

      window.dislike_popup.close();
      window.alert_popup.setTitle('Принято!');
      window.alert_popup.setText('Спасибо, что поделились мнением. Мы разберёмся с проблемой. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
      window.alert_popup.show();
    }

  }

  new DislikeForm;

})();
