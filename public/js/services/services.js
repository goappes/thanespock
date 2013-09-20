// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);
  
services.value('version', '0.1');

services.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
}]);

services.factory('pouchdb', function() {
  var mydb = new Pouch('ng-pouch');
  Pouch.replicate('ng-pouch', 'http://localhost:3000/db/', {continuous: true});
  Pouch.replicate('http://localhost:3000/db/', 'ng-pouch', {continuous: true});
  return mydb;
});


services.factory('pp', function($q, pouchdb, $rootScope) {
  
  return {
    add: function(playerId) {
      var deferred = $q.defer();
      var doc = {
        type: 'goal',
        playerId: playerId
      };
      pouchdb.post(doc, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      });
      return deferred.promise;
    },
    getScore: function(playerId) {
      var deferred = $q.defer();
      var map = function(doc) {
        if (doc.type === 'goal') {
          emit(doc.playerId, null)
        }
      };
      pouchdb.query({map: map, reduce: '_count'}, {key: playerId}, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            if (!res.rows.length) {
              deferred.resolve(0);
            } else {
              deferred.resolve(res.rows[0].value);
            }
          }
        });
      });
      return deferred.promise;
    },
    remove: function(id) {
      var deferred = $q.defer();
      pouchdb.get(id, function(err, doc) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            pouchdb.remove(doc, function(err, res) {
              $rootScope.$apply(function() {
                if (err) {
                  deferred.reject(err)
                } else {
                  deferred.resolve(res)
                }
              });
            });
          }
        });
      });
      return deferred.promise;
    }
  }
  
});

services.factory('listener', ['$rootScope', 'pouchdb', function($rootScope, pouchdb) {

  pouchdb.changes({
    continuous: true,
    onChange: function(change) {
      if (!change.deleted) {
        $rootScope.$apply(function() {
          pouchdb.get(change.id, function(err, doc) {
            $rootScope.$apply(function() {
              if (err) console.log(err);
              $rootScope.$broadcast('newTodo', doc);
            })
          });
        })
      } else {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('delTodo', change.id);
        });
      }
    }
  })
}]);