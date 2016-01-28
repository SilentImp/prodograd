"use strict";
(function() {

  class RegisterForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_register');
      if (widget == null) return;

      this.widget = widget;
      
      this.show = this.show.bind(this);
      this.complete = this.complete.bind(this);
      this.widget.addEventListener('submit', this.complete);

      this.password = this.widget.querySelector('input[name="password"]');
      this.confirmation = this.widget.querySelector('input[name="password_confirmation"]');

      [].forEach.call(document.querySelectorAll('.register-link'), (link)=>{
        link.addEventListener('click', this.show);
      });
    }

    show (event) {
      event.preventDefault();
      window.register_popup.show();
    }

    complete (event) {
      event.preventDefault();

      if (this.password.value.trim() !== this.confirmation.value.trim()) {
        this.password.classList.toggle('form__input_invalid', true);
        this.confirmation.classList.toggle('form__input_invalid', true);
        return;
      } else {
        this.password.classList.toggle('form__input_invalid', false);
        this.confirmation.classList.toggle('form__input_invalid', false);
      }

      window.register_popup.close();
      window.alert_popup.setTitle('Yowzah!');
      window.alert_popup.setText('В вашем почтовом ящике только что матеарилизовалось письмо с супер-секретныой ссылочкой, нежно нажмите на неё, что бы доказать своё существование.');
      window.alert_popup.show();
    }

  }

  new RegisterForm;

})();
