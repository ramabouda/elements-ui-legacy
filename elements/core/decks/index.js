module.exports = { __name__: 'decks' };

import angular from 'angular'
import uirouter from 'angular-ui-router'

var deckListTemplate = require('./templates/decklist.jade')

angular.module(module.exports.__name__, [
  require('elements/api').__name__,
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
