const moduleName = 'cards'
export default moduleName

import angular from 'angular'

import cardListModule from './list'

import cardTemplate from './templates/card.jade'
import './style/card.sass'


angular.module(moduleName, [
  cardListModule,
])


.directive('gameCard', function() {
  return {
    templateUrl: cardTemplate,
    scope: {
      card: '=',
    },
  }
})
