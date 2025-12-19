/* eslint-env node */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/test/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
};
