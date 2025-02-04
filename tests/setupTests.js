// tests/setupTests.js

// Override navigator.userAgent using Object.defineProperty.
Object.defineProperty(window.navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Linux; Android 10; Chrome/110.0.5481.65)',
    configurable: true,
});

// Ensure that navigator.mediaDevices is defined before the polyfill is loaded.
window.navigator.mediaDevices = {
    // A mock enumerateDevices that returns a default list.
    enumerateDevices: jest.fn(() =>
        Promise.resolve([
            { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' }

        ])
    ),
    // Simple implementations for event handling.
    addEventListener: function (event, callback) {
        this._listeners = this._listeners || {};
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(callback);
    },
    removeEventListener: function (event, callback) {
        if (this._listeners && this._listeners[event]) {
            this._listeners[event] = this._listeners[event].filter(
                (cb) => cb !== callback
            );
        }
    }
};
