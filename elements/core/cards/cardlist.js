module.exports = { __name__: 'cards' };

import angular from 'angular'
import uirouter from 'angular-ui-router'

import cardCss from './style/card.sass'
import cardListCss from './style/cardlist.sass'

var template = require('./templates/cardlist.jade')

angular.module(module.exports.__name__, [
  require('elements/api').__name__,
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
