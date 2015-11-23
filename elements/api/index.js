module.exports = { __name__: 'api' };

import angular from 'angular'
import restangular from 'restangular' /* eslint no-unused-vars: 0 */

import settings from 'elements/settings'


angular.module(module.exports.__name__, [
  'restangular',
  require('elements/lib/restangularHelpers').__name__,
  require('elements/core/login').__name__,
])


.service('Api', function(Restangular, NgRestInterceptors) {
  var root
  var url
  var baseUrl;
  var fields = [
    'cards',
    'decks',
    'auth_token',
    'auth_token_refresh',
  ]

  function setUrl(_url) {
    url = _url;
    root.setBaseUrl(url)
    baseUrl = apiObject.root.one('/').getRequestedUrl();
  }

  // Config
  root = Restangular.withConfig(function(instance) {
    instance
      .setResponseInterceptor(NgRestInterceptors.objectToList)
      .setBaseUrl(url)
      .setRequestSuffix('/')
      .setDefaultHttpFields({ cache: false })
      .setErrorInterceptor(NgRestInterceptors.errorInterceptor);
  });


  var apiObject = {
    root: root,
    token: '',
    baseUrl: baseUrl,
    setUrl: setUrl,
  }

  setUrl(settings.apiUrl)

  // Define fields
  _.each(fields, function(field){
    root.addElementTransformer(field, true, NgRestInterceptors.defaultPaginationTransformer);
    apiObject[field] = root.all(field)
  })

  return apiObject
})
