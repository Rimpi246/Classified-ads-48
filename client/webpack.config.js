const path = require("path");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const Dotenv = require('dotenv-webpack');
var WebpackBeforeBuildPlugin = require('before-build-webpack');

const dotenv = require('dotenv');
const envKeys = dotenv.config();

const paths = {
  dist: path.resolve(__dirname, "dist"),
  public: path.resolve(__dirname, "..", "public", "javascripts"),
};
const isDevEnv = process.argv.includes("-w");
const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
};

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

const file1 = fs.createWriteStream("src/data/borders.json");
const file2 = fs.createWriteStream("src/data/states.json");
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
  // module: {
  //   // for earlier webpack versions
  //   rules: [{ 
  //     test: /\.json$/,
  //     loader: 'json-loader'
  //    }],
  // },
  module: {
    rules: [
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
    ]
  },
  ...(isDevEnv && devConfig),
  plugins: [
    new WebpackBeforeBuildPlugin(function(stats, callback) {
      console.log("Environment variables:\n");
      console.log(Object.keys(envKeys.parsed));
      console.log("WebpackBeforeBuildPlugin: \nDownloading some data-sets\n");
      http.get(process.env.BORDERS_FILE_URL, function(response) {
        response.pipe(file1);
        http.get(process.env.STATES_FILE_URL, function(response) {
          response.pipe(file2);
          console.log("WebpackBeforeBuildPlugin: \nSuccess!\nContinuing build process\n");
          callback(); // don't call it if you do want to stop compilation
        });
      });
    }),
    new FileManagerPlugin({
      events: {
        onStart: {},
        onEnd: {
          copy: [
            { source: "dist", destination: paths.public },
            { source: "src/data/borders.json", destination: "../data/geo/borders.json"},
            { source: "src/data/states.json", destination: "../data/geo/states.json"}
          ],
        },
      },
      runTasksInSeries: false,
      runOnceInWatchMode: false,
    }),
    new Dotenv()
  ],
};
