"use strict";
(function () {

  class Bookmarks {

    constructor () {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init () {
      let widget = document.querySelector('.bookmarks');
      if (widget == null) return;

      this.widget = widget;
      this.full_price = widget.querySelector('.bookmarks__footer .bookmarks__summary b');
      this.categories = widget.querySelectorAll('.bookmarks__table');
      this.items_title = widget.querySelector('.bookmarks__abstract_items');
      this.categories_title = widget.querySelector('.bookmarks__abstract_categories');
      this.recalculate = this.recalculate.bind(this);
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.remove = this.remove.bind(this);
      this.removeAll = this.removeAll.bind(this);

      let clearit = this.widget.querySelector('.bookmarks__clearit');
      if (clearit == null) {
        return;
      }
      clearit.addEventListener("click", this.removeAll);

      [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_remove'), (button) => {
        button.addEventListener("click", this.remove);
      });

      [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_inc'), (button) => {
        button.addEventListener("click", this.increment);
      });

      [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_dec'), (button) => {
        button.addEventListener("click", this.decrement);
      });

      this.recalculate();
    }

    declOfNum(number, titles) {
      let cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    removeAll (event) {
      let full = this.widget.querySelector('.bookmarks__details_full'),
          empty = this.widget.querySelector('.bookmarks__details_empty');

      Velocity(full, "stop");
      Velocity(full, "fadeOut", {
          duration: 500,
          complete: () => {
            full.parentNode.removeChild(full);
            this.widget.querySelector('.bookmarks__abstract').innerHTML = "Пока нет ни одной закладки";
            Velocity(empty, "stop");
            Velocity(empty, "fadeIn", {duration: 500});
          }
        });
    }

    remove (event) {
      let button = event.currentTarget
        , item = button.closest('tr');

      Velocity(item, "stop");
      Velocity(item, "fadeOut", {
          duration: 500,
          complete: () => {
            let categorie = item.closest('.bookmarks__category');
            item.parentNode.removeChild(item);
            if (categorie.querySelector('.bookmarks__table tbody tr') == null) {
              categorie.parentNode.removeChild(categorie);
            }
            this.recalculate();
          }
        });
    }

    increment (event) {
      let button = event.currentTarget
        , item = button.closest('tr')
        , count = item.querySelector('.bookmarks__count-input')
        , holder = item.querySelector('.bookmarks__count');


      count.value = parseInt(count.value.trim(), 10) + 1;
      holder.innerHTML = count.value;
      this.recalculate();
    }

    decrement (event) {
      let button = event.currentTarget
        , item = button.closest('tr')
        , count = item.querySelector('.bookmarks__count-input')
        , holder = item.querySelector('.bookmarks__count');

      count.value = Math.max(parseInt(count.value.trim(), 10) - 1, 1);
      holder.innerHTML = count.value;
      this.recalculate();
    }

    recalculate () {

      let full_price = 0;

      [].forEach.call(this.categories, (categorie) => {
        let summary = categorie.querySelector('tfoot b')
            , items = categorie.querySelectorAll('tbody tr')
            , value = 0;

        [].forEach.call(items, (item) => {
          let price = parseInt(item.querySelector('.bookmarks__price-input').value.trim(), 10)
              , count = parseInt(item.querySelector('.bookmarks__count-input').value.trim(), 10)
              , summ = item.querySelector('.bookmarks__summ b');
          summ.innerHTML = price*count;
          value += price*count;
        });

        summary.innerHTML = value;
        full_price += value;
      });

      this.full_price.innerHTML = full_price;

      let cats = this.widget.querySelectorAll('.bookmarks__category')
          , items = this.widget.querySelectorAll('.bookmarks__table tbody tr');

      if (cats !== null) {
        cats = cats.length;
      } else {
        cats = 0;
      }

      if (items !== null) {
        items = items.length;
      } else {
        items = 0;
      }

      this.items_title.innerHTML = items + " " + this.declOfNum(items, ['товар', 'товара', 'товаров']) + " ";
      this.categories_title.innerHTML = cats + " " + this.declOfNum(cats, ['категория', 'категории', 'категорий']);
      this.categories_title;
    }

  }

  new Bookmarks;

})();
