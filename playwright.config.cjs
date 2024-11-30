module.exports = {
  preset: 'jest-playwright-jsdom',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  testMatch: ['**/?(*.)+(spec).[t]s?(x)'],
  setupFiles: ['core-js'],
  modulePathIgnorePatterns: ['.dist'],
}
