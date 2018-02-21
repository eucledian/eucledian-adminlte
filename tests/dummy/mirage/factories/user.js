import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name() {
    return faker.name.findName();
  },
  description(){
    return faker.lorem.paragraph();
  },
  option(i){
    return i;
  },
  accepted(i){
    return i;
  },
  date(){},
  image(){},
  html(){},
});
