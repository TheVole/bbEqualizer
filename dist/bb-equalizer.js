(function () {
  'use strict';
  angular.module('bbTools', [])
    .directive('bbEqualizer', ['$window',
      function ($window) {
        return {
          restrict: 'A',

          transclude: true,

          scope: {},

          template: '<div ng-transclude></div>',

          controller: ['$scope', function ($scope) {
            var window = angular.element($window);

            var partInfos = [];

            $scope.$on('$routeChangeSuccess', function () {
              _.remove(partInfos, function (partID) {
                return !partID.keep;
              });
            });

            var partFromID = function (id) {
              return angular.element('[bb-equalizer-part="' + id + '"]');
            };

            this.addPart = function (attr, keep) {
              partInfos.push({id: attr, keep: keep});
            };

            this.removePart = function (attr) {
              _.remove(partInfos, function (aPart) {
                return aPart.id === attr;
              });
            };

            var saveOldHeights = function () {
              var oldHeights = [];
              angular.forEach(partInfos, function (partInfo) {
                var part = partFromID(partInfo.id);
                oldHeights.push(part.height());
                part.css({'transition': 'height 0s', 'height': ''});
              });
              return oldHeights;
            };

            var restoreOldHeights = function (oldHeights) {
              for (var i = 0; i < oldHeights.length; i++) {
                var partID = partInfos[i].id;
                var part = partFromID(partID);
                part.height(oldHeights[i]);
              }
            };

            var getMaxHeight = function () {
              var oldHeights = saveOldHeights();

              var maxPartID = '';
              var maxHeight = 0;

              maxPartID = _.max(partInfos, function (partInfo) {
                return partFromID(partInfo.id).height();
              });
              maxHeight = partFromID(maxPartID.id).height();

              restoreOldHeights(oldHeights);

              return { max: maxHeight, numItems: partInfos.length };
            };

            var setPartsHeight = function (height) {
              angular.forEach(partInfos, function (partInfo) {
                var part = partFromID(partInfo.id);
                part.height(height);
              });
            };

            $scope.$watch(getMaxHeight, function (newValue, oldValue) {
              setPartsHeight(newValue.max);
            }, true);

            window.on('resize', function () {
              $scope.$apply();
            });
          }
          ]
        };
      }])

    .directive('bbEqualizerPart', function () {
      return {
        restrict: 'A',
        require: '^bbEqualizer',
        transclude: true,
        template: '<div ng-transclude></div>',
        link: function (scope, element, attrs, equalizerCtrl) {
          var attr = attrs.bbEqualizerPart;
          var keep = attrs.keep;
          equalizerCtrl.removePart(attr);
          equalizerCtrl.addPart(attr, keep);
        }
      };
    });
})();