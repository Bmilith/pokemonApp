const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      displayName: 'core',
      testMatch: ['<rootDir>/src/components/core/**/*.test.{ts,tsx}'],

      roots: ['<rootDir>'],
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      modulePaths: [compilerOptions.baseUrl],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // your existing JS transformer
        '\\.(jpg|jpeg|png|gif|svg|webp|mp4|mp3|css)$': 'jest-transform-stub',
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // if you use alias @/
      },
    },
    {
      displayName: 'features',
      testMatch: ['<rootDir>/src/components/features/**/*.test.{ts,tsx}'],

      roots: ['<rootDir>'],
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      modulePaths: [compilerOptions.baseUrl],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // your existing JS transformer
        '\\.(jpg|jpeg|png|gif|svg|webp|mp4|mp3|css)$': 'jest-transform-stub',
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // if you use alias @/
      },
    },
  ],
};
