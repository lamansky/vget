'use strict'

const assert = require('assert')
const get = require('.')

const elseReturn = Symbol('elseReturn')
const v = Symbol('v')

describe('get()', function () {
  it('should return a value as-is if contained in an array', function () {
    assert.strictEqual(get([123], 123), 123)
  })

  it('should return a value as-is if contained in a Map', function () {
    assert.strictEqual(get(new Map([['key', v]]), v), v)
  })

  it('should return a value as-is if contained in an object', function () {
    assert.strictEqual(get({k: v}, v), v)
  })

  it('should return a value as-is if contained in a Set', function () {
    assert.strictEqual(get(new Set([v]), v), v)
  })

  it('should return a value as-is if contained in a WeakSet', function () {
    const obj = {}
    assert.strictEqual(get(new WeakSet([obj]), obj), obj)
  })

  it('should return undefined if not contained in an array', function () {
    assert.strictEqual(typeof get([], 123), 'undefined')
  })

  it('should return undefined if not contained in a Map', function () {
    assert.strictEqual(typeof get(new Map([['key', 'value']]), v), 'undefined')
  })

  it('should return undefined if not contained in an object', function () {
    assert.strictEqual(typeof get({}, v), 'undefined')
  })

  it('should return undefined if not contained in a Set', function () {
    assert.strictEqual(typeof get(new Set(), v), 'undefined')
  })

  it('should return undefined if not contained in a WeakSet', function () {
    assert.strictEqual(typeof get(new WeakSet(), {}), 'undefined')
  })

  it('should return `elseReturn` if not contained in an array', function () {
    assert.strictEqual(get([], 123, {elseReturn}), elseReturn)
  })

  it('should return `elseReturn` if not contained in a Map', function () {
    assert.strictEqual(get(new Map([['key', 'value']]), v, {elseReturn}), elseReturn)
  })

  it('should return `elseReturn` if not contained in an object', function () {
    assert.strictEqual(get({}, v, {elseReturn}), elseReturn)
  })

  it('should return `elseReturn` if not contained in a Set', function () {
    assert.strictEqual(get(new Set(), v, {elseReturn}), elseReturn)
  })

  it('should return `elseReturn` if not contained in a WeakSet', function () {
    assert.strictEqual(get(new WeakSet(), {}, {elseReturn}), elseReturn)
  })

  it('should return first loose match if `loose` is true', function () {
    const arr = []
    assert.strictEqual(get([arr], [], {loose: true}), arr)
  })

  it('should favor strictly-identical values if `preferStrict` is true', function () {
    const arr1 = []
    const arr2 = []
    assert.strictEqual(get([arr1, arr2], arr2, {loose: true}), arr1)
    assert.strictEqual(get([arr1, arr2], arr2, {loose: true, preferStrict: true}), arr2)
  })

  it('should support the bind operator', function () {
    assert.strictEqual(get.call([123], 123), 123)
  })

  describe('#any()', function () {
    it('should return the first matching value', function () {
      assert.strictEqual(get.any([1, 2, 3], [2, 3]), 2)
    })

    it('should accept a single value', function () {
      assert.strictEqual(get.any([1, 2, 3], 2), 2)
    })

    it('should return undefined if no match is found', function () {
      assert.strictEqual(typeof get.any(new Map([['key', 'value']]), [v]), 'undefined')
    })

    it('should return `elseReturn` if no match is found', function () {
      assert.strictEqual(get.any([], [123], {elseReturn}), elseReturn)
    })

    it('should work on strings', function () {
      assert.strictEqual(get.any('test', 'aeiou'), 'e')
      assert.strictEqual(typeof get.any('xyz', 'aeiou'), 'undefined')
    })

    it('should support the bind operator', function () {
      assert.strictEqual(get.any.call([1, 2, 3], [2, 3]), 2)
    })
  })
})
