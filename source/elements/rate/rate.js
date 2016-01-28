"use strict";
(function() {

  class Rate {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let widget = document.querySelector('.rate');
      if (widget === null) return;

      this.vote = this.vote.bind(this);

      this.widget = widget;
      [].forEach.call(widget.querySelectorAll('.rate__action'), (button)=> {
        button.addEventListener('click', this.vote);
      });
    }

    vote (event) {
      event.preventDefault();
      if(event.currentTarget.classList.contains('rate__like')){
        window.like_popup.show();
      } else {
        window.dislike_popup.show();
      }
    }

  }

  new Rate;

})();
