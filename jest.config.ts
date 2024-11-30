import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^.+/(.*\\.scss)\\?inline$': '<rootDir>/tests/mocks/style.ts',
    '@/(.*)$': '<rootDir>/main/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/file.ts',
  },
}

export default config
