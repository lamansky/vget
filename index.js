'use strict'

const equals = require('equals')
const is = require('is-instance-of')
const iterify = require('iterify')
const otherwise = require('otherwise')
const values = require('values-iterator')
const xfn = require('xfn')

const notFound = Symbol('notFound')

module.exports = xfn({
  pluralArg: 1,
  pluralProp: 'any',
}, function get (collection, valuesToMatch, {loose, looselyEquals = equals, preferStrict, weakSets = [], ...options} = {}) {
  let looseMatch = notFound
  valuesToMatch = iterify(valuesToMatch)
  if (is(collection, ['WeakSet', weakSets])) {
    for (const m of valuesToMatch) if (collection.has(m)) return m
    return otherwise(options)
  }
  for (const v of values(collection, options)) {
    for (const m of valuesToMatch) {
      if (m === v) return v
      if (loose && looselyEquals(m, v)) {
        if (preferStrict) {
          if (looseMatch === notFound) { looseMatch = v; break }
        } else {
          return v
        }
      }
    }
  }
  return looseMatch === notFound ? otherwise(options) : looseMatch
})
