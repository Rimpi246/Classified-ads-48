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
const isDevEnv = ['development', 'local'].includes(process.env.NODE_ENV);
const devConfig = {
  mode: "development",
  devtool: "eval-source-map",
};

const fetch = require('node-fetch');
const fs = require('fs');
const gjv = require("geojson-validation");

const downloadFile = ((url, path) => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    if (res.status !== 200) {
      return reject(new Error("WebpackBeforeBuildPlugin: \nURL not found or something:\n"+url));
    }
    await res.body.pipe(fileStream);
    const json = await res.json();
    if (gjv.valid(json)) {
      return resolve("GEOJSON is valid:\n"+url);
    } else {
      return reject(new Error("WebpackBeforeBuildPlugin: \nGEOJSON is not valid:\n"+url));
    }
  });
});

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
  stats: {
    preset: 'normal',
    moduleTrace: true,
    errorDetails: true,
  },
  ...(isDevEnv && devConfig),
  plugins: [
    new WebpackBeforeBuildPlugin(function(stats, callback) {
      console.log("Environment variables:\n");
      console.log(Object.keys(envKeys.parsed));
      console.log("WebpackBeforeBuildPlugin: \nDownloading some data-sets\n");
      const promise = downloadFile(process.env.BORDERS_FILE_URL, 'src/data/borders.json');
      const promise2 = downloadFile(process.env.STATES_FILE_URL, 'src/data/states.json');
      Promise.all([promise, promise2]).then((msg) => {
        console.log(msg);
        callback();
      }).catch(console.error);
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
