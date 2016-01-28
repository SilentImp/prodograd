"use strict";
(function() {

  class LikeForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_like');
      if (widget == null) return;

      this.widget = widget;
      this.complete = this.complete.bind(this);
      this.widget.addEventListener('submit', this.complete);
      this.widget.querySelector('.form__button_like').addEventListener('click', this.complete);
    }

    complete (event) {
      event.preventDefault();

      window.like_popup.close();
      window.alert_popup.setTitle('Принято!');
      window.alert_popup.setText('Спасибо, что поделились мнением. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
      window.alert_popup.show();
    }

  }

  new LikeForm;

})();
