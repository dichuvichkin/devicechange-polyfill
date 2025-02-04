# devicechange-polyfill

[![npm version](https://img.shields.io/npm/v/devicechange-polyfill.svg)](https://www.npmjs.com/package/devicechange-polyfill)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A polyfill for the [`navigator.mediaDevices.ondevicechange`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/devicechange_event) event that reliably detects changes to media devices (including Bluetooth and USB audio devices) on unsupported browsers—specifically on Android Chrome, Opera Android, Samsung Internet, and Android WebView.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Using `addEventListener`](#using-addeventlistener)
    - [Customizing Polling Interval](#customizing-polling-interval)
    - [Stopping Polling Manually](#stopping-polling-manually)
- [API](#api)
- [Development](#development)
    - [Building](#building)
    - [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Fallback for unsupported browsers:** Applies only on browsers where the native `devicechange` event is not supported (Android Chrome, Opera Android, Samsung Internet, WebView).
- **Supports both approaches:** Works with both the `ondevicechange` property and `addEventListener('devicechange', callback)`.
- **Customizable polling:** Change the polling interval dynamically using the provided API.
- **Lightweight and efficient:** Automatically stops polling when there are no listeners.

## Installation

Install via [npm](https://www.npmjs.com/):

```sh
npm install devicechange-polyfill
```

Or using [Yarn](https://yarnpkg.com/):

```sh
yarn add devicechange-polyfill
```

## Usage

Simply import the polyfill at the start of your application. It will automatically detect if the browser requires the fallback behavior and patch `navigator.mediaDevices` accordingly.

### Basic Usage

```js
import 'devicechange-polyfill';

navigator.mediaDevices.ondevicechange = () => {
    // Handle media device changes here
    console.log('Media devices have changed!');
};
```

### Using `addEventListener`

You can also use the event listener API:

```js
import 'devicechange-polyfill';

navigator.mediaDevices.addEventListener('devicechange', () => {
    console.log('A media device was added or removed!');
});
```

### Customizing Polling Interval

By default, the polyfill polls every 5000ms (5 seconds). You can change this interval using:

```js
navigator.mediaDevices.setPollingInterval(2000); // Poll every 2 seconds
```

## API

### `navigator.mediaDevices.ondevicechange`
- **Type:** `function`
- **Usage:** Set a callback function that will be called when the polyfill detects a change in media devices.
- **Example:**
  ```js
  navigator.mediaDevices.ondevicechange = () => {
    console.log('Device change detected!');
  };
  ```

### `navigator.mediaDevices.addEventListener('devicechange', callback)`
- **Usage:** Add one or more event listeners for device changes.
- **Example:**
  ```js
  navigator.mediaDevices.addEventListener('devicechange', () => {
    console.log('A media device was added or removed!');
  });
  ```

### `navigator.mediaDevices.setPollingInterval(ms)`
- **Parameters:** `ms` — The polling interval in milliseconds (minimum recommended: 500ms).
- **Usage:** Changes the interval at which the polyfill polls for device changes.
- **Example:**
  ```js
  navigator.mediaDevices.setPollingInterval(3000); // 3 seconds
  ```

## Development

### Building

This project uses [Rollup](https://rollupjs.org/) to bundle the polyfill. To build the project:

```sh
npm run build
```

This will generate both a non-minified and minified version in the `dist/` folder.

### Running Tests

The tests use [Jest](https://jestjs.io/) and require a jsdom environment. Run the tests with:

```sh
npm test
```

A setup file (`tests/setupTests.js`) is used to mock the `navigator.mediaDevices` API for testing purposes.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).
