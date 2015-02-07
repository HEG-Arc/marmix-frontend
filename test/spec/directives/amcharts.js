'use strict';

describe('Directive: amCharts', function () {

  // load the directive's module
  beforeEach(module('marmixApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<am-charts></am-charts>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the amCharts directive');
  }));
});
