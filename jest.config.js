module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',
  testMatch: ['**/**.test.js'],
  clearMocks: true
}; 