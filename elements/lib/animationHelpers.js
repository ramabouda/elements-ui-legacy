const moduleName = 'AnimationHelpers'
export default moduleName

import angular from 'angular'


angular.module(moduleName, [])

.service('AnimationHelpers', function() {
  function cleanWhenFinished(element, animation, callback) {
    element.one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      () => {
        element.removeClass('animated ' + animation)
        if (callback) callback()
      }
    )
  }

  function addCleanAnimation(element, animation, callback) {
    element.addClass('animated ' + animation)
    cleanWhenFinished(element, animation, callback)
  }

  return {
    cleanWhenFinished: cleanWhenFinished,
    addCleanAnimation: addCleanAnimation,
  }
})
