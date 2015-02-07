'use strict';

describe('Service: sessionRecoverer', function () {

  // load the service's module
  beforeEach(module('marmixApp'));

  // instantiate service
  var sessionRecoverer;
  beforeEach(inject(function (_sessionRecoverer_) {
    sessionRecoverer = _sessionRecoverer_;
  }));

  it('should do something', function () {
    expect(!!sessionRecoverer).toBe(true);
  });

});
