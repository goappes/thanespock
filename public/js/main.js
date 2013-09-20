'use strict';

require.config({
  baseUrl: '../',
  shim: {
    ngResource: {
      exports: 'angular',
      deps: ['angular']
    },
    ngCookies: {
      exports: 'angular',
      deps: ['angular']
    },
    angular: {
      exports: 'angular',
      deps: ['jquery']
    },
    jquery: {
      exports: 'jQuery'
    },
    bootstrapSelect: {
      exports: 'bootstrapSelect',
      deps: ['jquery']
    },
    bootstrapDropdown: {
      exports: 'bootstrapDropdown',
      deps: ['jquery']
    },
    bootstrapTab: {
      exports: 'bootstrapTab',
      deps: ['jquery']
    },
    bootstrapTransition: {
      exports: 'bootstrapTransition',
      deps: ['jquery']
    },
    bootstrapCollapse: {
      exports: 'bootstrapCollapse',
      deps: ['jquery']
    }
  },
  paths: {
    angular: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular.min',
      'https://raw.github.com/ryanzec/bower-unstable-angular-complete/1.1.3/angular.min',
      'components/unstable-angular-complete/angular'
    ],
    ngResource: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-resource.min',
      'https://raw.github.com/ryanzec/bower-unstable-angular-complete/1.1.3/angular-resource.min',
      'components/unstable-angular-complete/angular-resource',
    ],
    ngCookies: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.1.4/angular-cookies.min',
      'https://raw.github.com/ryanzec/bower-unstable-angular-complete/1.1.3/angular-cookies.min',
      'components/unstable-angular-complete/angular-cookies'
    ],
    jquery: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
      'components/jquery/jquery'
    ],
    underscore: [
      'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min',
      'components/underscore/underscore'
    ],
    bootstrapSelect: [
      'https://raw.github.com/silviomoreto/bootstrap-select/master/bootstrap-select.min',
      'components/bootstrap-select/bootstrap-select'
    ],
    bootstrapDropdown: [
      'components/sass-bootstrap/js/bootstrap-dropdown'
    ],
    bootstrapTab: [
      'components/sass-bootstrap/js/bootstrap-tab'
    ],
    bootstrapTransition: [
      'components/sass-bootstrap/js/bootstrap-transition'
    ],
    bootstrapCollapse: [
      'components/sass-bootstrap/js/bootstrap-collapse'
    ]
  },
  priority:[
    'angular'
  ],
//  urlArgs: 'v=1.0',
  packages: [
    { name: 'loader-controllers', location: 'js/controllers' },
    { name: 'loader-services', location: 'js/services' },
    { name: 'r.controllers', location: 'js/modules', main: 'controllers' },
    { name: 'r.services', location: 'js/modules', main: 'services' },
    { name: 'ng-app', location: 'js', main: 'app' }
  ]
});

require.onError = function (err) {
  console.log(err.requireType);
  if (err.requireType === 'timeout') {
    console.log('modules: ' + err.requireModules);
  }

  throw err;
};

require([
  // Standard Libs
  'angular',
  'jquery',
  'underscore',
  'bootstrapSelect',
  'bootstrapDropdown',
  'bootstrapTab',
  'bootstrapTransition',
  'bootstrapCollapse',

  'r.services', //Cria
  'loader-services', //Carrega

  'r.controllers', //Cria
  'loader-controllers', //Carrega

  'ng-app'
], function () {

  console.group('Bootstrap dependencies loaded. Starting bootstrap.');
  console.info('Console: ', console);
  console.info('jQuery: ', $);
  console.info('underscore: ', _);
  console.info('Angular: ' , angular);

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['bilgow']);
  });

  console.groupEnd();

  // bootstrapSelect
  $(document).ready(function() {
    $('.selectpicker').selectpicker({
      style: 'btn-select-side btn-large'
    });

    $('#myTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  });
});
