import angular from 'angular'
import uirouter from 'angular-ui-router'


angular.module('elements', [
  require('elements/api').__name__,
  require('elements/core/cards/cardlist').__name__,
  require('elements/core/login').__name__,
  uirouter,
])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider
    .when('/', 'login')
    .when('', 'login')
    .otherwise('/notFound')

})
