"use strict";
(function() {

  class Question {

    constructor () {

      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    scrollTo (event) {
      let link = event.currentTarget;
      Velocity(document.querySelector(event.currentTarget.getAttribute('href')), "scroll", {
        duration: 500
      });
    }

    init () {
      let widget = document.querySelector('.howto__questions');
      if (widget === null) return;

      this.scrollTo = this.scrollTo.bind(this);

      this.widget = widget;
      [].forEach.call(widget.querySelectorAll('.question__link'), (link)=> {
        link.addEventListener("click", this.scrollTo);
      });
    }
  }

  new Question;

})();
