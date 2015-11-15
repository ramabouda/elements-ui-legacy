module.exports = { __name__: 'api' };

import angular from 'angular'
import restangular from 'restangular' /* eslint no-unused-vars: 0 */

import settings from 'elements/settings'


angular.module(module.exports.__name__, [
  'restangular',
  require('elements/lib/restangularHelpers').__name__,
])


.service('Api', function(Restangular, NgRestInterceptors) {
  var root
  var url
  var baseUrl;
  var fields = ['cards', 'auth_token']
  var token

  function setToken(_token) {
    token = _token
    apiObject.root.setDefaultHeaders({ Authorization: 'JWT ' + token })
  }

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
  });


  var apiObject = {
    root: root,
    baseUrl: baseUrl,
    setToken: setToken,
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
