import angular from 'angular'
import uirouter from 'angular-ui-router'

import settings from 'elements/settings'


angular.module('elements', [
  require('elements/api').__name__,
  require('elements/core/cards/cardlist').__name__,
  uirouter,
])

.config(function($stateProvider, $urlRouterProvider, ApiProvider){
  ApiProvider.setUrl(settings.apiUrl)

  $urlRouterProvider.otherwise('/notFound')


})
