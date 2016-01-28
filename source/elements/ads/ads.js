"use strict";
(function () {

  class Ads {

    constructor () {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let widget = document.querySelector('.ads');
      if (widget == null) return;

      this.widget = widget;
      this.menu = this.widget.querySelector('.ads__filter');
      this.items = this.widget.querySelectorAll('.ads__item');
      this.categories = this.widget.querySelectorAll('.ads__category');

      this.filter = this.filter.bind(this);
      this.remove = this.remove.bind(this);
      this.preRemove = this.preRemove.bind(this);

      this.current = null;
      this.type = 'all';
      [].forEach.call(this.widget.querySelectorAll('.ads__control_remove'), (button) => {

        button.addEventListener("click", this.preRemove);


      });
      [].forEach.call(this.menu.querySelectorAll('.ads__button'), (button) => {
        button.addEventListener("click", this.filter);
        if(button.classList.contains('ads__button_current')){
          this.current = button;
        }
      });
      [].forEach.call(this.items, (item) => {
        item.setAttribute('data-visible', true);
      });
    }

    preRemove (event) {
      event.preventDefault();
      let eventWrapper = event;
      new Сonfirm(()=>{
        this.remove(eventWrapper);
      }, ()=>{
        
      });
    }

    remove (event) {
      let button = event.target
        , item = button.closest('.ads__item');

      if (item.hasAttribute('data-hidden')) {
        item.parentNode.removeChild(item);
      } else {
        Velocity(item, "stop");
        Velocity(item, "fadeOut", {
            duration: 500,
            complete: () => {
              item.parentNode.removeChild(item);
              [].forEach.call(this.categories, (categorie) => {
                if (categorie.querySelector('.ads__item') == null) {
                  categorie.parentNode.removeChild(categorie);
                }
                if ((this.type!= 'all') && (categorie.querySelector('.ads__item_' + this.type) == null)) {
                  this.hide(categorie);
                }
              });
              this.items = this.widget.querySelectorAll('.ads__item');
              this.categories = this.widget.querySelectorAll('.ads__category');
            }
          });
      }



    }

    filter (event) {
      let button = event.currentTarget
        , type = button.getAttribute('data-type');

      this.type = type;

      if (button.classList.contains('ads__button_current')) return;

      if (this.current != null) {
        this.current.classList.remove('ads__button_current');
      }

      this.current = button;
      this.current.classList.add('ads__button_current');

      switch (type) {
        case 'all':
            [].forEach.call(this.categories, (categorie) => {
              this.show(categorie);
            });
            [].forEach.call(this.items, (item) => {
              this.show(item);
            });
          break;
        default:
          [].forEach.call(this.items, (item) => {
            if (item.classList.contains('ads__item_'+type)){
              this.show(item);
            } else {
              this.hide(item);
            }
          });
          [].forEach.call(this.categories, (categorie) => {
            if (categorie.querySelector('.ads__item_' + type) == null) {
              this.hide(categorie);
            } else {
              this.show(categorie);
            }
          });
          break;
      }
    }

    hide (item) {
      if (item.hasAttribute('data-hidden')) return;
      item.setAttribute('data-hidden', true);
      item.removeAttribute('data-visible');
      Velocity(item, "stop");
      Velocity(item, "fadeOut", { duration: 500 });
    }

    show (item) {
      if (item.hasAttribute('data-visible')) return;
      item.setAttribute('data-visible', true);
      item.removeAttribute('data-hidden');
      Velocity(item, "stop");
      Velocity(item, "fadeIn", { duration: 500 });
    }
  }

  new Ads;

})();
