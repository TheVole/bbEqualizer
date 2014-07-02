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

          controller: ['$scope',
            function ($scope) {
            var controlledParts = $scope.controlledParts = [];

            var parts = function (partCollection) {
              var partsSet = partCollection || controlledParts;
              return _.map(partsSet, function (part) {
                return part.part;
              });
            };

            $scope.$on('$routeChangeSuccess', function () {
              _.remove(controlledParts, function (part) {
                return !part.keep;
              });
            });

            var w = angular.element($window);
            w.bind('resize', recalc);

            this.addPart = function (part, keep) {
              controlledParts.push({part: part, keep: keep});
            };

            function recalc() {
              angular.forEach(parts(), function (partElem) {
                partElem.css('height', 'auto');
                partElem.css({'transition': 'height 0s', 'height': ''});
              });
              var height = calculateHeight(parts());
              setAllPartsToHeight(height);
            }

            this.recalc = function () {
              recalc();
            };

            $scope.$watch('controlledParts', function (newValue, oldValue) {
              var partsCollection = parts(newValue);
              var height = calculateHeight(partsCollection);
              setAllPartsToHeight(height);
            });

            function calculateHeight(parts) {
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
              $scope.height = height;
            }

          }
]        };

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
            equalizer.addPart(element, attrs.keep);
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