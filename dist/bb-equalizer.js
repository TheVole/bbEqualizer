(function () {
  'use strict';
  angular.module('bbTools', [])
    .directive('bbEqualizer', ['$window',
      function ($window) {
        return {
          restrict: 'A',

          transclude: true,

          template: '<div ng-transclude></div>',

          scope: {
            name: '@'
          },

          controller: function ($scope) {
            var controlledParts = Object.create(null);

            parts = function () {
              return _.values(controlledParts);
            };

            var w = angular.element($window);
            w.bind('resize', recalc);

            this.addPart = function (name, part) {
              controlledParts[name] = part;
            };

            function recalc() {
              angular.forEach(parts(), function (partElem) {
                partElem.css('height', 'auto');
                partElem.css({'transition': 'height 0s', 'height': ''});
              });
              var height = calculateHeight(parts());
              setAllPartsToHeight(height);
              console.log("Parts count:", parts().length);
            }

            this.recalc = function () {
              recalc();
            };

            $scope.$watch('controlledParts', function (newValue, oldValue) {
              var height = calculateHeight(newValue);
              setAllPartsToHeight(height);
            });

            function calculateHeight(newValue) {
              var parts = _.values(newValue);
              var tallest = _(parts).map(function (partElement) {
                return partElement.height();
              });
              var max = tallest.max().value();
              return max;
            }

            function setAllPartsToHeight(height) {
              angular.forEach(parts(), function (partElem) {
                partElem.height(height + 'px');
              });
            }

          }
        };

      }])

    .directive('bbEqualizerPart', ['$timeout',
      function ($timeout) {
        return {
          restrict: 'A',
          require: '^bbEqualizer',
          scope: {
            name: '@',
            refreshOn: '=bbRefreshOn'
          },
          transclude: true,
          replace: true,
          template: '<div ng-transclude></div>',
          link: function (scope, element, attrs, equalizer) {
            equalizer.addPart(attrs.name, element);
            scope.$watchCollection('refreshOn', function () {
              $timeout(
                equalizer.recalc,
                10
              );
            });
          }
        };
      }]);
})();