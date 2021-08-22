const path = require("path");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const paths = {
  dist: path.resolve(__dirname, "dist"),
  public: path.resolve(__dirname, "..", "public", "javascripts"),
};
const isDevEnv = process.argv.includes("-w");
const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
};
module.exports = {
  entry: {
    main: "./src/main.js",
    skills: "./src/views/skills/skills.js",
    listing: "./src/views/listings/listing.js",
    tags: "./src/views/tags/tags.js",
    easteregg: "./src/views/easteregg/easteregg.js",
  },
  output: {
    filename: "[name].js",
    path: paths.dist,
  },
  ...(isDevEnv && devConfig),
  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {},
        onEnd: {
          copy: [{ source: "dist", destination: paths.public }],
        },
      },
      runTasksInSeries: false,
      runOnceInWatchMode: false,
    }),
    new Dotenv()
  ],
};
