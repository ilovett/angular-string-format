(function(window, angular, undefined) {'use strict';

/**
 * @ngdoc service
 * @name ngStringFormat
 * @description
 * # sformat
 * Factory which provides some helper string formatting functions
 */
angular.module('ngStringFormat', [])
  .factory('sformat', function () {

    var sformatKwargs, sformatNumbers, sformat;

    sformatKwargs = function(string, kwargs) {
      return string.replace(/{([a-zA-Z0-9]+)}/g, function(match, varName) {
        return typeof kwargs[varName] !== 'undefined' ? kwargs[varName] : match;
      });
    };

    sformatNumbers = function(string) {
      var args = Array.prototype.slice.call(arguments, 1);
      return string.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
      });
    };

    sformat = function(string, kwargs) {
      var args = arguments,
          replaced;

      if (args.length === 2 && typeof args[1] === 'object') {
        replaced = sformatKwargs(string, kwargs);
      }
      else {
        replaced = sformatNumbers.apply(this, arguments);
      }

      return replaced;
    };

    return sformat;
  });

})(window, window.angular);
