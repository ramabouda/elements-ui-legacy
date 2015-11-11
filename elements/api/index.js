module.exports = { __name__: 'api' };

import angular from 'angular'
import restangular from 'restangular'

angular.module(module.exports.__name__, [
  'restangular',
  require('elements/lib/restangularHelpers').__name__,
])


.provider('Api', function() {
  var url = '';

  return {
    setUrl: function(_url) {
      url = _url;
      return url;
    },

    $get: ['Restangular', 'NgRestInterceptors', function(Restangular, NgRestInterceptors) {
      var root;
      var baseUrl;

      root = Restangular.withConfig(function(instance) {
        instance
          .setResponseInterceptor(NgRestInterceptors.objectToList)
          .setBaseUrl(url)
          .setRequestSuffix('/')
          .setDefaultHttpFields({cache: false})
      });
      root.addElementTransformer('cards', true, NgRestInterceptors.defaultPaginationTransformer);
      baseUrl = root.one('/').getRequestedUrl();

      return {
        root: root,
        baseUrl: baseUrl,

        cards: root.all('cards'),
      };
    }],
  };
});
