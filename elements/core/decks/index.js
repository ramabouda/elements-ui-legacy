const moduleName = 'decks'
export default moduleName

import angular from 'angular'
import uirouter from 'angular-ui-router'
import uiboostrap from 'angular-ui-bootstrap'

import apiModule from 'elements/api'

import deckListTemplate from './templates/decklist.jade'
import createDeckTemplate from './templates/create.jade'


angular.module(moduleName, [
  apiModule,
  uirouter,
  uiboostrap,
])


.config(function($stateProvider){
  $stateProvider
    .state('library.deck', {
      url: '/deck',
      abstract: true,
      template: '<ui-view/>',
    })
    .state('library.deck.list', {
      url: '/list',
      templateUrl: deckListTemplate,
      controller: 'DeckListCtrl',
    })
    .state('library.deck.create', {
      url: '/create',
      templateUrl: createDeckTemplate,
      controller: 'DeckCreateCtrl',
    })
})


.controller('DeckListCtrl', function($q, $scope, $uibModal, Api){
  $q.all({
    decks: Api.decks.getList(),
    cards: Api.cards.getList(),
  }).then(function(results){
    _.extend($scope, results)
  })
})


.controller('DeckCreateCtrl', function($scope, Api){
  $scope.name = ''

  $scope.validate = function(){
    if ($scope.createDeckForm.$valid) {
      Api.decks.post({name: $scope.name})
    }
  }
})

