describe('bbEqualizer', function () {
  var $scope;
  var element;
  var $window;
  var $compile;

  beforeEach(module('bbTools'));

  beforeEach(inject(function (_$compile_, $rootScope, _$window_) {
    $scope = $rootScope.$new();
    $window = _$window_;
    $compile = _$compile_;
    element = angular.element('<div bb-equalizer>' +
      '<div bb-equalizer-part="foo" style="height: 100px">Lorem ipsum ' +
      'dolor sit amet, consectetur adipisicing elit. ' +
      'Amet consequatur distinctio laboriosam laudantium ' +
      'maiores necessitatibus quaerat quia rerum ' +
      'tempore voluptatum. Accusantium assumenda autem ' +
      'consequuntur deleniti distinctio eos eveniet, itaque ' +
      'libero nisi non nulla numquam pariatur recusandae reprehenderit ' +
      'saepe! Alias commodi illum maxime molestiae repellendus ' +
      'saepe voluptate! Accusamus illo labore optio.</div>' +
      '<div bb-equalizer-part="bar">None</div></div>');
    $compile(element)($scope);
  }));

  it('should have child parts of non-zero height', function () {
    $scope.$digest();
    var parts = element.find('[bb-equalizer-part]');
    angular.forEach(parts, function (part) {
      expect(angular.element(part).height()).not.toEqual(0);
    });
  });

  it('should have child parts of equal height', function () {
    $scope.$digest();
    var parts = element.find('[bb-equalizer-part]');
    var part0 = angular.element(parts[0]);
    var part1 = angular.element(parts[1]);
    expect(part0.height()).toEqual(part1.height());
  });

  describe('empty equalizer directive', function () {
    beforeEach(function () {
      var html = '<div bb-equalizer></div>';
      element = angular.element(html);
      $compile(element)($scope);
    });

    it('creates an empty parts collection', function () {
      $scope.$digest();
      var scope = element.isolateScope();
      expect(scope.controlledParts.length).toBe(0);
    });
  });

  describe('with one child part directive', function () {
    beforeEach(function () {
      var html = '<div bb-equalizer>' +
        '<div bb-equalizer-part="foo" style="height: 100px;"></div>' +
        '</div>';
      element = angular.element(html);
      $compile(element)($scope);
    });

    it('has one item in its parts collection', function () {
      var scope = element.isolateScope();
      expect(scope.controlledParts.length).toBe(1);
    });

    it('sets the height on the scope for that element', function () {
      $scope.$digest();
      expect(element.isolateScope().height).toEqual(100);
    });
  });

  describe('with two child part directives', function () {
    beforeEach(function () {
      var html = '<div bb-equalizer>' +
        '<div bb-equalizer-part="foo" id="foo" style="height: 100px;"></div>' +
        '<div bb-equalizer-part="bar" style="height: 150px;"></div>' +
        '</div>';
      element = angular.element(html);
      $compile(element)($scope);
    });

    it('has two items in its parts collection', function () {
      var scope = element.isolateScope();
      expect(scope.controlledParts.length).toBe(2);
    });

    it('sets the height on the scope for that element', function () {
      $scope.$digest();
      expect(element.isolateScope().height).toEqual(150);
    });

    it('sets the height of all elements to the max height', function () {
      $scope.$digest();
      expect($('#foo', element).height()).toEqual(150);
    });
  });
});