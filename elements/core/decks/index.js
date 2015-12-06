const moduleName = 'decks'
export default moduleName

import angular from 'angular'
import uirouter from 'angular-ui-router'

import apiModule from 'elements/api'

import deckListTemplate from './templates/decklist.jade'


angular.module(moduleName, [
  apiModule,
  uirouter,
])

.config(function($stateProvider){
  $stateProvider
    .state('decklist', {
      url: '/decks',
      templateUrl: deckListTemplate,
      controller: 'DeckListCtrl',
    })
})

.controller('DeckListCtrl', function($q, $scope, Api){
  $q.all({
    decks: Api.decks.getList(),
    cards: Api.cards.getList(),
  }).then(function(results){
    _.extend($scope, results)
  })
})
