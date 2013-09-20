'use strict';

define( ['angular', 'ngResource', 'ngCookies'], function() {

  return angular.module('bilgow.services', ['ngResource', 'ngCookies'])
    // Definition of Constants
    .constant('apiUrl', 'http://localhost\\:3000')
    .constant('restMethods', {
      'query' : { method: 'GET',      isArray: true },
      'save'  : { method: 'POST'      },
      'update': { method: 'PUT'       },
      'remove': { method: 'DELETE'    },
      'get'   : { method: 'GET'       }
    })
    // Definition of Configs
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
    }]);
});
