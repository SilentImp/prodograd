"use strict";
(function() {

  class ManufacturerForm {

    constructor() {
      let ready = new Promise((resolve, reject) => {
        if (document.readyState != "loading") return resolve();
        document.addEventListener("DOMContentLoaded", () => resolve());
      });
      ready.then(this.init.bind(this));
    }

    recount (event) {
      
      var box_count = 0;

      [].forEach.call(this.group_list_boxs, (box)=> {
        if (box.checked) {
          box_count++;
        }
      });

      if (box_count >= 3) {
        [].forEach.call(this.group_list_boxs, (box)=> {
          if (!box.checked) {
            box.setAttribute('disabled', 'disabled');
          }
        });
      } else {
        [].forEach.call(this.group_list_boxs, (box)=> {
          if (box.hasAttribute('disabled')) {
            box.removeAttribute('disabled', 'disabled');
          }
        });
      }
    }

    init() {
      let widget = document.querySelector('.form_manufacturer');
      if (widget == null) return;
      this.widget = widget;

      this.recount = this.recount.bind(this);
      this.group_list = this.widget.querySelector('.form__radio-group_list');
      this.group_list_boxs = this.group_list.querySelectorAll('input');
      [].forEach.call(this.group_list_boxs, (box)=> {
        box.addEventListener('change', this.recount);
      });

      this.selects = this.widget.querySelectorAll('.form__select');
      [].forEach.call(this.selects, (select)=> {
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
        flash_swf_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf',
        silverlight_xap_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/silverlight/Moxie.cdn.xap',
        max_file_size : '5mb',
        container: this.wrapper,
        drop_element: this.wrapper,
        filters : [
          {title : "Image files", extensions : "jpg,gif,png"}
        ],
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

    complete (event) {
      this.uploader.start();
    }

    removePhoto (event) {
      let button = event.currentTarget
        , wrapper = button.parentNode
        , id = wrapper.getAttribute('id');

      this.uploader.removeFile(id);
      wrapper.parentNode.removeChild(wrapper);
    }

    photoAdded (up, files) {      
      var photos = this.wrapper,
          removePhoto = this.removePhoto,
          upload_button = this.upload_button;

      plupload.each(files, function(file) {
        
        let wrapper = document.createElement('P')
          , button = document.createElement('BUTTON');

        wrapper.setAttribute('id', file.id);
        wrapper.setAttribute('data-name', file.name);
        wrapper.className = 'form__photo';

        button.setAttribute('type', 'button');
        button.className = 'form__photo-remove';
        button.addEventListener('click', removePhoto);

        wrapper.appendChild(button);

        let img = new o.Image();
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
  }

  new ManufacturerForm;

})();
