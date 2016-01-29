"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Ads = function () {
    function Ads() {
      _classCallCheck(this, Ads);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Ads, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.ads');
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
        [].forEach.call(this.widget.querySelectorAll('.ads__control_remove'), function (button) {

          button.addEventListener("click", _this.preRemove);
        });
        [].forEach.call(this.menu.querySelectorAll('.ads__button'), function (button) {
          button.addEventListener("click", _this.filter);
          if (button.classList.contains('ads__button_current')) {
            _this.current = button;
          }
        });
        [].forEach.call(this.items, function (item) {
          item.setAttribute('data-visible', true);
        });
      }
    }, {
      key: "preRemove",
      value: function preRemove(event) {
        var _this2 = this;

        event.preventDefault();
        var eventWrapper = event;
        new Сonfirm(function () {
          _this2.remove(eventWrapper);
        }, function () {});
      }
    }, {
      key: "remove",
      value: function remove(event) {
        var _this3 = this;

        var button = event.target,
            item = button.closest('.ads__item');

        if (item.hasAttribute('data-hidden')) {
          item.parentNode.removeChild(item);
        } else {
          Velocity(item, "stop");
          Velocity(item, "fadeOut", {
            duration: 500,
            complete: function complete() {
              item.parentNode.removeChild(item);
              [].forEach.call(_this3.categories, function (categorie) {
                if (categorie.querySelector('.ads__item') == null) {
                  categorie.parentNode.removeChild(categorie);
                }
                if (_this3.type != 'all' && categorie.querySelector('.ads__item_' + _this3.type) == null) {
                  _this3.hide(categorie);
                }
              });
              _this3.items = _this3.widget.querySelectorAll('.ads__item');
              _this3.categories = _this3.widget.querySelectorAll('.ads__category');
            }
          });
        }
      }
    }, {
      key: "filter",
      value: function filter(event) {
        var _this4 = this;

        var button = event.currentTarget,
            type = button.getAttribute('data-type');

        this.type = type;

        if (button.classList.contains('ads__button_current')) return;

        if (this.current != null) {
          this.current.classList.remove('ads__button_current');
        }

        this.current = button;
        this.current.classList.add('ads__button_current');

        switch (type) {
          case 'all':
            [].forEach.call(this.categories, function (categorie) {
              _this4.show(categorie);
            });
            [].forEach.call(this.items, function (item) {
              _this4.show(item);
            });
            break;
          default:
            [].forEach.call(this.items, function (item) {
              if (item.classList.contains('ads__item_' + type)) {
                _this4.show(item);
              } else {
                _this4.hide(item);
              }
            });
            [].forEach.call(this.categories, function (categorie) {
              if (categorie.querySelector('.ads__item_' + type) == null) {
                _this4.hide(categorie);
              } else {
                _this4.show(categorie);
              }
            });
            break;
        }
      }
    }, {
      key: "hide",
      value: function hide(item) {
        if (item.hasAttribute('data-hidden')) return;
        item.setAttribute('data-hidden', true);
        item.removeAttribute('data-visible');
        Velocity(item, "stop");
        Velocity(item, "fadeOut", { duration: 500 });
      }
    }, {
      key: "show",
      value: function show(item) {
        if (item.hasAttribute('data-visible')) return;
        item.setAttribute('data-visible', true);
        item.removeAttribute('data-hidden');
        Velocity(item, "stop");
        Velocity(item, "fadeIn", { duration: 500 });
      }
    }]);

    return Ads;
  }();

  new Ads();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Bookmarks = function () {
    function Bookmarks() {
      _classCallCheck(this, Bookmarks);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Bookmarks, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.bookmarks');
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

        var clearit = this.widget.querySelector('.bookmarks__clearit');
        if (clearit == null) {
          return;
        }
        clearit.addEventListener("click", this.removeAll);

        [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_remove'), function (button) {
          button.addEventListener("click", _this.remove);
        });

        [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_inc'), function (button) {
          button.addEventListener("click", _this.increment);
        });

        [].forEach.call(this.widget.querySelectorAll('.bookmarks__control_dec'), function (button) {
          button.addEventListener("click", _this.decrement);
        });

        this.recalculate();
      }
    }, {
      key: "declOfNum",
      value: function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
      }
    }, {
      key: "removeAll",
      value: function removeAll(event) {
        var _this2 = this;

        var full = this.widget.querySelector('.bookmarks__details_full'),
            empty = this.widget.querySelector('.bookmarks__details_empty');

        Velocity(full, "stop");
        Velocity(full, "fadeOut", {
          duration: 500,
          complete: function complete() {
            full.parentNode.removeChild(full);
            _this2.widget.querySelector('.bookmarks__abstract').innerHTML = "Пока нет ни одной закладки";
            Velocity(empty, "stop");
            Velocity(empty, "fadeIn", { duration: 500 });
          }
        });
      }
    }, {
      key: "remove",
      value: function remove(event) {
        var _this3 = this;

        var button = event.currentTarget,
            item = button.closest('tr');

        Velocity(item, "stop");
        Velocity(item, "fadeOut", {
          duration: 500,
          complete: function complete() {
            var categorie = item.closest('.bookmarks__category');
            item.parentNode.removeChild(item);
            if (categorie.querySelector('.bookmarks__table tbody tr') == null) {
              categorie.parentNode.removeChild(categorie);
            }
            _this3.recalculate();
          }
        });
      }
    }, {
      key: "increment",
      value: function increment(event) {
        var button = event.currentTarget,
            item = button.closest('tr'),
            count = item.querySelector('.bookmarks__count-input'),
            holder = item.querySelector('.bookmarks__count');

        count.value = parseInt(count.value.trim(), 10) + 1;
        holder.innerHTML = count.value;
        this.recalculate();
      }
    }, {
      key: "decrement",
      value: function decrement(event) {
        var button = event.currentTarget,
            item = button.closest('tr'),
            count = item.querySelector('.bookmarks__count-input'),
            holder = item.querySelector('.bookmarks__count');

        count.value = Math.max(parseInt(count.value.trim(), 10) - 1, 1);
        holder.innerHTML = count.value;
        this.recalculate();
      }
    }, {
      key: "recalculate",
      value: function recalculate() {

        var full_price = 0;

        [].forEach.call(this.categories, function (categorie) {
          var summary = categorie.querySelector('tfoot b'),
              items = categorie.querySelectorAll('tbody tr'),
              value = 0;

          [].forEach.call(items, function (item) {
            var price = parseInt(item.querySelector('.bookmarks__price-input').value.trim(), 10),
                count = parseInt(item.querySelector('.bookmarks__count-input').value.trim(), 10),
                summ = item.querySelector('.bookmarks__summ b');
            summ.innerHTML = price * count;
            value += price * count;
          });

          summary.innerHTML = value;
          full_price += value;
        });

        this.full_price.innerHTML = full_price;

        var cats = this.widget.querySelectorAll('.bookmarks__category'),
            items = this.widget.querySelectorAll('.bookmarks__table tbody tr');

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
    }]);

    return Bookmarks;
  }();

  new Bookmarks();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Filters = function () {
    function Filters() {
      _classCallCheck(this, Filters);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Filters, [{
      key: "init",
      value: function init() {
        var widget = document.querySelector('.filters');
        if (widget == null) return;

        this.widget = widget;

        var more = this.widget.querySelector('.filters__more'),
            less = this.widget.querySelector('.filters__less');

        this.selects = this.widget.querySelectorAll('select.filters__select');

        this.showMore = this.showMore.bind(this);
        this.showLess = this.showLess.bind(this);
        this.reset = this.reset.bind(this);

        more.addEventListener('click', this.showMore);
        less.addEventListener('click', this.showLess);

        this.widget.addEventListener('reset', this.reset);

        [].forEach.call(this.selects, function (select) {
          $(select).select2({
            placeholder: select.getAttribute('placeholder'),
            allowClear: false,
            minimumResultsForSearch: 20
          });
          $(select).select2("val", "");
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        [].forEach.call(this.selects, function (select) {
          $(select).select2("val", "");
        });
      }
    }, {
      key: "showMore",
      value: function showMore(event) {
        event.preventDefault();
        this.widget.classList.toggle('filters_more', true);
      }
    }, {
      key: "showLess",
      value: function showLess(event) {
        event.preventDefault();
        this.widget.classList.toggle('filters_more', false);
      }
    }]);

    return Filters;
  }();

  new Filters();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Navigation = function () {
    function Navigation() {
      _classCallCheck(this, Navigation);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Navigation, [{
      key: "init",
      value: function init() {
        var button_open = document.querySelector('.header__items');
        if (button_open === null) return;

        var button_close = document.querySelector('.header__close'),
            mobile_switch = document.querySelector('.header__mobile-switch'),
            mobile_switch_close = document.querySelector('.header__mobile-close');

        this.user_submenu = document.querySelector('.header__user');
        this.city_submenu = document.querySelector('.header__city');
        this.navigation = document.querySelector('.header__dropdown_items');
        this.navigation_mobile = document.querySelector('.header__mobile');

        this.onResize = this.onResize.bind(this);
        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.toggleNavigationUser = this.toggleNavigationUser.bind(this);
        this.toggleNavigationCity = this.toggleNavigationCity.bind(this);
        this.toggleNavigationMobile = this.toggleNavigationMobile.bind(this);

        this.user_submenu.addEventListener('click', this.toggleNavigationUser);
        this.city_submenu.addEventListener('click', this.toggleNavigationCity);

        mobile_switch.addEventListener('click', this.toggleNavigationMobile);
        mobile_switch_close.addEventListener('click', this.toggleNavigationMobile);

        button_open.addEventListener('click', this.toggleNavigation);
        button_close.addEventListener('click', this.toggleNavigation);

        window.addEventListener('resize', this.onResize);
      }
    }, {
      key: "onResize",
      value: function onResize() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (w < 1300) return;

        var elements = document.querySelectorAll('.header__user_open, .header__city_open, .header__mobile_open');
        [].forEach.call(elements, function (element) {
          element.classList.toggle('header__user_open', false);
          element.classList.toggle('header__city_open', false);
          element.classList.toggle('header__mobile_open', false);
        });
      }
    }, {
      key: "toggleNavigationUser",
      value: function toggleNavigationUser() {
        this.user_submenu.classList.toggle('header__user_open');
      }
    }, {
      key: "toggleNavigationCity",
      value: function toggleNavigationCity() {
        this.city_submenu.classList.toggle('header__city_open');
      }
    }, {
      key: "toggleNavigationMobile",
      value: function toggleNavigationMobile() {
        this.navigation_mobile.classList.toggle('header__mobile_open');

        this.navigation.classList.toggle('header__dropdown_open', false);
      }
    }, {
      key: "toggleNavigation",
      value: function toggleNavigation() {
        this.navigation.classList.toggle('header__dropdown_open');

        this.navigation_mobile.classList.toggle('header__mobile_open', false);
      }
    }]);

    return Navigation;
  }();

  new Navigation();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var AskForm = function () {
    function AskForm() {
      _classCallCheck(this, AskForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(AskForm, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.form_ask');
        if (widget == null) return;

        this.widget = widget;

        this.show = this.show.bind(this);

        this.widget.addEventListener('submit', this.complete);

        [].forEach.call(document.querySelectorAll('.howto__ask'), function (link) {
          link.addEventListener('click', _this.show);
        });
      }
    }, {
      key: "show",
      value: function show(event) {
        event.preventDefault();
        window.ask_popup.show();
      }
    }, {
      key: "complete",
      value: function complete(event) {
        event.preventDefault();
        window.ask_popup.close();
        window.alert_popup.setTitle('Принято!');
        window.alert_popup.setText('Мы ответим так быстро, как только сможем. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
        window.alert_popup.show();
      }
    }]);

    return AskForm;
  }();

  new AskForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ContactsForm = function () {
    function ContactsForm() {
      _classCallCheck(this, ContactsForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(ContactsForm, [{
      key: "init",
      value: function init() {
        var widget = document.querySelector('.form_contacts');
        if (widget == null) return;

        this.widget = widget;
        this.address = document.querySelector('.form__input[name="address"]');
        this.lat = document.querySelector('.form__lat');
        this.lng = document.querySelector('.form__lng');
        this.box = document.querySelector('.form__geolocation-box');
        this.geocode = this.geocode.bind(this);
        this.locationFound = this.locationFound.bind(this);
        this.savePosition = this.savePosition.bind(this);
        this.image = {
          url: 'images/marker.svg',
          size: new google.maps.Size(40, 53),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 53)
        };
        this.marker = null;
        this.geocoder = new google.maps.Geocoder();
        this.address.addEventListener('change', this.geocode);
        this.map = new google.maps.Map(document.querySelector('.form__map'), {
          disableDefaultUI: false,
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          scaleControl: false,
          center: {
            lat: -34.397,
            lng: 150.644
          },
          zoom: 14
        });
      }
    }, {
      key: "geocode",
      value: function geocode() {
        this.geocoder.geocode({ 'address': this.address.value.trim() }, this.locationFound);
      }
    }, {
      key: "locationFound",
      value: function locationFound(results, status) {

        if (status !== google.maps.GeocoderStatus.OK) {
          console.log('Geocode was not successful for the following reason: ' + status);
          return;
        }

        this.box.classList.remove('form__geolocation-box');
        this.map.setCenter(results[0].geometry.location);

        if (this.marker != null) {
          this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
          map: this.map,
          draggable: true,
          icon: this.image,
          animation: google.maps.Animation.DROP,
          position: results[0].geometry.location
        });

        this.marker.addListener('dragend', this.savePosition);
        this.savePosition();
      }
    }, {
      key: "savePosition",
      value: function savePosition() {
        this.lat.value = this.marker.getPosition().lat();
        this.lng.value = this.marker.getPosition().lng();
        this.map.setZoom(14);
      }
    }]);

    return ContactsForm;
  }();

  new ContactsForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var FeedbackForm = function () {
    function FeedbackForm() {
      _classCallCheck(this, FeedbackForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(FeedbackForm, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.form_feedback');
        if (widget == null) return;

        this.widget = widget;

        this.show = this.show.bind(this);

        this.widget.addEventListener('submit', this.complete);

        [].forEach.call(document.querySelectorAll('.hints__contact-us'), function (link) {
          link.addEventListener('click', _this.show);
        });
      }
    }, {
      key: "show",
      value: function show(event) {
        event.preventDefault();
        window.feedback_popup.show();
      }
    }, {
      key: "complete",
      value: function complete(event) {
        event.preventDefault();
        window.feedback_popup.close();
        window.alert_popup.setTitle('Принято!');
        window.alert_popup.setText('Мы ответим так быстро, как только сможем. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
        window.alert_popup.show();
      }
    }]);

    return FeedbackForm;
  }();

  new FeedbackForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ItemForm = function () {
    function ItemForm() {
      _classCallCheck(this, ItemForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(ItemForm, [{
      key: "init",
      value: function init() {
        var widget = document.querySelector('.form_items');
        if (widget == null) return;

        this.widget = widget;
        this.selects = document.querySelectorAll('.form__select');

        [].forEach.call(this.selects, function (select) {
          $(select).select2({
            placeholder: select.getAttribute('placeholder'),
            allowClear: false,
            language: "ru",
            minimumResultsForSearch: 20
          });
          $(select).select2("val", "");
        });

        this.wrapper = document.querySelector('.form__photos');
        this.upload_button = document.querySelector('.form__photos-add');

        this.removePhoto = this.removePhoto.bind(this);

        this.uploader = new plupload.Uploader({
          browse_button: this.upload_button,
          flash_swf_url: 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf',
          silverlight_xap_url: 'http://rawgithub.com/moxiecode/moxie/master/bin/silverlight/Moxie.cdn.xap',
          max_file_size: '5mb',
          container: this.wrapper,
          drop_element: this.wrapper,
          filters: [{ title: "Image files", extensions: "jpg,gif,png" }],
          views: {
            list: true,
            thumbs: true,
            active: 'thumbs'
          },
          url: 'upload.php'
        });
        this.photoAdded = this.photoAdded.bind(this);
        this.uploader.bind('FilesAdded', this.photoAdded);
        this.uploader.init();
        this.complete = this.complete.bind(this);
        this.widget.addEventListener('submit', this.complete);
      }
    }, {
      key: "complete",
      value: function complete(event) {
        this.uploader.start();
      }
    }, {
      key: "removePhoto",
      value: function removePhoto(event) {
        var button = event.currentTarget,
            wrapper = button.parentNode,
            id = wrapper.getAttribute('id');

        this.uploader.removeFile(id);
        wrapper.parentNode.removeChild(wrapper);
      }
    }, {
      key: "photoAdded",
      value: function photoAdded(up, files) {
        var photos = this.wrapper,
            removePhoto = this.removePhoto,
            upload_button = this.upload_button;

        plupload.each(files, function (file) {

          var wrapper = document.createElement('P'),
              button = document.createElement('BUTTON');

          wrapper.setAttribute('id', file.id);
          wrapper.setAttribute('data-name', file.name);
          wrapper.className = 'form__photo';

          button.setAttribute('type', 'button');
          button.className = 'form__photo-remove';
          button.addEventListener('click', removePhoto);

          wrapper.appendChild(button);

          var img = new o.Image();
          img.onload = function (file) {
            this.embed(wrapper, {
              width: 180,
              height: 180,
              crop: true
            });
          };
          img.load(file.getSource());
          photos.insertBefore(wrapper, upload_button);
        });
      }
    }]);

    return ItemForm;
  }();

  new ItemForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ManufacturerForm = function () {
    function ManufacturerForm() {
      _classCallCheck(this, ManufacturerForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(ManufacturerForm, [{
      key: "recount",
      value: function recount(event) {

        var box_count = 0;

        [].forEach.call(this.group_list_boxs, function (box) {
          if (box.checked) {
            box_count++;
          }
        });

        if (box_count >= 3) {
          [].forEach.call(this.group_list_boxs, function (box) {
            if (!box.checked) {
              box.setAttribute('disabled', 'disabled');
            }
          });
        } else {
          [].forEach.call(this.group_list_boxs, function (box) {
            if (box.hasAttribute('disabled')) {
              box.removeAttribute('disabled', 'disabled');
            }
          });
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.form_manufacturer');
        if (widget == null) return;
        this.widget = widget;

        this.recount = this.recount.bind(this);
        this.group_list = this.widget.querySelector('.form__radio-group_list');
        this.group_list_boxs = this.group_list.querySelectorAll('input');
        [].forEach.call(this.group_list_boxs, function (box) {
          box.addEventListener('change', _this.recount);
        });

        this.selects = this.widget.querySelectorAll('.form__select');
        [].forEach.call(this.selects, function (select) {
          $(select).select2({
            placeholder: select.getAttribute('placeholder'),
            allowClear: false,
            language: "ru",
            minimumResultsForSearch: 20
          });
          $(select).select2("val", "");
        });

        this.wrapper = this.widget.querySelector('.form__photos');
        this.upload_button = this.widget.querySelector('.form__photos-add');

        this.removePhoto = this.removePhoto.bind(this);

        this.uploader = new plupload.Uploader({
          browse_button: this.upload_button,
          flash_swf_url: 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf',
          silverlight_xap_url: 'http://rawgithub.com/moxiecode/moxie/master/bin/silverlight/Moxie.cdn.xap',
          max_file_size: '5mb',
          container: this.wrapper,
          drop_element: this.wrapper,
          filters: [{ title: "Image files", extensions: "jpg,gif,png" }],
          views: {
            list: true,
            thumbs: true,
            active: 'thumbs'
          },
          url: 'upload.php'
        });
        this.photoAdded = this.photoAdded.bind(this);
        this.uploader.bind('FilesAdded', this.photoAdded);
        this.uploader.init();
        this.complete = this.complete.bind(this);
        this.widget.addEventListener('submit', this.complete);
      }
    }, {
      key: "complete",
      value: function complete(event) {
        this.uploader.start();
      }
    }, {
      key: "removePhoto",
      value: function removePhoto(event) {
        var button = event.currentTarget,
            wrapper = button.parentNode,
            id = wrapper.getAttribute('id');

        this.uploader.removeFile(id);
        wrapper.parentNode.removeChild(wrapper);
      }
    }, {
      key: "photoAdded",
      value: function photoAdded(up, files) {
        var photos = this.wrapper,
            removePhoto = this.removePhoto,
            upload_button = this.upload_button;

        plupload.each(files, function (file) {

          var wrapper = document.createElement('P'),
              button = document.createElement('BUTTON');

          wrapper.setAttribute('id', file.id);
          wrapper.setAttribute('data-name', file.name);
          wrapper.className = 'form__photo';

          button.setAttribute('type', 'button');
          button.className = 'form__photo-remove';
          button.addEventListener('click', removePhoto);

          wrapper.appendChild(button);

          var img = new o.Image();
          img.onload = function (file) {
            this.embed(wrapper, {
              width: 180,
              height: 180,
              crop: true
            });
          };
          img.load(file.getSource());
          photos.insertBefore(wrapper, upload_button);
        });
      }
    }]);

    return ManufacturerForm;
  }();

  new ManufacturerForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var RecoveryForm = function () {
    function RecoveryForm() {
      _classCallCheck(this, RecoveryForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(RecoveryForm, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.form_recovery');
        if (widget == null) return;

        this.widget = widget;

        this.show = this.show.bind(this);

        this.widget.addEventListener('submit', this.complete);

        [].forEach.call(document.querySelectorAll('.recovery-link'), function (link) {
          link.addEventListener('click', _this.show);
        });
      }
    }, {
      key: "show",
      value: function show(event) {
        event.preventDefault();
        window.recovery_popup.show();
      }
    }, {
      key: "complete",
      value: function complete(event) {
        event.preventDefault();
        window.recovery_popup.close();
        window.alert_popup.setTitle('Allons-y!');
        window.alert_popup.setText('К вам уже летит наше письмо с супер-секретныой ссылочкой, нажмите на неё в нем, что бы восстановить пароль.');
        window.alert_popup.show();
      }
    }]);

    return RecoveryForm;
  }();

  new RecoveryForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var RegisterForm = function () {
    function RegisterForm() {
      _classCallCheck(this, RegisterForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(RegisterForm, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.form_register');
        if (widget == null) return;

        this.widget = widget;

        this.show = this.show.bind(this);
        this.complete = this.complete.bind(this);
        this.widget.addEventListener('submit', this.complete);

        this.password = this.widget.querySelector('input[name="password"]');
        this.confirmation = this.widget.querySelector('input[name="password_confirmation"]');

        [].forEach.call(document.querySelectorAll('.register-link'), function (link) {
          link.addEventListener('click', _this.show);
        });
      }
    }, {
      key: "show",
      value: function show(event) {
        event.preventDefault();
        window.register_popup.show();
      }
    }, {
      key: "complete",
      value: function complete(event) {
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
    }]);

    return RegisterForm;
  }();

  new RegisterForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var DislikeForm = function () {
    function DislikeForm() {
      _classCallCheck(this, DislikeForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(DislikeForm, [{
      key: "init",
      value: function init() {
        var widget = document.querySelector('.form_dislike');
        if (widget == null) return;

        this.widget = widget;
        this.complete = this.complete.bind(this);
        this.widget.addEventListener('submit', this.complete);
      }
    }, {
      key: "complete",
      value: function complete(event) {
        event.preventDefault();

        window.dislike_popup.close();
        window.alert_popup.setTitle('Принято!');
        window.alert_popup.setText('Спасибо, что поделились мнением. Мы разберёмся с проблемой. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
        window.alert_popup.show();
      }
    }]);

    return DislikeForm;
  }();

  new DislikeForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var LikeForm = function () {
    function LikeForm() {
      _classCallCheck(this, LikeForm);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(LikeForm, [{
      key: "init",
      value: function init() {
        var widget = document.querySelector('.form_like');
        if (widget == null) return;

        this.widget = widget;
        this.complete = this.complete.bind(this);
        this.widget.addEventListener('submit', this.complete);
        this.widget.querySelector('.form__button_like').addEventListener('click', this.complete);
      }
    }, {
      key: "complete",
      value: function complete(event) {
        event.preventDefault();

        window.like_popup.close();
        window.alert_popup.setTitle('Принято!');
        window.alert_popup.setText('Спасибо, что поделились мнением. Телефон поддержки: <a href="tel:+8800800800">8 (800) 800 800</a>.');
        window.alert_popup.show();
      }
    }]);

    return LikeForm;
  }();

  new LikeForm();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Order = function () {
    function Order(widget) {
      _classCallCheck(this, Order);

      if (widget == null) return;

      this.widget = widget;
      this.contacts = this.widget.querySelector('.facts_order');
      this.toggleContacts = this.toggleContacts.bind(this);

      var show = this.widget.querySelector('.order__show');
      if (show != null) {
        show.addEventListener("click", this.toggleContacts);
      }
    }

    _createClass(Order, [{
      key: 'toggleContacts',
      value: function toggleContacts(event) {
        var button = event.currentTarget;
        button.classList.toggle('order__show_current');
        this.contacts.classList.toggle('facts_visible');
      }
    }]);

    return Order;
  }();

  var ready = new Promise(function (resolve, reject) {
    if (document.readyState != "loading") return resolve();
    document.addEventListener("DOMContentLoaded", function () {
      return resolve();
    });
  });
  ready.then(function () {
    [].forEach.call(document.querySelectorAll('.order'), function (order) {
      new Order(order);
    });
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var OrderCreate = function () {
    function OrderCreate() {
      _classCallCheck(this, OrderCreate);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(OrderCreate, [{
      key: "init",
      value: function init() {
        var form = document.querySelector('.order-create');
        if (form === null) return;

        this.widget = form;
        [].forEach.call(form.querySelectorAll('.order-create__select'), function (select) {
          $(select).select2({
            placeholder: select.getAttribute('placeholder'),
            allowClear: false,
            minimumResultsForSearch: 20
          });
          $(select).select2("val", "");
        });
      }
    }]);

    return OrderCreate;
  }();

  new OrderCreate();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var OrderEdit = function () {
    function OrderEdit() {
      _classCallCheck(this, OrderEdit);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(OrderEdit, [{
      key: "init",
      value: function init() {
        var form = document.querySelector('.order-edit');
        if (form === null) return;

        this.widget = form;
        this.reset = this.reset.bind(this);
        this.selects = form.querySelectorAll('.order-edit__select');

        this.widget.querySelector('.order-edit__reset').addEventListener("click", this.reset);

        [].forEach.call(this.selects, function (select) {
          $(select).select2({
            placeholder: select.getAttribute('placeholder'),
            allowClear: false,
            minimumResultsForSearch: 20
          });
          $(select).select2("val", "");
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        [].forEach.call(this.selects, function (select) {
          $(select).select2("val", "");
        });
      }
    }]);

    return OrderEdit;
  }();

  new OrderEdit();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Popup = function () {
    function Popup(popup) {
      var _this = this;

      _classCallCheck(this, Popup);

      if (popup == null) return;
      this.popup = popup;

      this.close = this.close.bind(this);
      this.show = this.show.bind(this);
      this.onresize = this.onresize.bind(this);

      this.lightbox = document.querySelector('.popup-lightbox');
      this.lightbox.addEventListener("click", this.close);

      var close_buttons = this.popup.querySelectorAll('.popup__close');
      [].forEach.call(close_buttons, function (button) {
        button.addEventListener("click", _this.close);
      });

      window.addEventListener("resize", this.onresize);
    }

    _createClass(Popup, [{
      key: "onresize",
      value: function onresize() {
        if (this.popup.offsetHeight > Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 40) {
          window.localStorage.setItem('popupscroll', document.body.scrollTop);
          this.popup.classList.toggle('popup_unfixed', true);
          document.body.classList.toggle('popedup', true);
          document.body.style.height = this.popup.offsetHeight + 40 + "px";
          window.scroll(0, 0);
        } else {
          this.popup.classList.toggle('popup_unfixed', false);
          document.body.classList.toggle('popedup', false);
          document.body.removeAttribute('style');
          if (window.localStorage.getItem('popupscroll') != null) {
            window.scroll(0, parseInt(window.localStorage.getItem('popupscroll'), 10));
          }
        }
      }
    }, {
      key: "show",
      value: function show() {
        var _this2 = this;

        Velocity(this.popup, "stop");
        Velocity(this.lightbox, "stop");
        Velocity(this.popup, "fadeIn", {
          duration: 250,
          complete: function complete() {
            _this2.onresize();
          }
        });
        Velocity(this.lightbox, "fadeIn", { duration: 250 });
      }
    }, {
      key: "close",
      value: function close() {
        Velocity(this.popup, "stop");
        Velocity(this.lightbox, "stop");
        Velocity(this.popup, "fadeOut", { duration: 250 });
        Velocity(this.lightbox, "fadeOut", { duration: 250 });
        document.body.classList.toggle('popedup', false);
        document.body.removeAttribute('style');
        if (window.localStorage.getItem('popupscroll') != null) {
          window.scroll(0, parseInt(window.localStorage.getItem('popupscroll'), 10));
        }
      }
    }]);

    return Popup;
  }();

  var Alert = function (_Popup) {
    _inherits(Alert, _Popup);

    function Alert() {
      var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var text = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

      _classCallCheck(this, Alert);

      var popup = document.querySelector('.popup_alert');
      if (popup == null) return _possibleConstructorReturn(_this3);

      var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Alert).call(this, popup));

      if (title.trim().length > 0) {
        _this3.popup.querySelector('.popup__title').innerHTML = title;
      }
      if (text.trim().length > 0) {
        _this3.popup.querySelector('.popup__text').innerHTML = text;
      }
      return _this3;
    }

    _createClass(Alert, [{
      key: "setTitle",
      value: function setTitle() {
        var title = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        if (title.trim().length > 0) {
          this.popup.querySelector('.popup__title').innerHTML = title;
        }
      }
    }, {
      key: "setText",
      value: function setText() {
        var text = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

        if (text.trim().length > 0) {
          this.popup.querySelector('.popup__text').innerHTML = text;
        }
      }
    }]);

    return Alert;
  }(Popup);

  var Recovery = function (_Popup2) {
    _inherits(Recovery, _Popup2);

    function Recovery() {
      _classCallCheck(this, Recovery);

      var popup = document.querySelector('.popup_recovery');
      if (popup == null) return _possibleConstructorReturn(_this4);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Recovery).call(this, popup));
    }

    return Recovery;
  }(Popup);

  var Feedback = function (_Popup3) {
    _inherits(Feedback, _Popup3);

    function Feedback() {
      _classCallCheck(this, Feedback);

      var popup = document.querySelector('.popup_feedback');
      if (popup == null) return _possibleConstructorReturn(_this5);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Feedback).call(this, popup));
    }

    return Feedback;
  }(Popup);

  var Ask = function (_Popup4) {
    _inherits(Ask, _Popup4);

    function Ask() {
      _classCallCheck(this, Ask);

      var popup = document.querySelector('.popup_ask');
      if (popup == null) return _possibleConstructorReturn(_this6);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Ask).call(this, popup));
    }

    return Ask;
  }(Popup);

  var Register = function (_Popup5) {
    _inherits(Register, _Popup5);

    function Register() {
      _classCallCheck(this, Register);

      var popup = document.querySelector('.popup_register');
      if (popup == null) return _possibleConstructorReturn(_this7);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Register).call(this, popup));
    }

    return Register;
  }(Popup);

  var Like = function (_Popup6) {
    _inherits(Like, _Popup6);

    function Like() {
      _classCallCheck(this, Like);

      var popup = document.querySelector('.popup_like');
      if (popup == null) return _possibleConstructorReturn(_this8);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Like).call(this, popup));
    }

    return Like;
  }(Popup);

  var Dislike = function (_Popup7) {
    _inherits(Dislike, _Popup7);

    function Dislike() {
      _classCallCheck(this, Dislike);

      var popup = document.querySelector('.popup_dislike');
      if (popup == null) return _possibleConstructorReturn(_this9);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Dislike).call(this, popup));
    }

    return Dislike;
  }(Popup);

  var Сonfirm = function (_Popup8) {
    _inherits(Сonfirm, _Popup8);

    function Сonfirm(success, fail) {
      _classCallCheck(this, Сonfirm);

      var popup = document.querySelector('.popup_confirm');
      if (popup == null) return _possibleConstructorReturn(_this10);

      var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(Сonfirm).call(this, popup));

      _this10.confirm_function = new Promise(function (resolve, reject) {
        _this10.popup.querySelector('.popup__accept').addEventListener('click', function () {
          resolve();
          _this10.close();
        });
        _this10.popup.querySelector('.popup__reject').addEventListener('click', function () {
          reject();
          _this10.close();
        });
      });

      _this10.confirm_function.then(success, fail);
      _this10.show();
      return _this10;
    }

    return Сonfirm;
  }(Popup);

  var ready = new Promise(function (resolve, reject) {
    if (document.readyState != "loading") return resolve();
    document.addEventListener("DOMContentLoaded", function () {
      return resolve();
    });
  });
  ready.then(function () {
    window.alert_popup = new Alert();
    window.recovery_popup = new Recovery();
    window.feedback_popup = new Feedback();
    window.ask_popup = new Ask();
    window.register_popup = new Register();

    window.like_popup = new Like();
    window.dislike_popup = new Dislike();

    window.Сonfirm = Сonfirm;
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var ProfileManufacturer = function () {
    function ProfileManufacturer() {
      _classCallCheck(this, ProfileManufacturer);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(ProfileManufacturer, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.profile_manufacture');
        if (widget === null) return;

        this.open = this.open.bind(this);

        this.widget = widget;
        [].forEach.call(widget.querySelectorAll('.profile__tab-button'), function (button) {
          button.addEventListener("click", _this.open);
        });

        this.current_button = widget.querySelector('.profile__tab-button_current');
        this.current_tab = widget.querySelector('.tab_current');
      }
    }, {
      key: "open",
      value: function open(event) {
        var button = event.currentTarget,
            tab = this.widget.querySelector('.tab[data-tab="' + button.getAttribute('data-target') + '"]');

        this.current_button.classList.toggle('profile__tab-button_current', false);
        this.current_tab.classList.toggle('tab_current', false);

        this.current_button = button;
        this.current_tab = tab;

        this.current_button.classList.toggle('profile__tab-button_current', true);
        this.current_tab.classList.toggle('tab_current', true);
      }
    }]);

    return ProfileManufacturer;
  }();

  new ProfileManufacturer();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Purchases = function () {
    function Purchases() {
      _classCallCheck(this, Purchases);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Purchases, [{
      key: "init",
      value: function init() {
        var purchases = document.querySelector('.purchases__list');
        if (purchases === null) return;
        $(purchases).isotope({
          itemSelector: '.item',
          layoutMode: 'packery',
          packery: {
            gutter: 0
          }
        });
      }
    }]);

    return Purchases;
  }();

  new Purchases();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Rate = function () {
    function Rate() {
      _classCallCheck(this, Rate);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Rate, [{
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.rate');
        if (widget === null) return;

        this.vote = this.vote.bind(this);

        this.widget = widget;
        [].forEach.call(widget.querySelectorAll('.rate__action'), function (button) {
          button.addEventListener('click', _this.vote);
        });
      }
    }, {
      key: "vote",
      value: function vote(event) {
        event.preventDefault();
        if (event.currentTarget.classList.contains('rate__like')) {
          window.like_popup.show();
        } else {
          window.dislike_popup.show();
        }
      }
    }]);

    return Rate;
  }();

  new Rate();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Question = function () {
    function Question() {
      _classCallCheck(this, Question);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Question, [{
      key: "scrollTo",
      value: function scrollTo(event) {
        var link = event.currentTarget;
        Velocity(document.querySelector(event.currentTarget.getAttribute('href')), "scroll", {
          duration: 500
        });
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        var widget = document.querySelector('.howto__questions');
        if (widget === null) return;

        this.scrollTo = this.scrollTo.bind(this);

        this.widget = widget;
        [].forEach.call(widget.querySelectorAll('.question__link'), function (link) {
          link.addEventListener("click", _this.scrollTo);
        });
      }
    }]);

    return Question;
  }();

  new Question();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Sliders = function () {
    function Sliders() {
      _classCallCheck(this, Sliders);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Sliders, [{
      key: "init",
      value: function init() {
        var view = document.querySelector('.sliders__slider_view'),
            previews = document.querySelector('.sliders__slider_preview');

        if (view === null || previews === null) return;

        $(view).slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          fade: true,
          asNavFor: previews
        });
        $(previews).slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: view,
          dots: false,
          arrows: false,
          centerMode: false,
          focusOnSelect: true,
          variableWidth: true
        });
      }
    }]);

    return Sliders;
  }();

  new Sliders();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Sort = function () {
    function Sort() {
      _classCallCheck(this, Sort);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Sort, [{
      key: "init",
      value: function init() {
        var _this = this;

        var sort = document.querySelector('.sort');
        if (sort === null) return;

        this.widget = sort;
        var buttons = this.widget.querySelectorAll('.sort__button');
        this.current = this.widget.querySelector('.sort__button_current');

        [].forEach.call(buttons, function (button) {
          button.addEventListener("click", _this.sortIt.bind(_this));
        });
      }
    }, {
      key: "sortIt",
      value: function sortIt(event) {

        if (!event.currentTarget.classList.contains('sort__button_current')) {

          this.current.classList.remove('sort__button_current');
          this.current.classList.remove('sort__button_forward');
          this.current.classList.remove('sort__button_backward');

          this.current = event.currentTarget;

          this.current.classList.add('sort__button_current');
          this.current.classList.add('sort__button_forward');
        } else {
          this.current.classList.toggle('sort__button_forward');
          this.current.classList.toggle('sort__button_backward');
        }
      }
    }]);

    return Sort;
  }();

  new Sort();
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Stores = function () {
    function Stores() {
      _classCallCheck(this, Stores);

      var ready = new Promise(function (resolve, reject) {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", function () {
          return resolve();
        });
      });
      ready.then(this.init.bind(this));
    }

    _createClass(Stores, [{
      key: "init",
      value: function init() {
        var map = document.querySelector('.stores__map'),
            wrapper = document.querySelector('.stores__wrapper');
        if (map === null) return;
        this.wrapper = wrapper;
        this.inner = document.querySelector('.stores__inner');

        var url = wrapper.getAttribute('data-url');
        this.map_holder = map;
        this.map = new google.maps.Map(this.map_holder, {
          disableDefaultUI: false,
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          scaleControl: false,
          center: {
            lat: -34.397,
            lng: 150.644
          },
          zoom: 12
        });

        var DONE = 4,
            OK = 200,
            xhr = new XMLHttpRequest(),
            loaded = new Promise(function (resolve, reject) {
          xhr.open('GET', url);
          xhr.send();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === DONE) {
              if (xhr.status === OK) {
                resolve(xhr.responseText);
              } else {
                reject({
                  code: parseInt(xhr.status, 10),
                  message: xhr.statusText
                });
              }
            }
          };
        });

        loaded.then(this.pointsList.bind(this)).catch(this.showErrorMessage.bind(this));

        this.startResample = this.startResample.bind(this);
        this.stopResample = this.stopResample.bind(this);
        this.resample = this.resample.bind(this);
        this.resampling = false;
        window.addEventListener('resize', this.startResample);
        window.addEventListener('scroll', this.startResample);
        this.resample();
      }
    }, {
      key: "getOffset",
      value: function getOffset(element) {
        var top = 0;
        do {
          top += element.offsetTop || 0;
          element = element.offsetParent;
        } while (element);

        return top;
      }
    }, {
      key: "startResample",
      value: function startResample() {
        if (typeof this.timer != 'undefined') {
          clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(this.stopResample, 250);
        if (this.resampling == true) {
          return;
        }
        this.resampling = true;
        window.requestAnimationFrame(this.resample);
      }
    }, {
      key: "stopResample",
      value: function stopResample() {
        this.resampling = false;
      }
    }, {
      key: "resample",
      value: function resample() {

        if (this.inner != null) {
          var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
              h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
              scroll = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0),
              top = this.getOffset(this.wrapper);

          if (w > 1300 && top <= scroll && this.wrapper.offsetHeight > h) {
            this.inner.classList.toggle('stores__inner_fixed', true);

            if (scroll + h >= top + this.wrapper.offsetHeight) {
              this.inner.classList.toggle('stores__inner_fixed_bottom', true);
            } else {
              this.inner.classList.toggle('stores__inner_fixed_bottom', false);
            }
          } else {
            this.inner.classList.toggle('stores__inner_fixed', false);
            this.inner.classList.toggle('stores__inner_fixed_bottom', false);
          }
        }

        this.map.fitBounds(this.bounds);

        if (this.resampling == true) {
          window.requestAnimationFrame(this.resample);
        }
      }
    }, {
      key: "pointsList",
      value: function pointsList(responce) {
        var _this = this;

        this.bounds = new google.maps.LatLngBounds();

        var infowindow = undefined,
            marker = undefined,
            red_marker = {
          path: 'M32.000,37.000 L21.000,53.000 L20.000,53.000 L8.000,37.000 C8.000,37.000 0.000,25.603 0.000,20.000 C0.000,8.954 8.954,-0.000 20.000,-0.000 C31.046,-0.000 40.000,8.954 40.000,20.000 C40.000,26.025 32.000,37.000 32.000,37.000 ZM20.000,13.000 C16.686,13.000 14.000,15.686 14.000,19.000 C14.000,22.314 16.686,25.000 20.000,25.000 C23.314,25.000 26.000,22.314 26.000,19.000 C26.000,15.686 23.314,13.000 20.000,13.000 Z',
          fillColor: '#ff4924',
          fillOpacity: 1,
          fillRule: 'evenodd',
          strokeWeight: 0,
          scale: 1,
          size: new google.maps.Size(40, 53),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 53)
        };

        responce = JSON.parse(responce);
        responce.forEach(function (office) {

          var latLng = new google.maps.LatLng({
            lat: office.lat,
            lng: office.lng
          });

          marker = new google.maps.Marker({
            position: latLng,
            map: _this.map,
            title: office.address,
            icon: red_marker
          });

          google.maps.event.addListener(marker, "click", function (marker) {

            if (marker.open === true) {
              return;
            }
            marker.open = true;

            var infowindow = new InfoBox({
              marker: marker,
              latlng: marker.getPosition(),
              map: this.map,
              content: office.address,
              dy: -35
            });
          }.bind(_this, marker));

          _this.bounds.extend(latLng);
        });

        if (responce.length > 1) {
          this.map.fitBounds(this.bounds);
        } else {
          this.map.setCenter(new google.maps.LatLng({
            lat: responce[0].lat,
            lng: responce[0].lng
          }));
          this.map.setZoom(14);
          google.maps.event.trigger(marker, "click");
        }
      }
    }, {
      key: "showErrorMessage",
      value: function showErrorMessage(error) {
        console.log(error);
      }
    }]);

    return Stores;
  }();

  new Stores();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkcy9hZHMuanMiLCJib29rbWFya3MvYm9va21hcmtzLmpzIiwiZmlsdGVycy9maWx0ZXJzLmpzIiwiaGVhZGVyL2hlYWRlci5qcyIsImZvcm0vZm9ybV9hc2suanMiLCJmb3JtL2Zvcm1fY29udGFjdHMuanMiLCJmb3JtL2Zvcm1fZmVlZGJhY2suanMiLCJmb3JtL2Zvcm1faXRlbXMuanMiLCJmb3JtL2Zvcm1fbWFudWZhY3R1cmVyLmpzIiwiZm9ybS9mb3JtX3JlY292ZXJ5LmpzIiwiZm9ybS9mb3JtX3JlZ2lzdGVyLmpzIiwiZm9ybS9mb3JtX3Jlc3BvbmNlX2Rpc2xpa2UuanMiLCJmb3JtL2Zvcm1fcmVzcG9uY2VfbGlrZS5qcyIsIm9yZGVyL29yZGVyLmpzIiwib3JkZXJfY3JlYXRlL29yZGVyX2NyZWF0ZS5qcyIsIm9yZGVyX2VkaXQvb3JkZXJfZWRpdC5qcyIsInBvcHVwL3BvcHVwLmpzIiwicHJvZmlsZS9wcm9maWxlX19tYW51ZmFjdHVyZS5qcyIsInB1cmNoYXNlcy9wdXJjaGFzZXMuanMiLCJyYXRlL3JhdGUuanMiLCJxdWVzdGlvbi9xdWVzdGlvbi5qcyIsInNsaWRlcnMvc2xpZGVycy5qcyIsInNvcnQvc29ydC5qcyIsInN0b3Jlcy9zdG9yZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUNBLENBQUMsWUFBWTtNQUVMO0FBRUosYUFGSSxHQUVKLEdBQWU7NEJBRlgsS0FFVzs7QUFDYixVQUFJLFFBQVEsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUMzQyxZQUFJLFNBQVMsVUFBVCxJQUF1QixTQUF2QixFQUFrQyxPQUFPLFNBQVAsQ0FBdEM7QUFDQSxpQkFBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEM7aUJBQU07U0FBTixDQUE5QyxDQUYyQztPQUFyQixDQUFwQixDQURTO0FBS2IsWUFBTSxJQUFOLENBQVcsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWYsQ0FBWCxF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O1dBQWpCLENBZTdDLElBZjZDLFFBZWxDLE1BZmtDLENBQS9DLEVBZHlCOztBQStCM0IsZ0JBQUssTUFBTCxDQUFZLE1BQVosQ0FBbUIsTUFBbkIsRUEvQjJCO1NBQVosQ0FBakIsQ0FuQm1COztBQXFEbkIsWUFBSSxTQUFTLE1BQVQsR0FBa0IsQ0FBbEIsRUFBcUI7QUFDdkIsZUFBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixLQUFLLE1BQUwsQ0FBbkIsQ0FEdUI7U0FBekIsTUFFTTtBQUNKLGVBQUssR0FBTCxDQUFTLFNBQVQsQ0FBbUIsSUFBSSxPQUFPLElBQVAsQ0FBWSxNQUFaLENBQW1CO0FBQ3RDLGlCQUFLLFNBQVMsQ0FBVCxFQUFZLEdBQVo7QUFDTCxpQkFBSyxTQUFTLENBQVQsRUFBWSxHQUFaO1dBRlUsQ0FBbkIsRUFESTtBQUtKLGVBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsRUFBakIsRUFMSTtBQU1KLGlCQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLE9BQWxCLENBQTBCLE1BQTFCLEVBQWtDLE9BQWxDLEVBTkk7U0FGTjs7Ozt1Q0FhZSxPQUFPO0FBQ3RCLGdCQUFRLEdBQVIsQ0FBWSxLQUFaLEVBRHNCOzs7O1dBaE1wQjtNQUZJOztBQXdNVixNQUFJLE1BQUosR0F4TVU7Q0FBWCxDQUFEIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbiAoKSB7XG5cbiAgY2xhc3MgQWRzIHtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZHMnKTtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIHRoaXMubWVudSA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5hZHNfX2ZpbHRlcicpO1xuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZHNfX2l0ZW0nKTtcbiAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZHNfX2NhdGVnb3J5Jyk7XG5cbiAgICAgIHRoaXMuZmlsdGVyID0gdGhpcy5maWx0ZXIuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucmVtb3ZlID0gdGhpcy5yZW1vdmUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucHJlUmVtb3ZlID0gdGhpcy5wcmVSZW1vdmUuYmluZCh0aGlzKTtcblxuICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMudHlwZSA9ICdhbGwnO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZHNfX2NvbnRyb2xfcmVtb3ZlJyksIChidXR0b24pID0+IHtcblxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucHJlUmVtb3ZlKTtcblxuXG4gICAgICB9KTtcbiAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLm1lbnUucXVlcnlTZWxlY3RvckFsbCgnLmFkc19fYnV0dG9uJyksIChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmZpbHRlcik7XG4gICAgICAgIGlmKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2Fkc19fYnV0dG9uX2N1cnJlbnQnKSl7XG4gICAgICAgICAgdGhpcy5jdXJyZW50ID0gYnV0dG9uO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLml0ZW1zLCAoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwcmVSZW1vdmUgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGV2ZW50V3JhcHBlciA9IGV2ZW50O1xuICAgICAgbmV3INChb25maXJtKCgpPT57XG4gICAgICAgIHRoaXMucmVtb3ZlKGV2ZW50V3JhcHBlcik7XG4gICAgICB9LCAoKT0+e1xuICAgICAgICBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZSAoZXZlbnQpIHtcbiAgICAgIGxldCBidXR0b24gPSBldmVudC50YXJnZXRcbiAgICAgICAgLCBpdGVtID0gYnV0dG9uLmNsb3Nlc3QoJy5hZHNfX2l0ZW0nKTtcblxuICAgICAgaWYgKGl0ZW0uaGFzQXR0cmlidXRlKCdkYXRhLWhpZGRlbicpKSB7XG4gICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFZlbG9jaXR5KGl0ZW0sIFwic3RvcFwiKTtcbiAgICAgICAgVmVsb2NpdHkoaXRlbSwgXCJmYWRlT3V0XCIsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICBpdGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmNhdGVnb3JpZXMsIChjYXRlZ29yaWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcmllLnF1ZXJ5U2VsZWN0b3IoJy5hZHNfX2l0ZW0nKSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjYXRlZ29yaWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjYXRlZ29yaWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHRoaXMudHlwZSE9ICdhbGwnKSAmJiAoY2F0ZWdvcmllLnF1ZXJ5U2VsZWN0b3IoJy5hZHNfX2l0ZW1fJyArIHRoaXMudHlwZSkgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShjYXRlZ29yaWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yQWxsKCcuYWRzX19pdGVtJyk7XG4gICAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZHNfX2NhdGVnb3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cblxuXG4gICAgfVxuXG4gICAgZmlsdGVyIChldmVudCkge1xuICAgICAgbGV0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXRcbiAgICAgICAgLCB0eXBlID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10eXBlJyk7XG5cbiAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKCdhZHNfX2J1dHRvbl9jdXJyZW50JykpIHJldHVybjtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhZHNfX2J1dHRvbl9jdXJyZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudCA9IGJ1dHRvbjtcbiAgICAgIHRoaXMuY3VycmVudC5jbGFzc0xpc3QuYWRkKCdhZHNfX2J1dHRvbl9jdXJyZW50Jyk7XG5cbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdhbGwnOlxuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuY2F0ZWdvcmllcywgKGNhdGVnb3JpZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnNob3coY2F0ZWdvcmllKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuaXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvdyhpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLml0ZW1zLCAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhZHNfX2l0ZW1fJyt0eXBlKSl7XG4gICAgICAgICAgICAgIHRoaXMuc2hvdyhpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaGlkZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5jYXRlZ29yaWVzLCAoY2F0ZWdvcmllKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2F0ZWdvcmllLnF1ZXJ5U2VsZWN0b3IoJy5hZHNfX2l0ZW1fJyArIHR5cGUpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhpcy5oaWRlKGNhdGVnb3JpZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnNob3coY2F0ZWdvcmllKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGlkZGVuJykpIHJldHVybjtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhpZGRlbicsIHRydWUpO1xuICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScpO1xuICAgICAgVmVsb2NpdHkoaXRlbSwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkoaXRlbSwgXCJmYWRlT3V0XCIsIHsgZHVyYXRpb246IDUwMCB9KTtcbiAgICB9XG5cbiAgICBzaG93IChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5oYXNBdHRyaWJ1dGUoJ2RhdGEtdmlzaWJsZScpKSByZXR1cm47XG4gICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS12aXNpYmxlJywgdHJ1ZSk7XG4gICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1oaWRkZW4nKTtcbiAgICAgIFZlbG9jaXR5KGl0ZW0sIFwic3RvcFwiKTtcbiAgICAgIFZlbG9jaXR5KGl0ZW0sIFwiZmFkZUluXCIsIHsgZHVyYXRpb246IDUwMCB9KTtcbiAgICB9XG4gIH1cblxuICBuZXcgQWRzO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24gKCkge1xuXG4gIGNsYXNzIEJvb2ttYXJrcyB7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0ICgpIHtcbiAgICAgIGxldCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzJyk7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICB0aGlzLmZ1bGxfcHJpY2UgPSB3aWRnZXQucXVlcnlTZWxlY3RvcignLmJvb2ttYXJrc19fZm9vdGVyIC5ib29rbWFya3NfX3N1bW1hcnkgYicpO1xuICAgICAgdGhpcy5jYXRlZ29yaWVzID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFya3NfX3RhYmxlJyk7XG4gICAgICB0aGlzLml0ZW1zX3RpdGxlID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFya3NfX2Fic3RyYWN0X2l0ZW1zJyk7XG4gICAgICB0aGlzLmNhdGVnb3JpZXNfdGl0bGUgPSB3aWRnZXQucXVlcnlTZWxlY3RvcignLmJvb2ttYXJrc19fYWJzdHJhY3RfY2F0ZWdvcmllcycpO1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSA9IHRoaXMucmVjYWxjdWxhdGUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuaW5jcmVtZW50ID0gdGhpcy5pbmNyZW1lbnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZGVjcmVtZW50ID0gdGhpcy5kZWNyZW1lbnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucmVtb3ZlID0gdGhpcy5yZW1vdmUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsID0gdGhpcy5yZW1vdmVBbGwuYmluZCh0aGlzKTtcblxuICAgICAgbGV0IGNsZWFyaXQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX19jbGVhcml0Jyk7XG4gICAgICBpZiAoY2xlYXJpdCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNsZWFyaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlQWxsKTtcblxuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFya3NfX2NvbnRyb2xfcmVtb3ZlJyksIChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlbW92ZSk7XG4gICAgICB9KTtcblxuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFya3NfX2NvbnRyb2xfaW5jJyksIChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmluY3JlbWVudCk7XG4gICAgICB9KTtcblxuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFya3NfX2NvbnRyb2xfZGVjJyksIChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmRlY3JlbWVudCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgIH1cblxuICAgIGRlY2xPZk51bShudW1iZXIsIHRpdGxlcykge1xuICAgICAgbGV0IGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuICAgICAgcmV0dXJuIHRpdGxlc1sgKG51bWJlciUxMDA+NCAmJiBudW1iZXIlMTAwPDIwKT8gMiA6IGNhc2VzWyhudW1iZXIlMTA8NSk/bnVtYmVyJTEwOjVdIF07XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsIChldmVudCkge1xuICAgICAgbGV0IGZ1bGwgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX19kZXRhaWxzX2Z1bGwnKSxcbiAgICAgICAgICBlbXB0eSA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFya3NfX2RldGFpbHNfZW1wdHknKTtcblxuICAgICAgVmVsb2NpdHkoZnVsbCwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkoZnVsbCwgXCJmYWRlT3V0XCIsIHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBmdWxsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZnVsbCk7XG4gICAgICAgICAgICB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX19hYnN0cmFjdCcpLmlubmVySFRNTCA9IFwi0J/QvtC60LAg0L3QtdGCINC90Lgg0L7QtNC90L7QuSDQt9Cw0LrQu9Cw0LTQutC4XCI7XG4gICAgICAgICAgICBWZWxvY2l0eShlbXB0eSwgXCJzdG9wXCIpO1xuICAgICAgICAgICAgVmVsb2NpdHkoZW1wdHksIFwiZmFkZUluXCIsIHtkdXJhdGlvbjogNTAwfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUgKGV2ZW50KSB7XG4gICAgICBsZXQgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldFxuICAgICAgICAsIGl0ZW0gPSBidXR0b24uY2xvc2VzdCgndHInKTtcblxuICAgICAgVmVsb2NpdHkoaXRlbSwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkoaXRlbSwgXCJmYWRlT3V0XCIsIHtcbiAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2F0ZWdvcmllID0gaXRlbS5jbG9zZXN0KCcuYm9va21hcmtzX19jYXRlZ29yeScpO1xuICAgICAgICAgICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKGNhdGVnb3JpZS5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX190YWJsZSB0Ym9keSB0cicpID09IG51bGwpIHtcbiAgICAgICAgICAgICAgY2F0ZWdvcmllLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2F0ZWdvcmllKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluY3JlbWVudCAoZXZlbnQpIHtcbiAgICAgIGxldCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0XG4gICAgICAgICwgaXRlbSA9IGJ1dHRvbi5jbG9zZXN0KCd0cicpXG4gICAgICAgICwgY291bnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFya3NfX2NvdW50LWlucHV0JylcbiAgICAgICAgLCBob2xkZXIgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFya3NfX2NvdW50Jyk7XG5cblxuICAgICAgY291bnQudmFsdWUgPSBwYXJzZUludChjb3VudC52YWx1ZS50cmltKCksIDEwKSArIDE7XG4gICAgICBob2xkZXIuaW5uZXJIVE1MID0gY291bnQudmFsdWU7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlKCk7XG4gICAgfVxuXG4gICAgZGVjcmVtZW50IChldmVudCkge1xuICAgICAgbGV0IGJ1dHRvbiA9IGV2ZW50LmN1cnJlbnRUYXJnZXRcbiAgICAgICAgLCBpdGVtID0gYnV0dG9uLmNsb3Nlc3QoJ3RyJylcbiAgICAgICAgLCBjb3VudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmJvb2ttYXJrc19fY291bnQtaW5wdXQnKVxuICAgICAgICAsIGhvbGRlciA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmJvb2ttYXJrc19fY291bnQnKTtcblxuICAgICAgY291bnQudmFsdWUgPSBNYXRoLm1heChwYXJzZUludChjb3VudC52YWx1ZS50cmltKCksIDEwKSAtIDEsIDEpO1xuICAgICAgaG9sZGVyLmlubmVySFRNTCA9IGNvdW50LnZhbHVlO1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZSgpO1xuICAgIH1cblxuICAgIHJlY2FsY3VsYXRlICgpIHtcblxuICAgICAgbGV0IGZ1bGxfcHJpY2UgPSAwO1xuXG4gICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5jYXRlZ29yaWVzLCAoY2F0ZWdvcmllKSA9PiB7XG4gICAgICAgIGxldCBzdW1tYXJ5ID0gY2F0ZWdvcmllLnF1ZXJ5U2VsZWN0b3IoJ3Rmb290IGInKVxuICAgICAgICAgICAgLCBpdGVtcyA9IGNhdGVnb3JpZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpXG4gICAgICAgICAgICAsIHZhbHVlID0gMDtcblxuICAgICAgICBbXS5mb3JFYWNoLmNhbGwoaXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICAgICAgbGV0IHByaWNlID0gcGFyc2VJbnQoaXRlbS5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX19wcmljZS1pbnB1dCcpLnZhbHVlLnRyaW0oKSwgMTApXG4gICAgICAgICAgICAgICwgY291bnQgPSBwYXJzZUludChpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5ib29rbWFya3NfX2NvdW50LWlucHV0JykudmFsdWUudHJpbSgpLCAxMClcbiAgICAgICAgICAgICAgLCBzdW1tID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuYm9va21hcmtzX19zdW1tIGInKTtcbiAgICAgICAgICBzdW1tLmlubmVySFRNTCA9IHByaWNlKmNvdW50O1xuICAgICAgICAgIHZhbHVlICs9IHByaWNlKmNvdW50O1xuICAgICAgICB9KTtcblxuICAgICAgICBzdW1tYXJ5LmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICBmdWxsX3ByaWNlICs9IHZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZnVsbF9wcmljZS5pbm5lckhUTUwgPSBmdWxsX3ByaWNlO1xuXG4gICAgICBsZXQgY2F0cyA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib29rbWFya3NfX2NhdGVnb3J5JylcbiAgICAgICAgICAsIGl0ZW1zID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvckFsbCgnLmJvb2ttYXJrc19fdGFibGUgdGJvZHkgdHInKTtcblxuICAgICAgaWYgKGNhdHMgIT09IG51bGwpIHtcbiAgICAgICAgY2F0cyA9IGNhdHMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2F0cyA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtcyAhPT0gbnVsbCkge1xuICAgICAgICBpdGVtcyA9IGl0ZW1zLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW1zID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pdGVtc190aXRsZS5pbm5lckhUTUwgPSBpdGVtcyArIFwiIFwiICsgdGhpcy5kZWNsT2ZOdW0oaXRlbXMsIFsn0YLQvtCy0LDRgCcsICfRgtC+0LLQsNGA0LAnLCAn0YLQvtCy0LDRgNC+0LInXSkgKyBcIiBcIjtcbiAgICAgIHRoaXMuY2F0ZWdvcmllc190aXRsZS5pbm5lckhUTUwgPSBjYXRzICsgXCIgXCIgKyB0aGlzLmRlY2xPZk51bShjYXRzLCBbJ9C60LDRgtC10LPQvtGA0LjRjycsICfQutCw0YLQtdCz0L7RgNC40LgnLCAn0LrQsNGC0LXQs9C+0YDQuNC5J10pO1xuICAgICAgdGhpcy5jYXRlZ29yaWVzX3RpdGxlO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IEJvb2ttYXJrcztcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIEZpbHRlcnMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXJzJyk7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG5cbiAgICAgIGxldCBtb3JlID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignLmZpbHRlcnNfX21vcmUnKVxuICAgICAgICAsIGxlc3MgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyc19fbGVzcycpO1xuXG4gICAgICB0aGlzLnNlbGVjdHMgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QuZmlsdGVyc19fc2VsZWN0Jyk7XG5cbiAgICAgIHRoaXMuc2hvd01vcmUgPSB0aGlzLnNob3dNb3JlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNob3dMZXNzID0gdGhpcy5zaG93TGVzcy5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5yZXNldCA9IHRoaXMucmVzZXQuYmluZCh0aGlzKTtcblxuICAgICAgbW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd01vcmUpO1xuICAgICAgbGVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd0xlc3MpO1xuXG4gICAgICB0aGlzLndpZGdldC5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMucmVzZXQpO1xuXG4gICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5zZWxlY3RzLCAoc2VsZWN0KT0+IHtcbiAgICAgICAgJChzZWxlY3QpLnNlbGVjdDIoe1xuICAgICAgICAgIHBsYWNlaG9sZGVyOiBzZWxlY3QuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLFxuICAgICAgICAgIGFsbG93Q2xlYXI6IGZhbHNlLFxuICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAyMFxuICAgICAgICB9KTtcbiAgICAgICAgJChzZWxlY3QpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNldCAoKSB7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5zZWxlY3RzLCAoc2VsZWN0KT0+IHtcbiAgICAgICAgJChzZWxlY3QpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93TW9yZSAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QudG9nZ2xlKCdmaWx0ZXJzX21vcmUnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzaG93TGVzcyAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLndpZGdldC5jbGFzc0xpc3QudG9nZ2xlKCdmaWx0ZXJzX21vcmUnLCBmYWxzZSk7XG4gICAgfVxuXG4gIH1cblxuICBuZXcgRmlsdGVycztcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uICgpIHtcblxuICBjbGFzcyBOYXZpZ2F0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IGJ1dHRvbl9vcGVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9faXRlbXMnKTtcbiAgICAgIGlmIChidXR0b25fb3BlbiA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgXG4gICAgICBsZXQgYnV0dG9uX2Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2xvc2UnKVxuICAgICAgICAgICwgbW9iaWxlX3N3aXRjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21vYmlsZS1zd2l0Y2gnKVxuICAgICAgICAgICwgbW9iaWxlX3N3aXRjaF9jbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21vYmlsZS1jbG9zZScpO1xuICAgICAgXG4gICAgICB0aGlzLnVzZXJfc3VibWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3VzZXInKTtcbiAgICAgIHRoaXMuY2l0eV9zdWJtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY2l0eScpO1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2Ryb3Bkb3duX2l0ZW1zJyk7XG4gICAgICB0aGlzLm5hdmlnYXRpb25fbW9iaWxlICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21vYmlsZScpO1xuICAgICAgXG4gICAgICB0aGlzLm9uUmVzaXplID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy50b2dnbGVOYXZpZ2F0aW9uID0gdGhpcy50b2dnbGVOYXZpZ2F0aW9uLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnRvZ2dsZU5hdmlnYXRpb25Vc2VyID0gdGhpcy50b2dnbGVOYXZpZ2F0aW9uVXNlci5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy50b2dnbGVOYXZpZ2F0aW9uQ2l0eSA9IHRoaXMudG9nZ2xlTmF2aWdhdGlvbkNpdHkuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMudG9nZ2xlTmF2aWdhdGlvbk1vYmlsZSA9IHRoaXMudG9nZ2xlTmF2aWdhdGlvbk1vYmlsZS5iaW5kKHRoaXMpO1xuICAgICAgXG4gICAgICB0aGlzLnVzZXJfc3VibWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTmF2aWdhdGlvblVzZXIpO1xuICAgICAgdGhpcy5jaXR5X3N1Ym1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdmlnYXRpb25DaXR5KTtcbiAgICAgIFxuICAgICAgbW9iaWxlX3N3aXRjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlTmF2aWdhdGlvbk1vYmlsZSk7XG4gICAgICBtb2JpbGVfc3dpdGNoX2Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVOYXZpZ2F0aW9uTW9iaWxlKTtcbiAgICAgIFxuICAgICAgYnV0dG9uX29wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnRvZ2dsZU5hdmlnYXRpb24pO1xuICAgICAgYnV0dG9uX2Nsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGVOYXZpZ2F0aW9uKTtcbiAgICAgIFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25SZXNpemUpO1xuICAgIH1cbiAgICBcbiAgICBvblJlc2l6ZSAoKSB7XG4gICAgICBsZXQgdyA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgICBpZiAodzwxMzAwKSByZXR1cm47XG4gICAgICBcbiAgICAgIGxldCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX3VzZXJfb3BlbiwgLmhlYWRlcl9fY2l0eV9vcGVuLCAuaGVhZGVyX19tb2JpbGVfb3BlbicpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKCBlbGVtZW50cywgKGVsZW1lbnQpPT4ge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fdXNlcl9vcGVuJywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fY2l0eV9vcGVuJywgZmFsc2UpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fbW9iaWxlX29wZW4nLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdG9nZ2xlTmF2aWdhdGlvblVzZXIgKCkge1xuICAgICAgdGhpcy51c2VyX3N1Ym1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGVhZGVyX191c2VyX29wZW4nKTtcbiAgICB9XG5cbiAgICB0b2dnbGVOYXZpZ2F0aW9uQ2l0eSAoKSB7XG4gICAgICB0aGlzLmNpdHlfc3VibWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2NpdHlfb3BlbicpO1xuICAgIH1cblxuICAgIHRvZ2dsZU5hdmlnYXRpb25Nb2JpbGUgKCkge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uX21vYmlsZS5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX21vYmlsZV9vcGVuJyk7XG4gICAgICBcbiAgICAgIHRoaXMubmF2aWdhdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX2Ryb3Bkb3duX29wZW4nLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZU5hdmlnYXRpb24gKCkge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fZHJvcGRvd25fb3BlbicpO1xuICAgICAgXG4gICAgICB0aGlzLm5hdmlnYXRpb25fbW9iaWxlLmNsYXNzTGlzdC50b2dnbGUoJ2hlYWRlcl9fbW9iaWxlX29wZW4nLCBmYWxzZSk7XG4gICAgfVxuXG4gIH1cblxuICBuZXcgTmF2aWdhdGlvbjtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIEFza0Zvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX2FzaycpO1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgXG4gICAgICB0aGlzLnNob3cgPSB0aGlzLnNob3cuYmluZCh0aGlzKTtcblxuICAgICAgdGhpcy53aWRnZXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5jb21wbGV0ZSk7XG5cbiAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG93dG9fX2FzaycpLCAobGluayk9PntcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvdyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG93IChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5hc2tfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICAgIGNvbXBsZXRlIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5hc2tfcG9wdXAuY2xvc2UoKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zZXRUaXRsZSgn0J/RgNC40L3Rj9GC0L4hJyk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2V0VGV4dCgn0JzRiyDQvtGC0LLQtdGC0LjQvCDRgtCw0Log0LHRi9GB0YLRgNC+LCDQutCw0Log0YLQvtC70YzQutC+INGB0LzQvtC20LXQvC4g0KLQtdC70LXRhNC+0L0g0L/QvtC00LTQtdGA0LbQutC4OiA8YSBocmVmPVwidGVsOis4ODAwODAwODAwXCI+OCAoODAwKSA4MDAgODAwPC9hPi4nKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zaG93KCk7XG4gICAgfVxuXG4gIH1cblxuICBuZXcgQXNrRm9ybTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIENvbnRhY3RzRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fY29udGFjdHMnKTtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIHRoaXMuYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19pbnB1dFtuYW1lPVwiYWRkcmVzc1wiXScpO1xuICAgICAgdGhpcy5sYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fbGF0Jyk7XG4gICAgICB0aGlzLmxuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19sbmcnKTtcbiAgICAgIHRoaXMuYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2dlb2xvY2F0aW9uLWJveCcpO1xuICAgICAgdGhpcy5nZW9jb2RlID0gdGhpcy5nZW9jb2RlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLmxvY2F0aW9uRm91bmQgPSB0aGlzLmxvY2F0aW9uRm91bmQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2F2ZVBvc2l0aW9uID0gdGhpcy5zYXZlUG9zaXRpb24uYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuaW1hZ2UgPSB7XG4gICAgICAgICAgICB1cmw6ICdpbWFnZXMvbWFya2VyLnN2ZycsXG4gICAgICAgICAgICBzaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNTMpLFxuICAgICAgICAgICAgb3JpZ2luOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMCwgMCksXG4gICAgICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludCgyMCwgNTMpXG4gICAgICAgICAgfTtcbiAgICAgIHRoaXMubWFya2VyID0gbnVsbDtcbiAgICAgIHRoaXMuZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgIHRoaXMuYWRkcmVzcy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmdlb2NvZGUpO1xuICAgICAgdGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19tYXAnKSwge1xuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXG4gICAgICAgIGNlbnRlcjoge1xuICAgICAgICAgIGxhdDogLTM0LjM5NyxcbiAgICAgICAgICBsbmc6IDE1MC42NDRcbiAgICAgICAgfSxcbiAgICAgICAgem9vbTogMTRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdlb2NvZGUgKCkge1xuICAgICAgdGhpcy5nZW9jb2Rlci5nZW9jb2RlKHsnYWRkcmVzcyc6IHRoaXMuYWRkcmVzcy52YWx1ZS50cmltKCl9LCB0aGlzLmxvY2F0aW9uRm91bmQpO1xuICAgIH1cblxuICAgIGxvY2F0aW9uRm91bmQgKHJlc3VsdHMsIHN0YXR1cykge1xuICAgICAgXG4gICAgICBpZiAoc3RhdHVzICE9PSBnb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSykge1xuICAgICAgICBjb25zb2xlLmxvZygnR2VvY29kZSB3YXMgbm90IHN1Y2Nlc3NmdWwgZm9yIHRoZSBmb2xsb3dpbmcgcmVhc29uOiAnICsgc3RhdHVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLmJveC5jbGFzc0xpc3QucmVtb3ZlKCdmb3JtX19nZW9sb2NhdGlvbi1ib3gnKTtcbiAgICAgIHRoaXMubWFwLnNldENlbnRlcihyZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uKTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMubWFya2VyICE9IG51bGwpe1xuICAgICAgICB0aGlzLm1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogdGhpcy5pbWFnZSxcbiAgICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCxcbiAgICAgICAgcG9zaXRpb246IHJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb25cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm1hcmtlci5hZGRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuc2F2ZVBvc2l0aW9uKTtcbiAgICAgIHRoaXMuc2F2ZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgc2F2ZVBvc2l0aW9uICgpIHtcbiAgICAgIHRoaXMubGF0LnZhbHVlID0gdGhpcy5tYXJrZXIuZ2V0UG9zaXRpb24oKS5sYXQoKTtcbiAgICAgIHRoaXMubG5nLnZhbHVlID0gdGhpcy5tYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKTtcbiAgICAgIHRoaXMubWFwLnNldFpvb20oMTQpO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IENvbnRhY3RzRm9ybTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIEZlZWRiYWNrRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fZmVlZGJhY2snKTtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIFxuICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG5cbiAgICAgIHRoaXMud2lkZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuY29tcGxldGUpO1xuXG4gICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpbnRzX19jb250YWN0LXVzJyksIChsaW5rKT0+e1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3cgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93LmZlZWRiYWNrX3BvcHVwLnNob3coKTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZSAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cuZmVlZGJhY2tfcG9wdXAuY2xvc2UoKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zZXRUaXRsZSgn0J/RgNC40L3Rj9GC0L4hJyk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2V0VGV4dCgn0JzRiyDQvtGC0LLQtdGC0LjQvCDRgtCw0Log0LHRi9GB0YLRgNC+LCDQutCw0Log0YLQvtC70YzQutC+INGB0LzQvtC20LXQvC4g0KLQtdC70LXRhNC+0L0g0L/QvtC00LTQtdGA0LbQutC4OiA8YSBocmVmPVwidGVsOis4ODAwODAwODAwXCI+OCAoODAwKSA4MDAgODAwPC9hPi4nKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zaG93KCk7XG4gICAgfVxuXG4gIH1cblxuICBuZXcgRmVlZGJhY2tGb3JtO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgSXRlbUZvcm0ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX2l0ZW1zJyk7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICB0aGlzLnNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9fc2VsZWN0Jyk7XG5cbiAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLnNlbGVjdHMsIChzZWxlY3QpPT4ge1xuICAgICAgICAkKHNlbGVjdCkuc2VsZWN0Mih7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHNlbGVjdC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXG4gICAgICAgICAgYWxsb3dDbGVhcjogZmFsc2UsXG4gICAgICAgICAgbGFuZ3VhZ2U6IFwicnVcIixcbiAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogMjBcbiAgICAgICAgfSk7XG4gICAgICAgICQoc2VsZWN0KS5zZWxlY3QyKFwidmFsXCIsIFwiXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMud3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19waG90b3MnKTtcbiAgICAgIHRoaXMudXBsb2FkX2J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19waG90b3MtYWRkJyk7XG5cbiAgICAgIHRoaXMucmVtb3ZlUGhvdG8gPSB0aGlzLnJlbW92ZVBob3RvLmJpbmQodGhpcyk7XG5cbiAgICAgIHRoaXMudXBsb2FkZXIgPSBuZXcgcGx1cGxvYWQuVXBsb2FkZXIoe1xuICAgICAgICBicm93c2VfYnV0dG9uOiB0aGlzLnVwbG9hZF9idXR0b24sXG4gICAgICAgIGZsYXNoX3N3Zl91cmwgOiAnaHR0cDovL3Jhd2dpdGh1Yi5jb20vbW94aWVjb2RlL21veGllL21hc3Rlci9iaW4vZmxhc2gvTW94aWUuY2RuLnN3ZicsXG4gICAgICAgIHNpbHZlcmxpZ2h0X3hhcF91cmwgOiAnaHR0cDovL3Jhd2dpdGh1Yi5jb20vbW94aWVjb2RlL21veGllL21hc3Rlci9iaW4vc2lsdmVybGlnaHQvTW94aWUuY2RuLnhhcCcsXG4gICAgICAgIG1heF9maWxlX3NpemUgOiAnNW1iJyxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLndyYXBwZXIsXG4gICAgICAgIGRyb3BfZWxlbWVudDogdGhpcy53cmFwcGVyLFxuICAgICAgICBmaWx0ZXJzIDogW1xuICAgICAgICAgIHt0aXRsZSA6IFwiSW1hZ2UgZmlsZXNcIiwgZXh0ZW5zaW9ucyA6IFwianBnLGdpZixwbmdcIn1cbiAgICAgICAgXSxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICBsaXN0OiB0cnVlLFxuICAgICAgICAgIHRodW1iczogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmU6ICd0aHVtYnMnXG4gICAgICAgIH0sXG4gICAgICAgIHVybDogJ3VwbG9hZC5waHAnXG4gICAgICB9KTtcbiAgICAgIHRoaXMucGhvdG9BZGRlZCA9IHRoaXMucGhvdG9BZGRlZC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy51cGxvYWRlci5iaW5kKCdGaWxlc0FkZGVkJywgdGhpcy5waG90b0FkZGVkKTtcbiAgICAgIHRoaXMudXBsb2FkZXIuaW5pdCgpO1xuICAgICAgdGhpcy5jb21wbGV0ZSA9IHRoaXMuY29tcGxldGUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMud2lkZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuY29tcGxldGUpXG4gICAgfVxuXG4gICAgY29tcGxldGUgKGV2ZW50KSB7XG4gICAgICB0aGlzLnVwbG9hZGVyLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGhvdG8gKGV2ZW50KSB7XG4gICAgICBsZXQgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldFxuICAgICAgICAsIHdyYXBwZXIgPSBidXR0b24ucGFyZW50Tm9kZVxuICAgICAgICAsIGlkID0gd3JhcHBlci5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICAgIHRoaXMudXBsb2FkZXIucmVtb3ZlRmlsZShpZCk7XG4gICAgICB3cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod3JhcHBlcik7XG4gICAgfVxuXG4gICAgcGhvdG9BZGRlZCAodXAsIGZpbGVzKSB7XG4gICAgICB2YXIgcGhvdG9zID0gdGhpcy53cmFwcGVyLFxuICAgICAgICAgIHJlbW92ZVBob3RvID0gdGhpcy5yZW1vdmVQaG90byxcbiAgICAgICAgICB1cGxvYWRfYnV0dG9uID0gdGhpcy51cGxvYWRfYnV0dG9uO1xuXG4gICAgICBwbHVwbG9hZC5lYWNoKGZpbGVzLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKVxuICAgICAgICAgICwgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XG5cbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZmlsZS5pZCk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBmaWxlLm5hbWUpO1xuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdmb3JtX19waG90byc7XG5cbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdmb3JtX19waG90by1yZW1vdmUnO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVQaG90byk7XG5cbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgICAgIGxldCBpbWcgPSBuZXcgby5JbWFnZSgpO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICB0aGlzLmVtYmVkKHdyYXBwZXIsIHtcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXG4gICAgICAgICAgICBoZWlnaHQ6IDE4MCxcbiAgICAgICAgICAgIGNyb3A6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1nLmxvYWQoZmlsZS5nZXRTb3VyY2UoKSk7XG4gICAgICAgIHBob3Rvcy5pbnNlcnRCZWZvcmUod3JhcHBlciwgdXBsb2FkX2J1dHRvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZXcgSXRlbUZvcm07XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcblxuICBjbGFzcyBNYW51ZmFjdHVyZXJGb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIH0pO1xuICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcmVjb3VudCAoZXZlbnQpIHtcbiAgICAgIFxuICAgICAgdmFyIGJveF9jb3VudCA9IDA7XG5cbiAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmdyb3VwX2xpc3RfYm94cywgKGJveCk9PiB7XG4gICAgICAgIGlmIChib3guY2hlY2tlZCkge1xuICAgICAgICAgIGJveF9jb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGJveF9jb3VudCA+PSAzKSB7XG4gICAgICAgIFtdLmZvckVhY2guY2FsbCh0aGlzLmdyb3VwX2xpc3RfYm94cywgKGJveCk9PiB7XG4gICAgICAgICAgaWYgKCFib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuZ3JvdXBfbGlzdF9ib3hzLCAoYm94KT0+IHtcbiAgICAgICAgICBpZiAoYm94Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgYm94LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fbWFudWZhY3R1cmVyJyk7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHJldHVybjtcbiAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuXG4gICAgICB0aGlzLnJlY291bnQgPSB0aGlzLnJlY291bnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuZ3JvdXBfbGlzdCA9IHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19yYWRpby1ncm91cF9saXN0Jyk7XG4gICAgICB0aGlzLmdyb3VwX2xpc3RfYm94cyA9IHRoaXMuZ3JvdXBfbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuZ3JvdXBfbGlzdF9ib3hzLCAoYm94KT0+IHtcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMucmVjb3VudCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zZWxlY3RzID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fX3NlbGVjdCcpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuc2VsZWN0cywgKHNlbGVjdCk9PiB7XG4gICAgICAgICQoc2VsZWN0KS5zZWxlY3QyKHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogc2VsZWN0LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSxcbiAgICAgICAgICBhbGxvd0NsZWFyOiBmYWxzZSxcbiAgICAgICAgICBsYW5ndWFnZTogXCJydVwiLFxuICAgICAgICAgIG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOiAyMFxuICAgICAgICB9KTtcbiAgICAgICAgJChzZWxlY3QpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy53cmFwcGVyID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignLmZvcm1fX3Bob3RvcycpO1xuICAgICAgdGhpcy51cGxvYWRfYnV0dG9uID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignLmZvcm1fX3Bob3Rvcy1hZGQnKTtcblxuICAgICAgdGhpcy5yZW1vdmVQaG90byA9IHRoaXMucmVtb3ZlUGhvdG8uYmluZCh0aGlzKTtcblxuICAgICAgdGhpcy51cGxvYWRlciA9IG5ldyBwbHVwbG9hZC5VcGxvYWRlcih7XG4gICAgICAgIGJyb3dzZV9idXR0b246IHRoaXMudXBsb2FkX2J1dHRvbixcbiAgICAgICAgZmxhc2hfc3dmX3VybCA6ICdodHRwOi8vcmF3Z2l0aHViLmNvbS9tb3hpZWNvZGUvbW94aWUvbWFzdGVyL2Jpbi9mbGFzaC9Nb3hpZS5jZG4uc3dmJyxcbiAgICAgICAgc2lsdmVybGlnaHRfeGFwX3VybCA6ICdodHRwOi8vcmF3Z2l0aHViLmNvbS9tb3hpZWNvZGUvbW94aWUvbWFzdGVyL2Jpbi9zaWx2ZXJsaWdodC9Nb3hpZS5jZG4ueGFwJyxcbiAgICAgICAgbWF4X2ZpbGVfc2l6ZSA6ICc1bWInLFxuICAgICAgICBjb250YWluZXI6IHRoaXMud3JhcHBlcixcbiAgICAgICAgZHJvcF9lbGVtZW50OiB0aGlzLndyYXBwZXIsXG4gICAgICAgIGZpbHRlcnMgOiBbXG4gICAgICAgICAge3RpdGxlIDogXCJJbWFnZSBmaWxlc1wiLCBleHRlbnNpb25zIDogXCJqcGcsZ2lmLHBuZ1wifVxuICAgICAgICBdLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIGxpc3Q6IHRydWUsXG4gICAgICAgICAgdGh1bWJzOiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZTogJ3RodW1icydcbiAgICAgICAgfSxcbiAgICAgICAgdXJsOiAndXBsb2FkLnBocCdcbiAgICAgIH0pO1xuICAgICAgdGhpcy5waG90b0FkZGVkID0gdGhpcy5waG90b0FkZGVkLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnVwbG9hZGVyLmJpbmQoJ0ZpbGVzQWRkZWQnLCB0aGlzLnBob3RvQWRkZWQpO1xuICAgICAgdGhpcy51cGxvYWRlci5pbml0KCk7XG4gICAgICB0aGlzLmNvbXBsZXRlID0gdGhpcy5jb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy53aWRnZXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5jb21wbGV0ZSk7XG4gICAgfVxuXG4gICAgY29tcGxldGUgKGV2ZW50KSB7XG4gICAgICB0aGlzLnVwbG9hZGVyLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGhvdG8gKGV2ZW50KSB7XG4gICAgICBsZXQgYnV0dG9uID0gZXZlbnQuY3VycmVudFRhcmdldFxuICAgICAgICAsIHdyYXBwZXIgPSBidXR0b24ucGFyZW50Tm9kZVxuICAgICAgICAsIGlkID0gd3JhcHBlci5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG5cbiAgICAgIHRoaXMudXBsb2FkZXIucmVtb3ZlRmlsZShpZCk7XG4gICAgICB3cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQod3JhcHBlcik7XG4gICAgfVxuXG4gICAgcGhvdG9BZGRlZCAodXAsIGZpbGVzKSB7ICAgICAgXG4gICAgICB2YXIgcGhvdG9zID0gdGhpcy53cmFwcGVyLFxuICAgICAgICAgIHJlbW92ZVBob3RvID0gdGhpcy5yZW1vdmVQaG90byxcbiAgICAgICAgICB1cGxvYWRfYnV0dG9uID0gdGhpcy51cGxvYWRfYnV0dG9uO1xuXG4gICAgICBwbHVwbG9hZC5lYWNoKGZpbGVzLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIFxuICAgICAgICBsZXQgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1AnKVxuICAgICAgICAgICwgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnQlVUVE9OJyk7XG5cbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2lkJywgZmlsZS5pZCk7XG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBmaWxlLm5hbWUpO1xuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICdmb3JtX19waG90byc7XG5cbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdmb3JtX19waG90by1yZW1vdmUnO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVQaG90byk7XG5cbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgICAgIGxldCBpbWcgPSBuZXcgby5JbWFnZSgpO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgICB0aGlzLmVtYmVkKHdyYXBwZXIsIHtcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXG4gICAgICAgICAgICBoZWlnaHQ6IDE4MCxcbiAgICAgICAgICAgIGNyb3A6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1nLmxvYWQoZmlsZS5nZXRTb3VyY2UoKSk7XG4gICAgICAgIHBob3Rvcy5pbnNlcnRCZWZvcmUod3JhcHBlciwgdXBsb2FkX2J1dHRvbik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZXcgTWFudWZhY3R1cmVyRm9ybTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIFJlY292ZXJ5Rm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fcmVjb3ZlcnknKTtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIFxuICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG5cbiAgICAgIHRoaXMud2lkZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuY29tcGxldGUpO1xuXG4gICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlY292ZXJ5LWxpbmsnKSwgKGxpbmspPT57XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3cpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdyAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cucmVjb3ZlcnlfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICAgIGNvbXBsZXRlIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5yZWNvdmVyeV9wb3B1cC5jbG9zZSgpO1xuICAgICAgd2luZG93LmFsZXJ0X3BvcHVwLnNldFRpdGxlKCdBbGxvbnMteSEnKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zZXRUZXh0KCfQmiDQstCw0Lwg0YPQttC1INC70LXRgtC40YIg0L3QsNGI0LUg0L/QuNGB0YzQvNC+INGBINGB0YPQv9C10YAt0YHQtdC60YDQtdGC0L3Ri9C+0Lkg0YHRgdGL0LvQvtGH0LrQvtC5LCDQvdCw0LbQvNC40YLQtSDQvdCwINC90LXRkSDQsiDQvdC10LwsINGH0YLQviDQsdGLINCy0L7RgdGB0YLQsNC90L7QstC40YLRjCDQv9Cw0YDQvtC70YwuJyk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IFJlY292ZXJ5Rm9ybTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIFJlZ2lzdGVyRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fcmVnaXN0ZXInKTtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIFxuICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG4gICAgICB0aGlzLmNvbXBsZXRlID0gdGhpcy5jb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy53aWRnZXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5jb21wbGV0ZSk7XG5cbiAgICAgIHRoaXMucGFzc3dvcmQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nKTtcbiAgICAgIHRoaXMuY29uZmlybWF0aW9uID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiXScpO1xuXG4gICAgICBbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlZ2lzdGVyLWxpbmsnKSwgKGxpbmspPT57XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3cpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvdyAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cucmVnaXN0ZXJfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICAgIGNvbXBsZXRlIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKHRoaXMucGFzc3dvcmQudmFsdWUudHJpbSgpICE9PSB0aGlzLmNvbmZpcm1hdGlvbi52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19pbnB1dF9pbnZhbGlkJywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY29uZmlybWF0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2Zvcm1fX2lucHV0X2ludmFsaWQnLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXNzd29yZC5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19pbnB1dF9pbnZhbGlkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5jbGFzc0xpc3QudG9nZ2xlKCdmb3JtX19pbnB1dF9pbnZhbGlkJywgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cucmVnaXN0ZXJfcG9wdXAuY2xvc2UoKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zZXRUaXRsZSgnWW93emFoIScpO1xuICAgICAgd2luZG93LmFsZXJ0X3BvcHVwLnNldFRleHQoJ9CSINCy0LDRiNC10Lwg0L/QvtGH0YLQvtCy0L7QvCDRj9GJ0LjQutC1INGC0L7Qu9GM0LrQviDRh9GC0L4g0LzQsNGC0LXQsNGA0LjQu9C40LfQvtCy0LDQu9C+0YHRjCDQv9C40YHRjNC80L4g0YEg0YHRg9C/0LXRgC3RgdC10LrRgNC10YLQvdGL0L7QuSDRgdGB0YvQu9C+0YfQutC+0LksINC90LXQttC90L4g0L3QsNC20LzQuNGC0LUg0L3QsCDQvdC10ZEsINGH0YLQviDQsdGLINC00L7QutCw0LfQsNGC0Ywg0YHQstC+0ZEg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40LUuJyk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IFJlZ2lzdGVyRm9ybTtcblxufSkoKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuKGZ1bmN0aW9uKCkge1xuXG4gIGNsYXNzIERpc2xpa2VGb3JtIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIH0pO1xuICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgIGxldCB3aWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9kaXNsaWtlJyk7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICB0aGlzLmNvbXBsZXRlID0gdGhpcy5jb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy53aWRnZXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5jb21wbGV0ZSk7XG4gICAgfVxuXG4gICAgY29tcGxldGUgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB3aW5kb3cuZGlzbGlrZV9wb3B1cC5jbG9zZSgpO1xuICAgICAgd2luZG93LmFsZXJ0X3BvcHVwLnNldFRpdGxlKCfQn9GA0LjQvdGP0YLQviEnKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zZXRUZXh0KCfQodC/0LDRgdC40LHQviwg0YfRgtC+INC/0L7QtNC10LvQuNC70LjRgdGMINC80L3QtdC90LjQtdC8LiDQnNGLINGA0LDQt9Cx0LXRgNGR0LzRgdGPINGBINC/0YDQvtCx0LvQtdC80L7QuS4g0KLQtdC70LXRhNC+0L0g0L/QvtC00LTQtdGA0LbQutC4OiA8YSBocmVmPVwidGVsOis4ODAwODAwODAwXCI+OCAoODAwKSA4MDAgODAwPC9hPi4nKTtcbiAgICAgIHdpbmRvdy5hbGVydF9wb3B1cC5zaG93KCk7XG4gICAgfVxuXG4gIH1cblxuICBuZXcgRGlzbGlrZUZvcm07XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcblxuICBjbGFzcyBMaWtlRm9ybSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fbGlrZScpO1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSByZXR1cm47XG5cbiAgICAgIHRoaXMud2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgdGhpcy5jb21wbGV0ZSA9IHRoaXMuY29tcGxldGUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMud2lkZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuY29tcGxldGUpO1xuICAgICAgdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignLmZvcm1fX2J1dHRvbl9saWtlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNvbXBsZXRlKTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZSAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHdpbmRvdy5saWtlX3BvcHVwLmNsb3NlKCk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2V0VGl0bGUoJ9Cf0YDQuNC90Y/RgtC+IScpO1xuICAgICAgd2luZG93LmFsZXJ0X3BvcHVwLnNldFRleHQoJ9Ch0L/QsNGB0LjQsdC+LCDRh9GC0L4g0L/QvtC00LXQu9C40LvQuNGB0Ywg0LzQvdC10L3QuNC10LwuINCi0LXQu9C10YTQvtC9INC/0L7QtNC00LXRgNC20LrQuDogPGEgaHJlZj1cInRlbDorODgwMDgwMDgwMFwiPjggKDgwMCkgODAwIDgwMDwvYT4uJyk7XG4gICAgICB3aW5kb3cuYWxlcnRfcG9wdXAuc2hvdygpO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IExpa2VGb3JtO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgT3JkZXIge1xuXG4gICAgY29uc3RydWN0b3IgKHdpZGdldCkge1xuXG4gICAgICBpZiAoIHdpZGdldCA9PSBudWxsICkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIHRoaXMuY29udGFjdHMgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuZmFjdHNfb3JkZXInKTtcbiAgICAgIHRoaXMudG9nZ2xlQ29udGFjdHMgPSB0aGlzLnRvZ2dsZUNvbnRhY3RzLmJpbmQodGhpcyk7XG5cbiAgICAgIGxldCBzaG93ID0gdGhpcy53aWRnZXQucXVlcnlTZWxlY3RvcignLm9yZGVyX19zaG93Jyk7XG4gICAgICBpZihzaG93ICE9IG51bGwpIHtcbiAgICAgICAgc2hvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVDb250YWN0cyk7XG4gICAgICB9XG4gICAgICBcbiAgICB9XG5cbiAgICB0b2dnbGVDb250YWN0cyAoZXZlbnQpIHtcbiAgICAgIGxldCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoJ29yZGVyX19zaG93X2N1cnJlbnQnKTtcbiAgICAgIHRoaXMuY29udGFjdHMuY2xhc3NMaXN0LnRvZ2dsZSgnZmFjdHNfdmlzaWJsZScpO1xuICAgIH1cblxuICB9XG5cbiAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gIH0pO1xuICByZWFkeS50aGVuKCgpPT57XG4gICAgW10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcmRlcicpLCAob3JkZXIpPT57XG4gICAgICBuZXcgT3JkZXIob3JkZXIpO1xuICAgIH0pO1xuICB9KTtcblxuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgT3JkZXJDcmVhdGUge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0ICgpIHtcbiAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yZGVyLWNyZWF0ZScpO1xuICAgICAgaWYgKGZvcm0gPT09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSBmb3JtO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnLm9yZGVyLWNyZWF0ZV9fc2VsZWN0JyksIChzZWxlY3QpPT4ge1xuICAgICAgICAkKHNlbGVjdCkuc2VsZWN0Mih7XG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHNlbGVjdC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJyksXG4gICAgICAgICAgYWxsb3dDbGVhcjogZmFsc2UsXG4gICAgICAgICAgbWluaW11bVJlc3VsdHNGb3JTZWFyY2g6IDIwXG4gICAgICAgIH0pO1xuICAgICAgICAkKHNlbGVjdCkuc2VsZWN0MihcInZhbFwiLCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgbmV3IE9yZGVyQ3JlYXRlO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgT3JkZXJFZGl0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPSBcImxvYWRpbmdcIikgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIH0pO1xuICAgICAgcmVhZHkudGhlbih0aGlzLmluaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgaW5pdCAoKSB7XG4gICAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1lZGl0Jyk7XG4gICAgICBpZiAoZm9ybSA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICB0aGlzLndpZGdldCA9IGZvcm07XG4gICAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5zZWxlY3RzID0gZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcub3JkZXItZWRpdF9fc2VsZWN0Jyk7XG4gICAgICBcbiAgICAgIHRoaXMud2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5vcmRlci1lZGl0X19yZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlc2V0KTtcblxuICAgICAgW10uZm9yRWFjaC5jYWxsKHRoaXMuc2VsZWN0cywgKHNlbGVjdCk9PiB7XG4gICAgICAgICQoc2VsZWN0KS5zZWxlY3QyKHtcbiAgICAgICAgICBwbGFjZWhvbGRlcjogc2VsZWN0LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSxcbiAgICAgICAgICBhbGxvd0NsZWFyOiBmYWxzZSxcbiAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogMjBcbiAgICAgICAgfSk7XG4gICAgICAgICQoc2VsZWN0KS5zZWxlY3QyKFwidmFsXCIsIFwiXCIpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwodGhpcy5zZWxlY3RzLCAoc2VsZWN0KT0+IHtcbiAgICAgICAgJChzZWxlY3QpLnNlbGVjdDIoXCJ2YWxcIiwgXCJcIik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIG5ldyBPcmRlckVkaXQ7XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcblxuICBjbGFzcyBQb3B1cCB7XG5cbiAgICBjb25zdHJ1Y3RvciAocG9wdXApIHtcbiAgICAgIGlmIChwb3B1cCA9PSBudWxsKSByZXR1cm47XG4gICAgICB0aGlzLnBvcHVwID0gcG9wdXA7XG5cbiAgICAgIHRoaXMuY2xvc2UgPSB0aGlzLmNsb3NlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnNob3cgPSB0aGlzLnNob3cuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMub25yZXNpemUgPSB0aGlzLm9ucmVzaXplLmJpbmQodGhpcyk7XG5cbiAgICAgIHRoaXMubGlnaHRib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGlnaHRib3gnKTtcbiAgICAgIHRoaXMubGlnaHRib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xvc2UpO1xuXG4gICAgICBsZXQgY2xvc2VfYnV0dG9ucyA9IHRoaXMucG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwX19jbG9zZScpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKGNsb3NlX2J1dHRvbnMsIChidXR0b24pPT57XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbG9zZSk7XG4gICAgICB9KTtcblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5vbnJlc2l6ZSk7XG5cbiAgICB9XG5cbiAgICBvbnJlc2l6ZSAoKSB7XG4gICAgICBpZiAodGhpcy5wb3B1cC5vZmZzZXRIZWlnaHQgPiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCkgLSA0MCkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BvcHVwc2Nyb2xsJywgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3ApO1xuICAgICAgICB0aGlzLnBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ3BvcHVwX3VuZml4ZWQnLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwb3BlZHVwJywgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5wb3B1cC5vZmZzZXRIZWlnaHQgKyA0MCArIFwicHhcIjtcbiAgICAgICAgd2luZG93LnNjcm9sbCgwLDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdwb3B1cF91bmZpeGVkJywgZmFsc2UpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BvcGVkdXAnLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwb3B1cHNjcm9sbCcpICE9IG51bGwpIHtcbiAgICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIHBhcnNlSW50KHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncG9wdXBzY3JvbGwnKSwgMTApKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHNob3cgKCkge1xuICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkodGhpcy5saWdodGJveCwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJmYWRlSW5cIiwge1xuICAgICAgICBkdXJhdGlvbjogMjUwXG4gICAgICAgICwgY29tcGxldGU6ICgpPT57XG4gICAgICAgICAgdGhpcy5vbnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFZlbG9jaXR5KHRoaXMubGlnaHRib3gsIFwiZmFkZUluXCIsIHtkdXJhdGlvbjogMjUwfSk7XG4gICAgfVxuXG4gICAgY2xvc2UgKCkge1xuICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkodGhpcy5saWdodGJveCwgXCJzdG9wXCIpO1xuICAgICAgVmVsb2NpdHkodGhpcy5wb3B1cCwgXCJmYWRlT3V0XCIsIHtkdXJhdGlvbjogMjUwfSk7XG4gICAgICBWZWxvY2l0eSh0aGlzLmxpZ2h0Ym94LCBcImZhZGVPdXRcIiwge2R1cmF0aW9uOiAyNTB9KTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncG9wZWR1cCcsIGZhbHNlKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncG9wdXBzY3JvbGwnKSAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGwoMCwgcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwb3B1cHNjcm9sbCcpLCAxMCkpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgY2xhc3MgQWxlcnQgZXh0ZW5kcyBQb3B1cCB7XG4gICAgY29uc3RydWN0b3IgKHRpdGxlID0gXCJcIiwgdGV4dCA9IFwiXCIpIHtcbiAgICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9hbGVydCcpO1xuICAgICAgaWYgKHBvcHVwID09IG51bGwpIHJldHVybjtcbiAgICAgIHN1cGVyKHBvcHVwKTtcbiAgICAgIGlmKHRpdGxlLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX190aXRsZScpLmlubmVySFRNTCA9IHRpdGxlO1xuICAgICAgfVxuICAgICAgaWYodGV4dC50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fdGV4dCcpLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGl0bGUgKHRpdGxlID0gXCJcIikge1xuICAgICAgaWYodGl0bGUudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3RpdGxlJykuaW5uZXJIVE1MID0gdGl0bGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0VGV4dCAodGV4dCA9IFwiXCIpIHtcbiAgICAgIGlmKHRleHQudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3RleHQnKS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsYXNzIFJlY292ZXJ5IGV4dGVuZHMgUG9wdXAge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9yZWNvdmVyeScpO1xuICAgICAgaWYgKHBvcHVwID09IG51bGwpIHJldHVybjtcbiAgICAgIHN1cGVyKHBvcHVwKTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyBGZWVkYmFjayBleHRlbmRzIFBvcHVwIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBsZXQgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfZmVlZGJhY2snKTtcbiAgICAgIGlmIChwb3B1cCA9PSBudWxsKSByZXR1cm47XG4gICAgICBzdXBlcihwb3B1cCk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgQXNrIGV4dGVuZHMgUG9wdXAge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIGxldCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9hc2snKTtcbiAgICAgIGlmIChwb3B1cCA9PSBudWxsKSByZXR1cm47XG4gICAgICBzdXBlcihwb3B1cCk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBQb3B1cCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgbGV0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX3JlZ2lzdGVyJyk7XG4gICAgICBpZiAocG9wdXAgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgc3VwZXIocG9wdXApO1xuICAgIH1cbiAgfVxuXG4gIGNsYXNzIExpa2UgZXh0ZW5kcyBQb3B1cCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgbGV0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2xpa2UnKTtcbiAgICAgIGlmIChwb3B1cCA9PSBudWxsKSByZXR1cm47XG4gICAgICBzdXBlcihwb3B1cCk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgRGlzbGlrZSBleHRlbmRzIFBvcHVwIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBsZXQgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfZGlzbGlrZScpO1xuICAgICAgaWYgKHBvcHVwID09IG51bGwpIHJldHVybjtcbiAgICAgIHN1cGVyKHBvcHVwKTtcbiAgICB9XG4gIH1cblxuICBjbGFzcyDQoW9uZmlybSBleHRlbmRzIFBvcHVwIHtcbiAgICBjb25zdHJ1Y3RvciAoc3VjY2VzcywgZmFpbCkge1xuICAgICAgbGV0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX2NvbmZpcm0nKTtcbiAgICAgIGlmIChwb3B1cCA9PSBudWxsKSByZXR1cm47XG4gICAgICBzdXBlcihwb3B1cCk7XG5cbiAgICAgIHRoaXMuY29uZmlybV9mdW5jdGlvbiA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2FjY2VwdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlamVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY29uZmlybV9mdW5jdGlvbi50aGVuKHN1Y2Nlc3MsIGZhaWwpO1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHJlYWR5ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gIH0pO1xuICByZWFkeS50aGVuKCgpPT57XG4gICAgd2luZG93LmFsZXJ0X3BvcHVwICAgID0gbmV3IEFsZXJ0KCk7XG4gICAgd2luZG93LnJlY292ZXJ5X3BvcHVwID0gbmV3IFJlY292ZXJ5KCk7XG4gICAgd2luZG93LmZlZWRiYWNrX3BvcHVwID0gbmV3IEZlZWRiYWNrKCk7XG4gICAgd2luZG93LmFza19wb3B1cCAgICAgID0gbmV3IEFzaygpO1xuICAgIHdpbmRvdy5yZWdpc3Rlcl9wb3B1cCA9IG5ldyBSZWdpc3RlcigpO1xuXG4gICAgd2luZG93Lmxpa2VfcG9wdXAgICAgID0gbmV3IExpa2UoKTtcbiAgICB3aW5kb3cuZGlzbGlrZV9wb3B1cCAgPSBuZXcgRGlzbGlrZSgpO1xuXG4gICAgd2luZG93LtChb25maXJtICAgICAgICA9INChb25maXJtO1xuICB9KTtcblxuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgUHJvZmlsZU1hbnVmYWN0dXJlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX21hbnVmYWN0dXJlJyk7XG4gICAgICBpZiAod2lkZ2V0ID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgIHRoaXMub3BlbiA9IHRoaXMub3Blbi5iaW5kKHRoaXMpO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIFtdLmZvckVhY2guY2FsbCh3aWRnZXQucXVlcnlTZWxlY3RvckFsbCgnLnByb2ZpbGVfX3RhYi1idXR0b24nKSwgKGJ1dHRvbik9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vcGVuKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmN1cnJlbnRfYnV0dG9uID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX190YWItYnV0dG9uX2N1cnJlbnQnKTtcbiAgICAgIHRoaXMuY3VycmVudF90YWIgPSB3aWRnZXQucXVlcnlTZWxlY3RvcignLnRhYl9jdXJyZW50Jyk7XG4gICAgfVxuXG4gICAgb3BlbiAoZXZlbnQpIHtcbiAgICAgIGxldCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0XG4gICAgICAgICAgLCB0YWIgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcudGFiW2RhdGEtdGFiPVwiJyArIGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykgKyAnXCJdJyk7XG5cbiAgICAgIHRoaXMuY3VycmVudF9idXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgncHJvZmlsZV9fdGFiLWJ1dHRvbl9jdXJyZW50JywgZmFsc2UpO1xuICAgICAgdGhpcy5jdXJyZW50X3RhYi5jbGFzc0xpc3QudG9nZ2xlKCd0YWJfY3VycmVudCcsIGZhbHNlKTtcblxuICAgICAgdGhpcy5jdXJyZW50X2J1dHRvbiA9IGJ1dHRvbjtcbiAgICAgIHRoaXMuY3VycmVudF90YWIgPSB0YWI7XG5cbiAgICAgIHRoaXMuY3VycmVudF9idXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgncHJvZmlsZV9fdGFiLWJ1dHRvbl9jdXJyZW50JywgdHJ1ZSk7XG4gICAgICB0aGlzLmN1cnJlbnRfdGFiLmNsYXNzTGlzdC50b2dnbGUoJ3RhYl9jdXJyZW50JywgdHJ1ZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG5ldyBQcm9maWxlTWFudWZhY3R1cmVyO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgUHVyY2hhc2VzIHtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IHB1cmNoYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wdXJjaGFzZXNfX2xpc3QnKTtcbiAgICAgIGlmIChwdXJjaGFzZXMgPT09IG51bGwpIHJldHVybjtcbiAgICAgICQocHVyY2hhc2VzKS5pc290b3BlKHtcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nLFxuICAgICAgICBsYXlvdXRNb2RlOiAncGFja2VyeScsXG4gICAgICAgIHBhY2tlcnk6e1xuICAgICAgICAgIGd1dHRlcjogMFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZXcgUHVyY2hhc2VzO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgUmF0ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IHdpZGdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYXRlJyk7XG4gICAgICBpZiAod2lkZ2V0ID09PSBudWxsKSByZXR1cm47XG5cbiAgICAgIHRoaXMudm90ZSA9IHRoaXMudm90ZS5iaW5kKHRoaXMpO1xuXG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldDtcbiAgICAgIFtdLmZvckVhY2guY2FsbCh3aWRnZXQucXVlcnlTZWxlY3RvckFsbCgnLnJhdGVfX2FjdGlvbicpLCAoYnV0dG9uKT0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy52b3RlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZvdGUgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYoZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JhdGVfX2xpa2UnKSl7XG4gICAgICAgIHdpbmRvdy5saWtlX3BvcHVwLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5kaXNsaWtlX3BvcHVwLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIG5ldyBSYXRlO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgUXVlc3Rpb24ge1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuXG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBzY3JvbGxUbyAoZXZlbnQpIHtcbiAgICAgIGxldCBsaW5rID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgIFZlbG9jaXR5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSksIFwic2Nyb2xsXCIsIHtcbiAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCAoKSB7XG4gICAgICBsZXQgd2lkZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvd3RvX19xdWVzdGlvbnMnKTtcbiAgICAgIGlmICh3aWRnZXQgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy5zY3JvbGxUbyA9IHRoaXMuc2Nyb2xsVG8uYmluZCh0aGlzKTtcblxuICAgICAgdGhpcy53aWRnZXQgPSB3aWRnZXQ7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwod2lkZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5xdWVzdGlvbl9fbGluaycpLCAobGluayk9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc2Nyb2xsVG8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmV3IFF1ZXN0aW9uO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgU2xpZGVycyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICBsZXQgdmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJzX19zbGlkZXJfdmlldycpLFxuICAgICAgICBwcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJzX19zbGlkZXJfcHJldmlldycpO1xuXG4gICAgICBpZiAodmlldyA9PT0gbnVsbCB8fCBwcmV2aWV3cyA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAkKHZpZXcpLnNsaWNrKHtcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGZhZGU6IHRydWUsXG4gICAgICAgIGFzTmF2Rm9yOiBwcmV2aWV3c1xuICAgICAgfSk7XG4gICAgICAkKHByZXZpZXdzKS5zbGljayh7XG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGFzTmF2Rm9yOiB2aWV3LFxuICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgIGZvY3VzT25TZWxlY3Q6IHRydWUsXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5ldyBTbGlkZXJzO1xuXG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4oZnVuY3Rpb24oKSB7XG5cbiAgY2xhc3MgU29ydCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGxldCByZWFkeSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT0gXCJsb2FkaW5nXCIpIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIHJlYWR5LnRoZW4odGhpcy5pbml0LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGluaXQgKCkge1xuICAgICAgbGV0IHNvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29ydCcpO1xuICAgICAgaWYgKHNvcnQgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgdGhpcy53aWRnZXQgPSBzb3J0O1xuICAgICAgbGV0IGJ1dHRvbnMgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yQWxsKCcuc29ydF9fYnV0dG9uJyk7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLndpZGdldC5xdWVyeVNlbGVjdG9yKCcuc29ydF9fYnV0dG9uX2N1cnJlbnQnKTtcblxuICAgICAgW10uZm9yRWFjaC5jYWxsKGJ1dHRvbnMsIChidXR0b24pPT4ge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc29ydEl0LmJpbmQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc29ydEl0IChldmVudCkge1xuXG4gICAgICBpZiAoIWV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0X19idXR0b25fY3VycmVudCcpKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRfX2J1dHRvbl9jdXJyZW50Jyk7XG4gICAgICAgIHRoaXMuY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0X19idXR0b25fZm9yd2FyZCcpO1xuICAgICAgICB0aGlzLmN1cnJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc29ydF9fYnV0dG9uX2JhY2t3YXJkJyk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50ID0gZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICB0aGlzLmN1cnJlbnQuY2xhc3NMaXN0LmFkZCgnc29ydF9fYnV0dG9uX2N1cnJlbnQnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50LmNsYXNzTGlzdC5hZGQoJ3NvcnRfX2J1dHRvbl9mb3J3YXJkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc29ydF9fYnV0dG9uX2ZvcndhcmQnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NvcnRfX2J1dHRvbl9iYWNrd2FyZCcpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgbmV3IFNvcnQ7XG5cbn0pKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbihmdW5jdGlvbigpIHtcblxuICBjbGFzcyBTdG9yZXMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBsZXQgcmVhZHkgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9IFwibG9hZGluZ1wiKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgfSk7XG4gICAgICByZWFkeS50aGVuKHRoaXMuaW5pdC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgbGV0IG1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9yZXNfX21hcCcpLFxuICAgICAgICAgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RvcmVzX193cmFwcGVyJyk7XG4gICAgICBpZiAobWFwID09PSBudWxsKSByZXR1cm47XG4gICAgICB0aGlzLndyYXBwZXIgPSB3cmFwcGVyO1xuICAgICAgdGhpcy5pbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdG9yZXNfX2lubmVyJyk7XG4gICAgICBcbiAgICAgIGxldCB1cmwgPSB3cmFwcGVyLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcbiAgICAgIHRoaXMubWFwX2hvbGRlciA9IG1hcDtcbiAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLm1hcF9ob2xkZXIsIHtcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogZmFsc2UsXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcbiAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxuICAgICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICBjZW50ZXI6IHtcbiAgICAgICAgICBsYXQ6IC0zNC4zOTcsXG4gICAgICAgICAgbG5nOiAxNTAuNjQ0XG4gICAgICAgIH0sXG4gICAgICAgIHpvb206IDEyXG4gICAgICB9KTtcblxuICAgICAgbGV0IERPTkUgPSA0LFxuICAgICAgICBPSyA9IDIwMCxcbiAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksXG4gICAgICAgIGxvYWRlZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IERPTkUpIHtcbiAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IE9LKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgY29kZTogcGFyc2VJbnQoeGhyLnN0YXR1cywgMTApLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICBsb2FkZWQudGhlbih0aGlzLnBvaW50c0xpc3QuYmluZCh0aGlzKSkuY2F0Y2godGhpcy5zaG93RXJyb3JNZXNzYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICB0aGlzLnN0YXJ0UmVzYW1wbGUgPSB0aGlzLnN0YXJ0UmVzYW1wbGUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc3RvcFJlc2FtcGxlID0gdGhpcy5zdG9wUmVzYW1wbGUuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMucmVzYW1wbGUgPSB0aGlzLnJlc2FtcGxlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLnJlc2FtcGxpbmcgPSBmYWxzZTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnN0YXJ0UmVzYW1wbGUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc3RhcnRSZXNhbXBsZSk7XG4gICAgICB0aGlzLnJlc2FtcGxlKCk7XG4gICAgfVxuXG4gICAgZ2V0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICAgIHZhciB0b3AgPSAwO1xuICAgICAgZG8ge1xuICAgICAgICAgIHRvcCArPSBlbGVtZW50Lm9mZnNldFRvcCAgfHwgMDtcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICB9IHdoaWxlKGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gdG9wO1xuICAgIH1cblxuICAgIHN0YXJ0UmVzYW1wbGUgKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRpbWVyICE9ICd1bmRlZmluZWQnKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy50aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuc3RvcFJlc2FtcGxlLCAyNTApO1xuICAgICAgaWYgKHRoaXMucmVzYW1wbGluZyA9PSB0cnVlICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnJlc2FtcGxpbmcgPSB0cnVlO1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlc2FtcGxlKTtcbiAgICB9XG5cbiAgICBzdG9wUmVzYW1wbGUgKCkge1xuICAgICAgdGhpcy5yZXNhbXBsaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzYW1wbGUoKSB7XG4gICAgICBcbiAgICAgIGlmICh0aGlzLmlubmVyICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHcgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApLFxuICAgICAgICAgICAgaCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKSxcbiAgICAgICAgICAgIHNjcm9sbCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgIC0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3AgfHwgMCksXG4gICAgICAgICAgICB0b3AgPSB0aGlzLmdldE9mZnNldCh0aGlzLndyYXBwZXIpO1xuICAgICAgICBcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAodz4xMzAwKSBcbiAgICAgICAgICAgICYmICh0b3AgPD0gc2Nyb2xsKSBcbiAgICAgICAgICAgICYmICh0aGlzLndyYXBwZXIub2Zmc2V0SGVpZ2h0ID4gaCkgXG4gICAgICAgICl7XG4gICAgICAgICAgdGhpcy5pbm5lci5jbGFzc0xpc3QudG9nZ2xlKCdzdG9yZXNfX2lubmVyX2ZpeGVkJywgdHJ1ZSk7XG4gICAgICAgICAgXG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKHNjcm9sbCArIGggPj0gdG9wICsgdGhpcy53cmFwcGVyLm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5pbm5lci5jbGFzc0xpc3QudG9nZ2xlKCdzdG9yZXNfX2lubmVyX2ZpeGVkX2JvdHRvbScsIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlubmVyLmNsYXNzTGlzdC50b2dnbGUoJ3N0b3Jlc19faW5uZXJfZml4ZWRfYm90dG9tJywgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmlubmVyLmNsYXNzTGlzdC50b2dnbGUoJ3N0b3Jlc19faW5uZXJfZml4ZWQnLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5pbm5lci5jbGFzc0xpc3QudG9nZ2xlKCdzdG9yZXNfX2lubmVyX2ZpeGVkX2JvdHRvbScsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5ib3VuZHMpO1xuICAgICAgXG4gICAgICBpZiAodGhpcy5yZXNhbXBsaW5nID09IHRydWUgKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZXNhbXBsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcG9pbnRzTGlzdChyZXNwb25jZSkge1xuICAgICAgXG4gICAgICB0aGlzLmJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblxuICAgICAgbGV0IGluZm93aW5kb3csXG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHJlZF9tYXJrZXIgPSB7XG4gICAgICAgICAgICBwYXRoOiAnTTMyLjAwMCwzNy4wMDAgTDIxLjAwMCw1My4wMDAgTDIwLjAwMCw1My4wMDAgTDguMDAwLDM3LjAwMCBDOC4wMDAsMzcuMDAwIDAuMDAwLDI1LjYwMyAwLjAwMCwyMC4wMDAgQzAuMDAwLDguOTU0IDguOTU0LC0wLjAwMCAyMC4wMDAsLTAuMDAwIEMzMS4wNDYsLTAuMDAwIDQwLjAwMCw4Ljk1NCA0MC4wMDAsMjAuMDAwIEM0MC4wMDAsMjYuMDI1IDMyLjAwMCwzNy4wMDAgMzIuMDAwLDM3LjAwMCBaTTIwLjAwMCwxMy4wMDAgQzE2LjY4NiwxMy4wMDAgMTQuMDAwLDE1LjY4NiAxNC4wMDAsMTkuMDAwIEMxNC4wMDAsMjIuMzE0IDE2LjY4NiwyNS4wMDAgMjAuMDAwLDI1LjAwMCBDMjMuMzE0LDI1LjAwMCAyNi4wMDAsMjIuMzE0IDI2LjAwMCwxOS4wMDAgQzI2LjAwMCwxNS42ODYgMjMuMzE0LDEzLjAwMCAyMC4wMDAsMTMuMDAwIFonLFxuICAgICAgICAgICAgZmlsbENvbG9yOiAnI2ZmNDkyNCcsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgICAgIGZpbGxSdWxlOiAnZXZlbm9kZCcsXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IDAsXG4gICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDQwLCA1MyksXG4gICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5Qb2ludCgwLCAwKSxcbiAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDIwLCA1MylcbiAgICAgICAgICB9O1xuXG4gICAgICByZXNwb25jZSA9IEpTT04ucGFyc2UocmVzcG9uY2UpO1xuICAgICAgcmVzcG9uY2UuZm9yRWFjaCgob2ZmaWNlKSA9PiB7XG5cbiAgICAgICAgbGV0IGxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoe1xuICAgICAgICAgICAgbGF0OiBvZmZpY2UubGF0LFxuICAgICAgICAgICAgbG5nOiBvZmZpY2UubG5nXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBsYXRMbmcsXG4gICAgICAgICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgICAgICAgdGl0bGU6IG9mZmljZS5hZGRyZXNzLFxuICAgICAgICAgICAgaWNvbjogcmVkX21hcmtlclxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCBcImNsaWNrXCIsIGZ1bmN0aW9uKG1hcmtlcikge1xuXG4gICAgICAgICAgICBpZiAobWFya2VyLm9wZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFya2VyLm9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgaW5mb3dpbmRvdyA9IG5ldyBJbmZvQm94KHtcbiAgICAgICAgICAgICAgbWFya2VyOiBtYXJrZXIsXG4gICAgICAgICAgICAgIGxhdGxuZzogbWFya2VyLmdldFBvc2l0aW9uKCksXG4gICAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IG9mZmljZS5hZGRyZXNzLFxuICAgICAgICAgICAgICBkeTogLTM1XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0uYmluZCh0aGlzLCBtYXJrZXIpKTtcblxuICAgICAgICB0aGlzLmJvdW5kcy5leHRlbmQobGF0TG5nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uY2UubGVuZ3RoID4gMSkge1xuICAgICAgICB0aGlzLm1hcC5maXRCb3VuZHModGhpcy5ib3VuZHMpO1xuICAgICAgfWVsc2Uge1xuICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIobmV3IGdvb2dsZS5tYXBzLkxhdExuZyh7XG4gICAgICAgICAgICBsYXQ6IHJlc3BvbmNlWzBdLmxhdCxcbiAgICAgICAgICAgIGxuZzogcmVzcG9uY2VbMF0ubG5nXG4gICAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLm1hcC5zZXRab29tKDE0KTtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtYXJrZXIsIFwiY2xpY2tcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBzaG93RXJyb3JNZXNzYWdlKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuXG4gIH1cbiAgXG4gIG5ldyBTdG9yZXM7XG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
