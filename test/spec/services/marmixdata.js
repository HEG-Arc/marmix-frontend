'use strict';

describe('Service: MarmixData', function () {

  // load the service's module
  beforeEach(module('marmixApp'));

  // instantiate service
  var MarmixData;
  beforeEach(inject(function (_MarmixData_) {
    MarmixData = _MarmixData_;
  }));

  it('should do something', function () {
    expect(!!MarmixData).toBe(true);
  });

});
