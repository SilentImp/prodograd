"use strict";
(function() {

  class RecoveryForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_recovery');
      if (widget == null) return;

      this.widget = widget;
      
      this.show = this.show.bind(this);

      this.widget.addEventListener('submit', this.complete);

      [].forEach.call(document.querySelectorAll('.recovery-link'), (link)=>{
        link.addEventListener('click', this.show);
      });
    }

    show (event) {
      event.preventDefault();
      window.recovery_popup.show();
    }

    complete (event) {
      event.preventDefault();
      window.recovery_popup.close();
      window.alert_popup.setTitle('Allons-y!');
      window.alert_popup.setText('К вам уже летит наше письмо с супер-секретныой ссылочкой, нажмите на неё в нем, что бы восстановить пароль.');
      window.alert_popup.show();
    }

  }

  new RecoveryForm;

})();
