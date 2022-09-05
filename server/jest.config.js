module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    "collectCoverageFrom": [
      "**/*.{ts}",
      "!**/node_modules/**",
      "!**/vendor/**",
    ],
    "testPathIgnorePatterns": ["./gen/"],
    "setupFilesAfterEnv": ["jest-extended"],
    testTimeout: 65000
  };