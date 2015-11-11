module.exports = { __name__: 'cards' };

import angular from 'angular'
import uirouter from 'angular-ui-router'

import style from './style/base.sass'


angular.module(module.exports.__name__, [
  require('elements/api').__name__,
  'ui.router',
])

.config(function($stateProvider){
  $stateProvider
    .state('cardlist', {
      url: "/cards",
      templateUrl: require('./templates/cardlist.jade'),
      controller: "CardListCtrl",
    })
})

.controller('CardListCtrl', function(Api){
  Api.cards.getList().then(function(data){

    debugger
  })
})
