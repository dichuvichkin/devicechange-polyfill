(function () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return;
    }

    function needsPolyfill() {
        const ua = navigator.userAgent;
        return (
            /Android/i.test(ua) && (
                /Chrome/i.test(ua) ||
                /OPR/i.test(ua) ||
                /SamsungBrowser/i.test(ua) ||
                /wv/i.test(ua)
            )
        );
    }

    if (!needsPolyfill()) {
        return;
    }

    let previousDevices = [];
    let eventListeners = new Set();
    let pollingInterval = null;
    let pollingTime = 5000;

    async function checkForDeviceChanges() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const deviceList = devices.map(device => ({
            deviceId: device.deviceId,
            kind: device.kind,
            label: device.label
        }));

        if (JSON.stringify(deviceList) !== JSON.stringify(previousDevices)) {
            if (typeof navigator.mediaDevices._ondevicechange === 'function') {
                navigator.mediaDevices._ondevicechange();
            }

            eventListeners.forEach(listener => {
                listener();
            });

            previousDevices = deviceList;
        }
    }

    Object.defineProperty(navigator.mediaDevices, 'ondevicechange', {
        get: function () {
            return this._ondevicechange || null;
        },
        set: function (handler) {
            if (typeof handler === 'function') {
                this._ondevicechange = handler;
                startDevicePolling();
            } else {
                this._ondevicechange = null;
                stopPollingIfNeeded();
            }
        }
    });

    navigator.mediaDevices._addEventListener = navigator.mediaDevices.addEventListener;
    navigator.mediaDevices._removeEventListener = navigator.mediaDevices.removeEventListener;

    navigator.mediaDevices.addEventListener = function (event, callback) {
        if (event === 'devicechange' && typeof callback === 'function') {
            eventListeners.add(callback);
            startDevicePolling();
        } else if (navigator.mediaDevices._addEventListener) {
            navigator.mediaDevices._addEventListener.call(this, event, callback);
        }
    };

    navigator.mediaDevices.removeEventListener = function (event, callback) {
        if (event === 'devicechange' && typeof callback === 'function') {
            eventListeners.delete(callback);
            stopPollingIfNeeded();
        } else if (navigator.mediaDevices._removeEventListener) {
            navigator.mediaDevices._removeEventListener.call(this, event, callback);
        }
    };

    navigator.mediaDevices.setPollingInterval = function (ms) {
        if (typeof ms !== 'number' || ms < 500) {
            return;
        }
        pollingTime = ms;
        restartPolling();
    };

    function startDevicePolling() {
        if (!pollingInterval) {
            pollingInterval = setInterval(checkForDeviceChanges, pollingTime);
        }
    }

    function restartPolling() {
        stopPolling();
        startDevicePolling();
    }

    function stopPolling() {
        if (pollingInterval) {
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    }

    function stopPollingIfNeeded() {
        if (eventListeners.size === 0 && !navigator.mediaDevices._ondevicechange) {
            stopPolling();
        }
    }
})();
