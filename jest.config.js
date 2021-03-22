module.exports = {
  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.json"
    }
  },
  "preset": "ts-jest",
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.(js)$": "babel-jest",
    "^.+\\.(ts)?$": "ts-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  "modulePaths": [],
  "moduleNameMapper": {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  "moduleFileExtensions": [
    "ts",
    "js",
    "json",
    "node"
  ],
  "testPathIgnorePatterns": [
    "<rootDir>/(build|node_modules)/"
  ],
  "testEnvironment": "jest-environment-jsdom-sixteen",

  // Setup Enzyme
  // "snapshotSerializers": ["enzyme-to-json/serializer"],
  //"setupTestFrameworkScriptFile": "<rootDir>/setupEnzyme.ts",
};
