"use strict";
(function() {

  class ProfileManufacturer {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let widget = document.querySelector('.profile_manufacture');
      if (widget === null) return;

      this.open = this.open.bind(this);

      this.widget = widget;
      [].forEach.call(widget.querySelectorAll('.profile__tab-button'), (button)=> {
        button.addEventListener("click", this.open);
      });

      this.current_button = widget.querySelector('.profile__tab-button_current');
      this.current_tab = widget.querySelector('.tab_current');
    }

    open (event) {
      let button = event.currentTarget
          , tab = this.widget.querySelector('.tab[data-tab="' + button.getAttribute('data-target') + '"]');

      this.current_button.classList.toggle('profile__tab-button_current', false);
      this.current_tab.classList.toggle('tab_current', false);

      this.current_button = button;
      this.current_tab = tab;

      this.current_button.classList.toggle('profile__tab-button_current', true);
      this.current_tab.classList.toggle('tab_current', true);

    }

  }

  new ProfileManufacturer;

})();
