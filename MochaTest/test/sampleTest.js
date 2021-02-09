var assert = require('chai').assert;
var sample = require('../sample');

describe('Sample', function() {
    it('sample should return hello world', function() {
        assert.equal(sample(), 'hello world');
    });
});