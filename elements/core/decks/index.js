const moduleName = 'decks'
export default moduleName

import angular from 'angular'
import uirouter from 'angular-ui-router'
import uiboostrap from 'angular-ui-bootstrap'

import apiModule from 'elements/api'
import cardsModule from 'elements/core/cards'

import deckListTemplate from './templates/decklist.jade'
import createDeckTemplate from './templates/create.jade'


angular.module(moduleName, [
  apiModule,
  cardsModule,
  uirouter,
  uiboostrap,
])


.config(function($stateProvider){
  $stateProvider
    .state('library.deck', {
      url: '/deck',
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        resDecks: (Api) => Api.decks.getList(),
        resCards: (Api) => Api.cards.getList(),
      },
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
    .state('library.deck.edit', {
      url: '/edit/:deckId',
      templateUrl: createDeckTemplate,
      controller: 'DeckCreateCtrl',
    })
})


.controller('DeckListCtrl', function(
  $q, $scope, $uibModal,
  resDecks, resCards
){
  $scope.decks = resDecks
  $scope.cardsbyId = {}
  _.each(resCards, function(card){
    $scope.cardsbyId[card.id] = card
  })
})


.controller('DeckCreateCtrl', function($scope, $stateParams, Api, resDecks, resCards){
  $scope.deck = {
    name: '',
    cards: {},
  }
  if ($stateParams.deckId !== undefined) {
    $scope.deck = resDecks.filter(deck => deck.id === parseInt($stateParams.deckId, 10))[0]
  }

  $scope.cards = resCards
  $scope.cardsbyId = {}
  _.each(resCards, function(card){
    $scope.cardsbyId[card.id] = card
  })

  $scope.validate = function(){
    if ($scope.createDeckForm.$valid) {
      Api.decks.post({name: $scope.name})
    }
  }
})

