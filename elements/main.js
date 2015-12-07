import angular from 'angular'
import uirouter from 'angular-ui-router'
import ngCookies from 'angular-cookies'

import apiModule from 'elements/api'
import cardsModule from 'elements/core/cards'
import decksModule from 'elements/core/decks'
import loginModule from 'elements/core/login'

import 'elements/core/common/style/common.sass'

import menuTemplate from 'elements/core/common/templates/menu.jade'
import libraryTemplate from 'elements/core/common/templates/library.jade'


angular.module('elements', [
  // libs
  uirouter,
  ngCookies,

  // custom libs
  apiModule,

  // app
  cardsModule,
  decksModule,
  loginModule,
])

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('library', {
      abstract: true,
      url: '',
      views: {
        '': {
          templateUrl: libraryTemplate,
        },
        'menu@library': {
          templateUrl: menuTemplate,
        },
      },
    })

  $urlRouterProvider
    .when('/', '/cards')
    .when('', '/cards')
    .otherwise('/notFound')

})

.run(function($rootScope, $log){
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    $log.debug('> [stateChangeStart]', toState.name, toParams);
  })
})
