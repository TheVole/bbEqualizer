describe('bbEqualizer', function () {
  var $scope;
  var element;
  var $window;
  var $document;

  beforeEach(module('bbTools'));

  beforeEach(inject(function ($compile, $rootScope, _$window_, _$document_) {
    $scope = $rootScope;
    $window = _$window_;
    $document = _$document_;
    element = angular.element('<div bb-equalizer>' +
      '<div bb-equalizer-part="foo">Lorem ipsum ' +
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
    $document.find('body').prepend(element);
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
});