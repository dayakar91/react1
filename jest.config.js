module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files using babel-jest
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Transform Axios and other ESM packages in node_modules
  ],
  testEnvironment: 'jsdom', // Simulate the DOM for React components
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js', // Mock CSS imports
  },
};
