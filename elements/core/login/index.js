import angular from 'angular'
import uirouter from 'angular-ui-router'

import loginTemplate from './templates/login.jade'

module.exports = { __name__: 'login' };

angular.module(module.exports.__name__, [
  require('elements/api').__name__,
  uirouter,
])


.config(function($stateProvider){
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: loginTemplate,
      controller: 'LoginCtrl',
    })
})


.controller('LoginCtrl', function($scope, $state, Api){
  $scope.errors = {}

  function loginSuccessful(data){
    Api.setToken(data.token)
    $state.go('cardlist')
  }

  $scope.login = function(){
    Api.auth_token.post({
      username: $scope.username,
      password: $scope.password,
    }).then(
      loginSuccessful,
      (errors) => $scope.errors = errors
    )
  }
})
