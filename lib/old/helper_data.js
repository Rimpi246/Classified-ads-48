// const _ = require('underscore');
// const lo = require('lodash');
// const fs = require('fs');
// const db = {};
// const give = {};
// const giveOp = require('./helper_ops').ops;
// logger_ = global._logger;
// // title: 'title1' => is a title
// // a: 0 => approved by admin
// // d: 0 => deactivated by user
// // desc: 'oipfjezojifze' => extended description
// // pass: 'qub7s1ya' => password to deactivate
// // tags: ["tag1", "tag2"] => tags


// const compressImages = require('compress-images');
// const path = require('path');
// const chokidar = require('chokidar');
// const messages = require('./bigToes').messages;

// const inputPathImages = 'uploads/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,gif}';
// const inputPath = 'uploads/';
// const outputPath = 'public/images/';

// const watcher = chokidar.watch(inputPath, {persistent: true});
// /**
//  * This watcher compressImages on add of a file in uploads/
//  * compressImages when finished without errors cleans the initial file
//  * This way, an uploaded image file will not appear instantly if the page
//  * of the related item is requested.
//  */
// watcher
//     .on('add', function(path) {
//       console.log('File', path, 'has been added');
//       compressImages(
//           inputPathImages,
//           outputPath,
//           {compress_force: false, statistic: true, autoupdate: true},
//           false,
//           {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
//           {png: {engine: 'pngquant', command: ['--quality=20-50', '-o']}},
//           {svg: {engine: 'svgo', command: '--multipass'}},
//           {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}},
//           function(error, completed, statistic) {
//             console.log('-------------');
//             console.log(error);
//             console.log(completed);
//             console.log(statistic);
//             console.log('-------------');
//             // CLEAN FOLDER.
//             if (error === null) {
//               fs.unlink(statistic.input, (err) => {
//                 if (err) throw err;
//                 console.log('successfully compressed and deleted ' + statistic.input);
//               });
//             }
//           },
//       );
//     })
//     .on('change', function(path) {
//       console.log('File', path, 'has been changed');
//     })
//     .on('unlink', function(path) {
//       console.log('File', path, 'has been removed');
//     })
//     .on('error', function(error) {
//       console.error('Error happened', error);
//     });


// // Deactivate one
// db.deactivate = function deactivate(id, subListing = global.listings) {
//   logger_.log({level: 'info', message: 'deactivate'});
//   const result = lo.some(subListing, (elem) => {
//     if (elem.id === id) {
//       elem.d = 1;
//       return true;
//     }
//   });
//   return Promise.resolve(result);
// };


// // Reactivate one
// db.reactivate = function reactivate(id, subListing = global.listings) {
//   logger_.log({level: 'info', message: 'reactivate'});
//   const now = Math.floor(new Date().getTime() / 1000);
//   const result = lo.some(subListing, (elem) => {
//     if (elem.id === id) {
//       elem.d = 0;
//       elem.id = now;
//       return true;
//     }
//   });
//   return Promise.resolve(result);
// };

// // Approve one
// db.approve = function approve(id, subListing = global.listings) {
//   logger_.log({level: 'info', message: 'approve'});
//   const result = lo.some(subListing, (elem) => {
//     if (elem.id === id) {
//       elem.a = 1;
//       return true;
//     }
//   });
//   return Promise.resolve(result);
// };


// // const merge = require('deepmerge')
// const taxonomyPathEn = '../data/taxonomy/taxonomy-with-ids.en-US.txt';
// const fileSyncEn = fs.readFileSync(path.join(__dirname, taxonomyPathEn)).toString();
// const fileContentEn = fileSyncEn.replace(',', '_').split('\n').filter(Boolean);

// const taxonomyPathAr = '../data/taxonomy/taxonomy-with-ids.ar-SA.txt';
// const fileSyncAr = fs.readFileSync(path.join(__dirname, taxonomyPathAr)).toString();
// const fileContentAr = fileSyncAr.replace(',', '_').split('\n').filter(Boolean);

// const taxonomyPathFr = '../data/taxonomy/taxonomy-with-ids.fr-FR.txt';
// const fileSyncFr = fs.readFileSync(path.join(__dirname, taxonomyPathFr)).toString();
// const fileContentFr = fileSyncFr.replace(',', '_').split('\n').filter(Boolean);

// const splitBy = (sep) => (str) =>
//   str.split(sep).map((x) => x.trim());
// const splitLine = splitBy('-');
// const splitCategories = splitBy('>');

// const load = (lines) =>
// // put all lines into a "container"
// // we want to process all lines all the time as opposed to each line individually
//   [lines]
//   // separate id and categories
//   // e.g ['3237', 'Animals & Pet Supplies > Live Animals']
//       .map((lines) => lines.map(splitLine))
//   // split categories and put id last
//   // e.g. ['Animals & Pet Supplies', 'Live Animals', 3237]
//       .map((lines) => lines.map(([id, cats]) => splitCategories(cats)))
//       .pop();

// give.googleTagsEn = _.uniq(
//     load(fileContentEn)
//         .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
// );
// give.googleTagsEnLite = give.googleTagsEn
//     .map((elem) => elem[2]).filter((el) => el.length < 20);

// give.googleTagsAr = _.uniq(
//     load(fileContentAr)
//         .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
// );
// give.googleTagsArLite = give.googleTagsAr
//     .map((elem) => elem[2]).filter((el) => el.length < 20);

// give.googleTagsFr = _.uniq(
//     load(fileContentFr)
//         .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
// );
// give.googleTagsFrLite = give.googleTagsFr
//     .map((elem) => elem[2]).filter((el) => el.length < 20);

// module.exports.db = db;
// module.exports.give = give;
