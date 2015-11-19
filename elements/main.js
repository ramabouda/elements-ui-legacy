import angular from 'angular'
import uirouter from 'angular-ui-router'
import ngCookies from 'angular-cookies'

import commonCss from 'elements/core/common/style/common.sass'

angular.module('elements', [
  require('elements/api').__name__,
  require('elements/core/cards/cardlist').__name__,
  require('elements/core/login').__name__,
  uirouter,
  ngCookies,
])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider
    .when('/', 'cards')
    .when('', 'cards')
    .otherwise('/notFound')

})

.run(function($rootScope, $log){
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    $log.debug('> [stateChangeStart]', toState.name, toParams);
  })
})
