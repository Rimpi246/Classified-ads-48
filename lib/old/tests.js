/**
 * Self contained test file, dependes only on helper_data.js and helper_ops.js
 */

// const winston = require('winston');
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: {service: 'user-service'},
//   transports: [
//     new winston.transports.File({filename: '/logs/error.log', level: 'error'}),
//     new winston.transports.File({filename: '/logs/combined.log'}),
//   ],
// });
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }
// global._logger = logger;


// const db = require('../lib/helper_data').db;
// const giveOp = require('../lib/helper_ops').ops;
// var giveOp = require('./helper_ops').ops

// db.backup();
// var vv = db.get({ "title":"titlevsvsvsvsvsvs" }, ['id', 'title', 'desc_', 'lat', 'lng', 'img', 'ara', 'usr', 'd'])
// console.log(global.listings)

// db.sortDB()
// console.log(global.listings)

// var res = db.deactivate(1619916741)
// console.log(res)
// var vv = db.get({ "title":"titlevsvsvsvsvsvs" }, ['id', 'title', 'desc_', 'lat', 'lng', 'img', 'ara', 'usr', 'd'])
// console.log(vv)

// console.log(db.fetch({ id: 1619916741 }))

// var array = global.listings
// console.log(array)
// var array2 = db.toPublic(array)
// console.log(array2)
// var err = db.push({ "id": 77, "d": 1, "title": 4, "desc": "tell tell" })
// console.log(err)
// console.log(array.length)
// var err = db.push({ "id": 77, "d": 1, "title": 4, "desc": "tell tell1" })
// console.log(err)
// console.log(array.length)
// db.persist()

// db.clean()
// console.log(array.length)

// console.log(db.get({ id: 7 }))
// console.log(db.fetch({ id: 7 }))
// console.log(db.fetchDeep("desc_", "TELL"))
// console.log(db.rejectDeep("desc", "87"))

// console.log(db.sortBy("id", true))
// console.log(db.sortBy("id", false))

// var fs = require("fs");
// var text = fs.readFileSync("./arabic.txt").toString('utf-8');
// var arabic = text.split("\n").slice(0, 245)

// var { compatto, DecompressError } = require('compatto')
// var english = require("./node_modules/compatto/cjs/dictionary.cjs").dictionary
// const { compress, decompress } = compatto({ dictionary: arabic })
// const compressedString = compress("يعمل الشمندر على إزالة السموم من الدم، ويساعد البرتقال في الحفاظ على البشرة والجسم، إذن ماذا يحدث عند مزج عصير الشمندر والبرتقال معًا؟ تعرف في هذا المقال على فوائد عصير الشمندر والبرتقال. ")
// console.log(compressedString)
// const decompressedString = decompress(compressedString)

// fs.writeFile('text.txt', decompressedString, function (err) {
//     if (err) return console.log(err);
// });

// elem = db.get({id: 1621591288, d: 0, a: 1}, ['id', 'title', 'desc_', 'lat', 'lng', 'img', 'ara', 'usr']);
// console.log(JSON.stringify(elem));
// console.log(giveOp.compressEn("hello world"))


// REGEX LOWER PRESISION OF LAT LON
// replace (\d+\.\d{4})\d{11} with $1

// const encrypt = require('../lib/crpyto').encrypt;
// const decrypt = require('../lib/crpyto').decrypt;

// console.log(encrypt('hello'));
// console.log(decrypt(encrypt('hello')));
// const path = require('path');
// const fs = require('fs');
// const occupationsPathFr = '../data/taxonomy/occupations_fr.csv';
// const csv = require('csv-parse');

// fs.createReadStream(path.join(__dirname, occupationsPathFr))
//     .pipe(csv({columns: true}))
//     .on('data', function(row) {
//       let masculine = row.preferredLabel.split('/')[0];
//       let feminine = row.preferredLabel.split('/')[1];
//       console.log(masculine);
//     });
