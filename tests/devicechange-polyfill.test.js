/**
 * @jest-environment jsdom
 */

import '../src/index.js';

describe('devicechange-polyfill', () => {
    test(
        'should detect device changes and trigger ondevicechange',
        async () => {
            const mockHandler = jest.fn();
            navigator.mediaDevices.ondevicechange = mockHandler;

            navigator.mediaDevices.enumerateDevices.mockResolvedValue([
                { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' },
                { deviceId: 'mic2', kind: 'audioinput', label: 'Microphone 2' }
            ]);

            await new Promise((resolve) => setTimeout(resolve, 5200));

            expect(mockHandler).toHaveBeenCalled();
        },
        7000
    );

    test('should support addEventListener for devicechange', async () => {
        const mockListener = jest.fn();
        navigator.mediaDevices.addEventListener('devicechange', mockListener);

        navigator.mediaDevices.enumerateDevices.mockResolvedValue([
            { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' },
            { deviceId: 'mic3', kind: 'audioinput', label: 'Microphone 3' }
        ]);

        await new Promise((resolve) => setTimeout(resolve, 5200));

        expect(mockListener).toHaveBeenCalled();
    }, 7000);

    test('should allow setting a custom polling interval', async () => {
        navigator.mediaDevices.setPollingInterval(1000);

        const mockHandler = jest.fn();
        navigator.mediaDevices.ondevicechange = mockHandler;

        navigator.mediaDevices.enumerateDevices.mockResolvedValue([
            { deviceId: 'mic1', kind: 'audioinput', label: 'Microphone 1' },
            { deviceId: 'mic4', kind: 'audioinput', label: 'Microphone 4' }
        ]);

        await new Promise((resolve) => setTimeout(resolve, 1100));

        expect(mockHandler).toHaveBeenCalled();
    });
});
