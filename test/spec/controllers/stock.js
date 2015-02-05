'use strict';

describe('Controller: StockCtrl', function () {

  // load the controller's module
  beforeEach(module('marmixApp'));

  var StockCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StockCtrl = $controller('StockCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
