const moduleName = 'cards'
export default moduleName

import angular from 'angular'

import cardListModule from './list'

import cardTemplate from './templates/card.jade'
import cardSmallTemplate from './templates/card_small.jade'
import './style/card.sass'


angular.module(moduleName, [
  cardListModule,
])


.directive('gamecard', function($rootScope) {
  return {
    templateUrl: function(element, attrs) {
      return attrs.size === 'small' ? cardSmallTemplate : cardTemplate
    },
    scope: {
      card: '=',
      context: '@',
    },
    link: function(scope, element) {
      scope.element = element
      element.on('click', () => $rootScope.$broadcast('card.click', scope))
    },
  }
})
