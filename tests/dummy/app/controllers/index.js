import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    githubQuery(){
      return this.get('model');
    },
  },
});
