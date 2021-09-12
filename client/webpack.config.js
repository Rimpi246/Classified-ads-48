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

const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');
const gjv = require("geojson-validation");

const file1 = fs.createWriteStream("src/data/borders.json");
const file2 = fs.createWriteStream("src/data/states.json");

// const validateGEOJSONFile = (path) => {
//   http.get(path, function(response) {
//     response.pipe(file1);
//     response.on("end", async function() {
//       var geojson = JSON.parse(fs.readFileSync(path, "utf8"));
//       if (!gjv.valid(geojson)) {
//         console.error("GEOJSON is not valid:\n"+path);
//         return false;
//       }
//     });
//   });
// }

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
      // TODO: Decouple these two http.get calls
      // into one accepting {url, filePath}
      http.get(process.env.BORDERS_FILE_URL, function(response) {
          response.pipe(file1);
          response.on("end", async function() {
            try {
              var geojson = JSON.parse(fs.readFileSync(file1.path, "utf8"));
              if (!gjv.valid(geojson)) {
                console.error("WebpackBeforeBuildPlugin: \nGEOJSON is not valid:\n"+process.env.BORDERS_FILE_URL);
                process.exit();
              }else{
                console.log("GEOJSON is valid:\n"+process.env.BORDERS_FILE_URL);
              }
            } catch (error) {
              console.error('WebpackBeforeBuildPlugin: \nFailed in checking GEOJSON\n ' + error.message);
              process.exit();
            }
          });
          http.get(process.env.STATES_FILE_URL, function(response) {
            response.pipe(file2);
            response.on("end", async function() {
              try {
                var geojson = JSON.parse(fs.readFileSync(file1.path, "utf8"));
                if (!gjv.valid(geojson)) {
                  console.error("WebpackBeforeBuildPlugin: \nGEOJSON is not valid:\n"+process.env.STATES_FILE_URL);
                  process.exit();
                }else{
                  console.log("GEOJSON is valid:\n"+process.env.BORDERS_FILE_URL);
                }
              } catch (error) {
                console.error('WebpackBeforeBuildPlugin: \nFailed in checking GEOJSON\n ' + error.message);
                process.exit();
              }
            });
            console.log("WebpackBeforeBuildPlugin: \nSuccess!\nContinuing build process\n");
            callback(); // Must be called !! to continue compilation !!
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
