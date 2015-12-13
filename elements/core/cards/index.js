const moduleName = 'cards'
export default moduleName

import angular from 'angular'

import cardListModule from './list'

import cardTemplate from './templates/card.jade'
import './style/card.sass'


angular.module(moduleName, [
  cardListModule,
])


.directive('gameCard', function($rootScope) {
  return {
    templateUrl: cardTemplate,
    scope: {
      card: '=',
      context: '@',
    },
    link: function(scope, element) {
      element.on('click', () => $rootScope.$broadcast('card.click', scope))
    },
  }
})
