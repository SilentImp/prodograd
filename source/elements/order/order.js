"use strict";
(function() {

  class Order {

    constructor (widget) {

      if ( widget == null ) return;

      this.widget = widget;
      this.contacts = this.widget.querySelector('.facts_order');
      this.toggleContacts = this.toggleContacts.bind(this);

      let show = this.widget.querySelector('.order__show');
      if(show != null) {
        show.addEventListener("click", this.toggleContacts);
      }
      
    }

    toggleContacts (event) {
      let button = event.currentTarget;
      button.classList.toggle('order__show_current');
      this.contacts.classList.toggle('facts_visible');
    }

  }

  let ready = new Promise((resolve, reject) => {
    if (document.readyState != "loading") return resolve();
    document.addEventListener("DOMContentLoaded", () => resolve());
  });
  ready.then(()=>{
    [].forEach.call(document.querySelectorAll('.order'), (order)=>{
      new Order(order);
    });
  });


})();
