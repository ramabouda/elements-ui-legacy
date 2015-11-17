module.exports = { __name__: 'lib.angular-rest-helpers' };

var angular = require('angular');
var queryString = require('query-string');

angular.module(module.exports.__name__, [])

.constant('HttpStatus', {
  OK: 200,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
})

.factory('NgRestHelpers', [function() {

  function parseUri(uri) {
    // https://gist.github.com/jlong/2428561
    var parser = document.createElement('a');
    parser.href = uri;
    return {
      protocol: parser.protocol,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      hash: parser.hash,
      host: parser.host,
    };
  }

  function getParams(uri) {
    if (uri) {
      return queryString.parse(parseUri(uri).search);
    }
    return {};
  }

  function url2uid(url) {
    if (!url || !url.length) {
      return null;
    }

    var words = url.split('/');
    words.pop();
    return words.pop();
  }

  return {
    getParams: getParams,
    parseUri: parseUri,
    url2uid: url2uid,
  };
}])

.factory('NgRestInterceptors', function($injector, $state, NgRestHelpers) {

  function paginationInterceptor(endpoint) {
    /* Recursively get paginated endpoints, with a limit.
     * Assumes the 'metadataInterceptor' has already been
     * applied (getList returns collections)
     * The default limit is 10 pages.
     */
    return function(params, _maxPages) {
      var accumulator = [];
      var count = 1; // first iteration is always executed
      var maxPages = _maxPages || 10;

      function recursiveGet(page) {
        var _params = angular.copy(params);
        if (page.next && count < maxPages) {
          count = count + 1;
          _params = NgRestHelpers.getParams(page.next);
          return endpoint.getList(_params).then(function(answer) {
            accumulator = accumulator.concat(answer);
            return recursiveGet(answer);
          });
        }

        return accumulator;
      }

      return endpoint.getList(params).then(function(answer) {
        accumulator = answer;
        return recursiveGet(answer);
      });
    };
  }

  function defaultPaginationTransformer(endpoint) {
    endpoint.getFullList = paginationInterceptor(endpoint);
    return endpoint;
  }

  function objectToListInterceptor(answer, operation) {
    /* This interceptor makes all getList() operations return _LISTS_,
     * on which you have a length and can iterate.
     * Params such as next, previous and meta are then embedded into
     * the lists' object.
     */
    if (operation === 'getList') {
      var ret = answer.results;
      angular.extend(ret, {
        meta: answer.meta || null,
        next: answer.next,
        previous: answer.previous,
      });
      return ret;
    }

    return answer;
  }

  function errorInterceptor(response) {
    if (response.status === 401) {
      $state.go('login')
      return false; // error handled
    }
    return true; // error not handled
  }

  return {
    objectToList: objectToListInterceptor,
    pagination: paginationInterceptor,
    defaultPaginationTransformer: defaultPaginationTransformer,
    errorInterceptor: errorInterceptor,
  };
});
