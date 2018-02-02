# eucledian-adminlte
[![npm Version][npm-badge]][npm]

`eucledian-adminlte` is a implementation of the AdminLTE theme for Ember
with some extra flair for forms and views

## Requirements

* Ember >= 2.15.0
* Ember CLI
* `ember-cli-sass`
* `ember-bootstrap`

## Installation

* ember-cli >= 2.15 `ember install eucledian-adminlte`

This package installs the following dependencies:
* `ember-font-awesome`
* `ember-cp-validations`
* `ember-i18n`
* `ember-i18n-cp-validations`
* `ember-pikaday`
* `ember-power-select`
* `ember-toggle`

## Usage

### 1. Setup `body` css classes for adminlte

add `sidebar-mini` and `skin-<color-of-list>` to setup base `body` tags
```hbs
<body class="skin-blue sidebar-mini">
{{content-for "body"}}
```
### 2. Import `AdminLTE` Styles in `app.scss`
```sass
@import "ember-bootstrap/bootstrap";
@import "eucledian-adminlte/AdminLTE";
@import "eucledian-adminlte/skins/skin-<color-of-list>";
```
### 3. Add `{{lte-navigation}}` component in your base route

```hbs
{{#lte-navigation
  outlet=outlet
  logoRoute=logoRoute
  logoUrl=logoUrl
  currentUser=currentUser
  onLogout=(action onLogout)
  as |navigation|}}
  {{navigation.link icon=icon label=label link=link}}
{{/lte-navigation}}
```
Component options and settings
* `logoRoute`: route of `a` tag surrounding logo image
* `logoUrl`: URL source for `img` for header logo
* `currentUser`: Name of logged in user
* `onLogout`: logout action - **NOTE**: this action must be sent to component

### (Optional) 4. Set your routes

```hbs
{{navigation.link icon=icon label=label link=link}}
```
Component options and settings
* `link`: route of `a` tag
* `icon`: `FontAwesome` icon to display
* `label`: Name to display in link

## Available skins

* `skin-blue`
* `skin-blue-light`
* `skin-yellow`
* `skin-yellow-light`
* `skin-green`
* `skin-green-light`
* `skin-purple`
* `skin-purple-light`
* `skin-red`
* `skin-red-light`
* `skin-black`
* `skin-black-light`

## Development

* `git clone` this repository
* `npm install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

    For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
