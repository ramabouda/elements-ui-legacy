const moduleName = 'cards.list'
export default moduleName

import angular from 'angular'
import uirouter from 'angular-ui-router'

import apiModule from 'elements/api'

import './style/card.sass'
import './style/list.sass'

import template from './templates/list.jade'


angular.module(moduleName, [
  apiModule,
  uirouter,
])

.config(function($stateProvider){
  $stateProvider
    .state('cardlist', {
      url: '/cards',
      templateUrl: template,
      controller: 'CardListCtrl',
    })
})

.controller('CardListCtrl', function($scope, Api){
  Api.cards.getList().then(function(data){

    $scope.cards = data
  })
})
