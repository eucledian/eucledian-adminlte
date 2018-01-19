import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from "@ember/runloop";
import RSVP from 'rsvp';
import layout from '../../templates/components/form/form-file-input';

export default Component.extend({
  layout,
  init(){
    this._super(...arguments);
    if(this.get(`model.${this.get('prop')}`)){
      this.set('hasFile', true);
    }
  },
  classNames: ['form-for-file-input'],
  classNameBindings: ['propName', 'hasFile:has-file'],
  prop: null,
  label: 'Choose file',
  maxFileSize: 5,
  allowedExtensions: computed(function(){
    return [];
  }),
  limitExtensions: false,
  filename: null,
  unallowedFileType: false,
  error: false,
  exceedSize: false,
  value: null,
  hasFile: false,
  exceedErrorText: 'File is too large',
  unallowedFileTypeText: 'File extension is not allowed',
  computedSize: computed('maxFileSize', function(){
    return this.get('maxFileSize') * 1024 * 1024;
  }),
  propName: computed(function(){
    return `model-${this.get('prop')}`;
  }),
  readFile(file){
    return new RSVP.Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        run(() => {
          this.set(`model.${this.get('prop')}`, reader.result);
          resolve();
        });
      };

      reader.onerror = () => {
        run(() => {
          this.set('hasFile', false);
          reject();
        });
      };

      if(file){
        reader.readAsDataURL(file);
      }
    });
  },
  actions: {
    selectFile(e){
      const file = e.target.files[0];
      if(file === undefined){
        this.set(`model.${this.get('prop')}`, undefined);
        this.set('hasFile', false);
        return false;
      }

      if(this.get('limitExtensions')){
        let fileExtension = file.name.split('.')[file.name.split('.').length - 1];
        if(fileExtension){ fileExtension = fileExtension.toLowerCase(); }
        this.set('unallowedFileType', this.get('allowedExtensions').indexOf(fileExtension) === -1);
      }

      this.set('filename', file.name);
      this.set('exceedsSize', file.size > this.get('computedSize'));

      if(this.get('exceedsSize') || this.get('unallowedFileType')){
        this.set('error', true);
        e.target.value = '';
        this.set('hasFile', false);
        return false;
      }

      this.readFile(file).then(() => {
        this.set('hasFile', true);
      });
    }
  },
});
