angular.module('bbTools', [])
  .directive('bbEqualizer', ['$window',
    function ($window) {
      return {
        restrict: 'A',

        transclude: true,

        scope: {},

        template: '<div ng-transclude></div>',

        controller: function ($scope) {
          var window = angular.element($window);
          var partIDs = [];

          var partFromID = function (id) {
            return angular.element('[bb-equalizer-part="' + id + '"]');
          };

          this.addPart = function (attr) {
            partIDs.push(attr);
          };

          this.removePart = function (attr) {

            for (var i = 0; i < partIDs.length; i++) {
              var aPartID = partIDs[i];
              if (aPartID === attr) {
                partIDs.splice(i, 1);
                break;
              }
            }
          };

          var saveOldHeights = function () {
            var oldHeights = [];
            angular.forEach(partIDs, function (partID) {
              var part = partFromID(partID);
              oldHeights.push(part.height());
              part.css({'transition': 'height 0s', 'height': ''});
            });
            return oldHeights;
          };

          var restoreOldHeights = function (oldHeights) {
            for (var i = 0; i < oldHeights.length; i++) {
              var partID = partIDs[i];
              var part = partFromID(partID);
              part.height(oldHeights[i]);
            }
          };

          var getMaxHeight = function () {
            var oldHeights = saveOldHeights();

            var maxPartID = '';
            var maxHeight = 0;
            angular.forEach(partIDs, function (partID) {
              var part = partFromID(partID);
              if (part.height() > maxHeight) {
                maxHeight = part.height();
                maxPartID = partID;
              }
            });

            restoreOldHeights(oldHeights);

            return { max: maxHeight, num_items: partIDs.length };
          };

          var setPartsHeight = function (height) {
            angular.forEach(partIDs, function (partID) {
              var part = partFromID(partID);
              part.height(height);
            });
          };

          $scope.$watch(getMaxHeight, function (newValue, oldValue) {
            setPartsHeight(newValue.max);
          }, true);

          window.on('resize', function () {
            $scope.$apply();
          })
        }

      }
    }])

  .directive('bbEqualizerPart', function () {
    return {
      restrict: 'A',
      require: '^bbEqualizer',
      transclude: true,
      template: '<div ng-transclude></div>',
      link: function (scope, element, attrs, equalizerCtrl) {
        var attr = attrs.bbEqualizerPart;
        equalizerCtrl.removePart(attr);
        equalizerCtrl.addPart(attr);
      }
    }
  });