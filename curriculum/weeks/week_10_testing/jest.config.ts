import type {Config} from 'jest';

const base: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/dist/**'],
};

const config: Config = {
  projects: [
    { ...base, displayName: 'day1-exercises', testMatch: ['<rootDir>/exercises/day1/**/*.test.ts'] },
    { ...base, displayName: 'day1-solutions', testMatch: ['<rootDir>/solutions/day1/**/*.test.ts'] },
    { ...base, displayName: 'day2-exercises', testMatch: ['<rootDir>/exercises/day2/**/*.test.ts'] },
    { ...base, displayName: 'day2-solutions', testMatch: ['<rootDir>/solutions/day2/**/*.test.ts'] },
    { ...base, displayName: 'day3-exercises', testMatch: ['<rootDir>/exercises/day3/**/*.test.ts'] },
    { ...base, displayName: 'day3-solutions', testMatch: ['<rootDir>/solutions/day3/**/*.test.ts'] },
    { ...base, displayName: 'day4-exercises', testMatch: ['<rootDir>/exercises/day4/**/*.test.ts'] },
    { ...base, displayName: 'day4-solutions', testMatch: ['<rootDir>/solutions/day4/**/*.test.ts'] },
    { ...base, displayName: 'day5-exercises', testMatch: ['<rootDir>/exercises/day5/**/*.test.ts'] },
    { ...base, displayName: 'day5-solutions', testMatch: ['<rootDir>/solutions/day5/**/*.test.ts'] }
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

export default config;
