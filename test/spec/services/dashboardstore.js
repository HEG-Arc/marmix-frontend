'use strict';

describe('Service: dashboardStore', function () {

  // load the service's module
  beforeEach(module('marmixApp'));

  // instantiate service
  var dashboardStore;
  beforeEach(inject(function (_dashboardStore_) {
    dashboardStore = _dashboardStore_;
  }));

  it('should do something', function () {
    expect(!!dashboardStore).toBe(true);
  });

});
