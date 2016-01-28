"use strict";
(function() {

  class Stores {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    init() {
      let map = document.querySelector('.stores__map'),
          wrapper = document.querySelector('.stores__wrapper');
      if (map === null) return;
      this.wrapper = wrapper;
      this.inner = document.querySelector('.stores__inner');
      
      let url = wrapper.getAttribute('data-url');
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

      let DONE = 4,
        OK = 200,
        xhr = new XMLHttpRequest(),
        loaded = new Promise((resolve, reject) => {
          xhr.open('GET', url);
          xhr.send();
          xhr.onreadystatechange = () => {
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

    getOffset(element) {
      var top = 0;
      do {
          top += element.offsetTop  || 0;
          element = element.offsetParent;
      } while(element);

      return top;
    }

    startResample () {
      if (typeof this.timer != 'undefined'){
        clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(this.stopResample, 250);
      if (this.resampling == true ) {
        return;
      }
      this.resampling = true;
      window.requestAnimationFrame(this.resample);
    }

    stopResample () {
      this.resampling = false;
    }

    resample() {
      
      if (this.inner != null) {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            scroll = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0),
            top = this.getOffset(this.wrapper);
        

        if (
            (w>1300) 
            && (top <= scroll) 
            && (this.wrapper.offsetHeight > h) 
        ){
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
      
      if (this.resampling == true ) {
        window.requestAnimationFrame(this.resample);
      }
    }

    pointsList(responce) {
      
      this.bounds = new google.maps.LatLngBounds();

      let infowindow,
          marker,
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
      responce.forEach((office) => {

        let latLng = new google.maps.LatLng({
            lat: office.lat,
            lng: office.lng
          });

          marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: office.address,
            icon: red_marker
          });

          google.maps.event.addListener(marker, "click", function(marker) {

            if (marker.open === true) {
              return;
            }
            marker.open = true;

            let infowindow = new InfoBox({
              marker: marker,
              latlng: marker.getPosition(),
              map: this.map,
              content: office.address,
              dy: -35
            });

          }.bind(this, marker));

        this.bounds.extend(latLng);
      });

      if (responce.length > 1) {
        this.map.fitBounds(this.bounds);
      }else {
        this.map.setCenter(new google.maps.LatLng({
            lat: responce[0].lat,
            lng: responce[0].lng
          }));
        this.map.setZoom(14);
        google.maps.event.trigger(marker, "click");
      }

    }

    showErrorMessage(error) {
      console.log(error);
    }

  }
  
  new Stores;

})();
