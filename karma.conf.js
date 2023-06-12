/** @type {(config: import("karma").Config) => Promise<void> | undefined} */

module.exports = function (config) {
  config.set({
    plugins: [
      'karma-spec-reporter',
      'karma-jasmine',
      'karma-vite',
      'karma-chrome-launcher',
    ],
    captureTimeout: 3000,
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine', 'vite'],
    reporters: ['spec'],
    files: [
      {
        pattern: 'tests/**/*.spec.tsx',
        type: 'module',
        watched: false,
        served: false,
      },
    ],
  });
};
