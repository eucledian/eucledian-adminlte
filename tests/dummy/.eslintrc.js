module.exports = {
  globals: {
    server: true,
    tinymce: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
  },
  overrides: [
    // node files
    {
      files: [
        'index.js',
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'app/**',
        'addon/**'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
        'node/no-extraneous-require': ['error', {
          "devDependencies": false,
          "optionalDependencies": false,
          "peerDependencies": false,
          allowModules: [
            'broccoli-funnel',
            'resolve',
          ],
        }]
      })
    },

    // test files
    {
      files: ['tests/**/*.js'],
      excludedFiles: [
        'tests/dummy/**/*.js',
        'tests/dummy/app/controllers/*.js',
        'tests/dummy/app/routes/*.js'
      ],
      env: {
        embertest: true
      }
    }
  ]
};
