module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  transformIgnorePatterns: ["/node_modules/(?!canvas-confetti)/"],
  moduleDirectories: ["node_modules", "src"], // Added node_modules explicitly
};
