'use strict';

/**
 * @ngdoc service
 * @name marmixApp.sessionRecoverer
 * @description
 * # sessionRecoverer
 * Factory in the marmixApp.
 */
angular.module('marmixApp')
  .factory('sessionRecoverer', function ($q, $injector, $window) {
    var sessionRecoverer = {
        responseError: function(response) {
            // no session
            console.log(response);
            if (response.status === 403 || response.status === 0){
                var $http = $injector.get('$http');
                var deferred = $q.defer();

                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                $http.post('https://m3.marmix.ch/api/v1/auth/login/',
                  {username:'marmix', password: $window.prompt('password')}
                ).then(deferred.resolve, deferred.reject);

                // When the session recovered, make the same backend call again and chain the request
                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            return $q.reject(response);
        }
    };
    return sessionRecoverer;
  });
