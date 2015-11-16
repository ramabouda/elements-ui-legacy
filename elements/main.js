import angular from 'angular'
import uirouter from 'angular-ui-router'
import ngCookies from 'angular-cookies'


angular.module('elements', [
  require('elements/api').__name__,
  require('elements/core/cards/cardlist').__name__,
  require('elements/core/login').__name__,
  uirouter,
  ngCookies,
])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider
    .when('/', 'login')
    .when('', 'login')
    .otherwise('/notFound')

})

.run(function($rootScope, $log, $state, Api){
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    $log.debug('> [stateChangeStart]', toState.name, toParams);

    if (toState.name !== 'login' && !Api.isAuthenticated()) {
      event.preventDefault()  // Cancel previous state
      $state.go('login')
      return
    }
  })
})
