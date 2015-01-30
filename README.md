# flight-with-resources

[![Build Status](https://secure.travis-ci.org/ahume/flight-with-resources.png)](http://travis-ci.org/ahume/flight-with-resources)

A [Flight](https://github.com/flightjs/flight) mixin for sharing named resources between components. A component can provide a resource into a central registry which other components can subsequently request. On component teardown any provided resources are removed.

## Installation

```bash
bower install --save flight-with-resources
```

## Example

Here's an example of two component definitions that use `withResources` to share `appManifest` data.

```js
function providingComponent() {
    this.after('initialize', function () {
        this.provideResource('appManifest', {
            versionNo: '1.0.1',
            buildNo: '1234',
            url: 'https://tweetdeck.twitter.com'
        });
    });
}

function requestingComponent() {
    this.after('initialize', function () {
        var versionNo = this.requestResource('appManifest').versionNo;
    });
}
```

## API

### `provideResource`

`provideResource`, takes as string that uniquely identifies the resource being provided, and then either the resource itself or a 'provider function' that, when called, returns the resource:

```js
this.provideResource('version', '1.2.3');

this.provideResource('config', {
    ponies: true,
    kittens: false
});

this.provideResource('kitten', function () {
    return {
        name: 'Fluffy',
        coat: 'Ginger',
        disposition: 'Misunderstood'
    };
});
```

When a resource is requested, the request may also pass configuration data which will be passed to the providing function:

```js
this.provideResource('custom-kitten', function (config) {
    return {
        name: config.name || 'Fluffy',
        coat: config.coat || 'Ginger',
        disposition: config.disposition || 'Misunderstood'
    };
});

this.requestResource('custom-kitten', {
    name: 'Jasper',
    coat: 'Black'
});
```

There can only be one resource for any given name, and first-registration wins.

### `requestResource`

`requestResource` takes the name of the resource to be requested and (optional) configuration data to be passed to the providing function, and returns the requested resource.

If the resource has not been registered, `requestResource` will throw.

var fluffyKitten = this.requestResource('kitten');
var fluffyKitten = this.requestResource('custom-kitten', {
    name: 'Tibbles',
    coat: 'Tortoiseshell'
});

### `removeResource`

`removeResource` takes the name of a resource to be removed and unregisters it so that futher requests will throw.


## Development

Development of this component requires [Bower](http://bower.io) to be globally
installed:

```bash
npm install -g bower
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install & bower install
```

To continuously run the tests in Chrome during development, just run:

```bash
npm run watch-test
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
