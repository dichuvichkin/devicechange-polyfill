export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['<rootDir>/tests/setupTests.js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js']
};
