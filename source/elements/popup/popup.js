"use strict";
(function() {

  class Popup {

    constructor (popup) {
      if (popup == null) return;
      this.popup = popup;

      this.close = this.close.bind(this);
      this.show = this.show.bind(this);
      this.onresize = this.onresize.bind(this);

      this.lightbox = document.querySelector('.popup-lightbox');
      this.lightbox.addEventListener("click", this.close);

      let close_buttons = this.popup.querySelectorAll('.popup__close');
      [].forEach.call(close_buttons, (button)=>{
        button.addEventListener("click", this.close);
      });

      window.addEventListener("resize", this.onresize);

    }

    onresize () {
      if (this.popup.offsetHeight > Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40) {
        window.localStorage.setItem('popupscroll', document.body.scrollTop);
        this.popup.classList.toggle('popup_unfixed', true);
        document.body.classList.toggle('popedup', true);
        document.body.style.height = this.popup.offsetHeight + 40 + "px";
        window.scroll(0,0);
      } else {
        this.popup.classList.toggle('popup_unfixed', false);
        document.body.classList.toggle('popedup', false);
        document.body.removeAttribute('style');
        if (window.localStorage.getItem('popupscroll') != null) {
          window.scroll(0, parseInt(window.localStorage.getItem('popupscroll'), 10));
        }
      }
    }

    show () {
      Velocity(this.popup, "stop");
      Velocity(this.lightbox, "stop");
      Velocity(this.popup, "fadeIn", {
        duration: 250
        , complete: ()=>{
          this.onresize();
        }
      });
      Velocity(this.lightbox, "fadeIn", {duration: 250});
    }

    close () {
      Velocity(this.popup, "stop");
      Velocity(this.lightbox, "stop");
      Velocity(this.popup, "fadeOut", {duration: 250});
      Velocity(this.lightbox, "fadeOut", {duration: 250});
      document.body.classList.toggle('popedup', false);
      document.body.removeAttribute('style');
      if (window.localStorage.getItem('popupscroll') != null) {
        window.scroll(0, parseInt(window.localStorage.getItem('popupscroll'), 10));
      }
    }

  }

  class Alert extends Popup {
    constructor (title = "", text = "") {
      let popup = document.querySelector('.popup_alert');
      if (popup == null) return;
      super(popup);
      if(title.trim().length > 0) {
        this.popup.querySelector('.popup__title').innerHTML = title;
      }
      if(text.trim().length > 0) {
        this.popup.querySelector('.popup__text').innerHTML = text;
      }
    }

    setTitle (title = "") {
      if(title.trim().length > 0) {
        this.popup.querySelector('.popup__title').innerHTML = title;
      }
    }

    setText (text = "") {
      if(text.trim().length > 0) {
        this.popup.querySelector('.popup__text').innerHTML = text;
      }
    }
  }

  class Recovery extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_recovery');
      if (popup == null) return;
      super(popup);
    }
  }

  class Feedback extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_feedback');
      if (popup == null) return;
      super(popup);
    }
  }

  class Ask extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_ask');
      if (popup == null) return;
      super(popup);
    }
  }

  class Register extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_register');
      if (popup == null) return;
      super(popup);
    }
  }

  class Like extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_like');
      if (popup == null) return;
      super(popup);
    }
  }

  class Dislike extends Popup {
    constructor () {
      let popup = document.querySelector('.popup_dislike');
      if (popup == null) return;
      super(popup);
    }
  }

  class Сonfirm extends Popup {
    constructor (success, fail) {
      let popup = document.querySelector('.popup_confirm');
      if (popup == null) return;
      super(popup);

      this.confirm_function = new Promise((resolve, reject) => {
        this.popup.querySelector('.popup__accept').addEventListener('click', ()=>{
          resolve();
          this.close();
        });
        this.popup.querySelector('.popup__reject').addEventListener('click', ()=>{
          reject();
          this.close();
        });
      });

      this.confirm_function.then(success, fail);
      this.show();
    }
  }

  let ready = new Promise((resolve, reject) => {
    if (document.readyState != "loading") return resolve();
    document.addEventListener("DOMContentLoaded", () => resolve());
  });
  ready.then(()=>{
    window.alert_popup    = new Alert();
    window.recovery_popup = new Recovery();
    window.feedback_popup = new Feedback();
    window.ask_popup      = new Ask();
    window.register_popup = new Register();

    window.like_popup     = new Like();
    window.dislike_popup  = new Dislike();

    window.Сonfirm        = Сonfirm;
  });


})();
