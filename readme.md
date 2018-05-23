# vget

Gets a value from a collection that strictly or loosely equals another value.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i vget
```

## API

The module exports a `get()` function that has one other function attached to it as a method: `get.any()`.

### `get()`

#### Parameters

1. Bindable: `collection` (Array, Iterator, Map, Object, Set, string, Typed Array, or WeakSet): The collection from which to retrieve a value.
2. `valueToMatch` (any): The value to retrieve from the collection.
3. Optional: Object argument:
    * `arrays` / `maps` / `sets` / `weakSets` (arrays of classes/strings): Arrays of classes and/or string names of classes that should be treated as equivalent to `Array`/`Map`/`Set`/`WeakSet` (respectively).
    * `elseReturn` (any): A value to return if `valueToMatch` is not found. Defaults to `undefined`.
    * `inObj` (boolean): Whether or not to search inherited properties if `collection` is an Object (i.e. not another recognized type). Defaults to `false`.
    * `loose` (boolean): Whether or not to compare values loosely (as defined by `looselyEquals`). Defaults to `false`.
    * `looselyEquals` (function): A callback that accepts two values and returns `true` if they are to be considered equivalent or `false` otherwise. This argument is only used if `loose` is `true`. If omitted, the default behavior will, among other things, consider arrays/objects to be equal if they have the same entries.
    * `preferStrict` (boolean): Only applies if `loose` is `true`. If `true`, then strictly-identical values will be preferred over loosely-equivalent values. Otherwise, the first loosely-equivalent key found will be used, even if a strictly-identical one comes later. Defaults to `false`.
    * `reflectObj` (boolean): Whether or not to use reflection to include non-enumerable Object property values. Only takes effect if `collection` is an Object (i.e. not another recognized type). Defaults to `false`.

#### Return Values

* Returns a value from the collection that matches the search value either strictly or loosely (depending on the configured options).
* If no such value exists, returns `elseReturn` if provided; otherwise `undefined`.

#### Example

```javascript
const get = require('vget')

const emptyObj = {}
const collection = [emptyObj]

get(collection, {}, {loose: true}) === emptyObj // true
```

### `get.any()`

Use this function if you want to get the first value that matches any one of a set of values. The signature is the same as that of the main function except that the second parameter is called `valuesToMatch` and takes an iterable (such as an array or string).

## Related

The “k” family of modules works on keyed/indexed collections.

* [khas](https://github.com/lamansky/khas)
* [kget](https://github.com/lamansky/kget)
* [kedit](https://github.com/lamansky/kedit)
* [kset](https://github.com/lamansky/kset)
* [kinc](https://github.com/lamansky/kinc)
* [kdel](https://github.com/lamansky/kdel)

The “v” family of modules works on any collection of values.

* [vhas](https://github.com/lamansky/vhas)
* [vsize](https://github.com/lamansky/vsize)
* [vadd](https://github.com/lamansky/vadd)
* [vdel](https://github.com/lamansky/vdel)
