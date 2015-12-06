const moduleName = 'cards'
export default moduleName

import angular from 'angular'

import cardListModule from './list'

import './style/card.sass'


angular.module(moduleName, [
  cardListModule,
])

.directive('deckCard', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    template: '<h3>Hello World!!</h3>',
  }
})
