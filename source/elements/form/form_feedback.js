"use strict";
(function() {

  class FeedbackForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_feedback');
      if (widget == null) return;

      this.widget = widget;
      
      this.show = this.show.bind(this);

      this.widget.addEventListener('submit', this.complete);

      [].forEach.call(document.querySelectorAll('.hints__contact-us'), (link)=>{
        link.addEventListener('click', this.show);
      });
    }

    show (event) {
      event.preventDefault();
      window.feedback_popup.show();
    }

    complete (event) {
      event.preventDefault();
      window.feedback_popup.close();
      window.alert_popup.setTitle('Принято!');
      window.alert_popup.setText('Мы ответим так быстро, как только сможем. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
      window.alert_popup.show();
    }

  }

  new FeedbackForm;

})();
