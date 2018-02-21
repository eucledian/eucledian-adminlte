import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  option: DS.attr('number'),
  accepted: DS.attr('number'),
  date: DS.attr('date'),
  image: DS.attr('string'),
  html: DS.attr('string'),
  cars: DS.hasMany('car'),
  organization: DS.belongsTo('organization'),
  parts: DS.hasMany('part'),
  options: computed(function(){
    return [
      {
        name: 'Inactive',
        value: 0,
      },
      {
        name: 'Active',
        value: 1,
      }
    ];
  }),
});
