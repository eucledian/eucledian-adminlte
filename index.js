'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const resolve = require('resolve');

module.exports = {
  name: 'eucledian-adminlte',
  normalizeEntityName(){},
  included(){
    this._super.included.apply(this, arguments);
    this.ui.writeLine('Eucledian AdminLTE base package installed');
  },
  treeForStyles(){
    let name = this.resolvePackagePath('adminlte/dist/css');
    return new Funnel(name, {
      destDir: 'eucledian-adminlte',
    });
  },
  resolvePackagePath(pkgPath) {
    let parts = pkgPath.split('/');
    let pkg = parts[0];
    let result = path.dirname(resolve.sync(`${pkg}/package.json`, { basedir: this.app.project.root }));

    // add sub folders to path
    if (parts.length > 1) {
      let args = parts.map((part, i) => i === 0 ? result : part);
      result = path.join.apply(path, args);
    }
    return result;
  },
  afterInstall(){
    this.ui.writeLine('installing dependencies');
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-font-awesome' },
        { name: 'ember-power-select' },
        { name: 'ember-toggle' },
        { name: 'ember-cp-validations' },
      ],
    }).then(() => {
      return this.addPackagesToProject({
        packages: [
          { name: 'adminlte' },
        ]
      });
    });
  },
};
