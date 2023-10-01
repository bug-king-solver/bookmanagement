// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testMatch: ['**/*.test.js'],
    collectCoverageFrom: [
        'components/**/*.vue',
        'pages/**/*.vue',
    ],
};
