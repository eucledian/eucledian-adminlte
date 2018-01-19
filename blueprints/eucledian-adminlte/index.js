/* eslint-env node */
module.exports = {
  description: '',
  normalizeEntityName(){},
  afterInstall(){
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-font-awesome' },
        { name: 'ember-power-select' },
        { name: 'ember-toggle' },
        { name: 'ember-cp-validations' },
      ],
      blueprintOptions: {
        saveDev: true
      },
    }).then(() => {
      return this.addPackagesToProject([
        { name: 'adminlte' },
      ]);
    });
  },
};
