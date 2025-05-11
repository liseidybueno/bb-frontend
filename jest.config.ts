module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Ensure ts-jest is used to transform TS files
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports during testing
  },
};
