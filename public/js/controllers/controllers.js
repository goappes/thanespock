var ctrl = angular.module('myApp.controllers', []);

ctrl.controller('MyCtrl', ['$scope', '$q', 'pp', function($scope, $q, pp) {
  
  $scope.score = {};
  
  $q.all([
    pp.getScore('1'),
    pp.getScore('2'),
    pp.getScore('3')
  ]).then(function(res) {
      $scope.score['1'] = res[0];
      $scope.score['2'] = res[1];
      $scope.score['3'] = res[2]
    });
  
  $scope.incScore = function(id) {
    pp.add(id)
      .then(function(res) {
        return pp.getScore(id);
      })
      .then(function(score) {
        $scope.score[id] = score;
      })
  }
  
}]);

ctrl.controller('TodoCtrl', ['$scope', 'listener', 'pp', function($scope, listener, pp) {

  $scope.submit = function() {
    pp.add($scope.text).then(function(res) {
      $scope.text = '';
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.remove = function(id) {
    pp.remove(id).then(function(res) {
//      console.log(res);
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.todos = [];

  $scope.$on('newTodo', function(event, todo) {
    $scope.todos.push(todo);
  });

  $scope.$on('delTodo', function(event, id) {
    for (var i = 0; i<$scope.todos.length; i++) {
      if ($scope.todos[i]._id === id) {
        $scope.todos.splice(i,1);
      }
    }
  });

}]);