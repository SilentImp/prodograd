"use strict";
(function() {

  class ContactsForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let widget = document.querySelector('.form_contacts');
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

    geocode () {
      this.geocoder.geocode({'address': this.address.value.trim()}, this.locationFound);
    }

    locationFound (results, status) {
      
      if (status !== google.maps.GeocoderStatus.OK) {
        console.log('Geocode was not successful for the following reason: ' + status);
        return;
      }
      
      this.box.classList.remove('form__geolocation-box');
      this.map.setCenter(results[0].geometry.location);
      
      if (this.marker != null){
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

    savePosition () {
      this.lat.value = this.marker.getPosition().lat();
      this.lng.value = this.marker.getPosition().lng();
      this.map.setZoom(14);
    }

  }

  new ContactsForm;

})();
