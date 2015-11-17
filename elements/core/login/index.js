import angular from 'angular'
import uirouter from 'angular-ui-router'

import jwtDecode from 'jwt-decode'

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


.run(function($cookies, TokenManager){
  if (TokenManager.isAuthenticated()) {
    TokenManager.setToken($cookies.get('elements_auth_token'))
  }
})


.service('TokenManager', function($cookies, Api){

  function setToken(_token) {
    myModule.token = _token
    myModule.tokenData = jwtDecode(_token)
    Api.root.setDefaultHeaders({ Authorization: 'JWT ' + myModule.token })
    $cookies.put('elements_auth_token', myModule.token)
  }

  function isAuthenticated(){
    return !!$cookies.get('elements_auth_token')
  }

  var myModule = {
    token: '',
    tokenData: {},
    setToken: setToken,
    isAuthenticated: isAuthenticated,
  }

  return myModule
})


.controller('LoginCtrl', function($scope, $state, TokenManager, Api){
  $scope.errors = {}

  function loginSuccessful(data){
    TokenManager.setToken(data.token)
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
