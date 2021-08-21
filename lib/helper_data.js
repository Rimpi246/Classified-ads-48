const _ = require('underscore');
const fs = require('fs');
const db = {};
const give = {};
logger_ = global._logger;

const path = require('path');


// const merge = require('deepmerge')
const taxonomyPathEn = '../data/taxonomy/taxonomy-with-ids.en-US.txt';
const fileSyncEn = fs.readFileSync(path.join(__dirname, taxonomyPathEn)).toString();
const fileContentEn = fileSyncEn.replace(',', '_').split('\n').filter(Boolean);

const taxonomyPathAr = '../data/taxonomy/taxonomy-with-ids.ar-SA.txt';
const fileSyncAr = fs.readFileSync(path.join(__dirname, taxonomyPathAr)).toString();
const fileContentAr = fileSyncAr.replace(',', '_').split('\n').filter(Boolean);

const taxonomyPathFr = '../data/taxonomy/taxonomy-with-ids.fr-FR.txt';
const fileSyncFr = fs.readFileSync(path.join(__dirname, taxonomyPathFr)).toString();
const fileContentFr = fileSyncFr.replace(',', '_').split('\n').filter(Boolean);

const splitBy = (sep) => (str) =>
  str.split(sep).map((x) => x.trim());
const splitLine = splitBy('-');
const splitCategories = splitBy('>');

const load = (lines) =>
// put all lines into a "container"
// we want to process all lines all the time as opposed to each line individually
  [lines]
  // separate id and categories
  // e.g ['3237', 'Animals & Pet Supplies > Live Animals']
      .map((lines) => lines.map(splitLine))
  // split categories and put id last
  // e.g. ['Animals & Pet Supplies', 'Live Animals', 3237]
      .map((lines) => lines.map(([id, cats]) => splitCategories(cats)))
      .pop();

give.googleTagsEn = _.uniq(
    load(fileContentEn)
        .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
);
give.googleTagsEnLite = give.googleTagsEn
    .map((elem) => elem[2]).filter((el) => el.length < 20);

give.googleTagsAr = _.uniq(
    load(fileContentAr)
        .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
);
give.googleTagsArLite = give.googleTagsAr
    .map((elem) => elem[2]).filter((el) => el.length < 20);

give.googleTagsFr = _.uniq(
    load(fileContentFr)
        .filter((arr) => arr.length == 3 && arr[2].length < 20), (x) => x.join(''),
);
give.googleTagsFrLite = give.googleTagsFr
    .map((elem) => elem[2]).filter((el) => el.length < 20);

const csv = require('csv-parse');
give.ESCOTagsFr = [];
give.ESCOTagsEn = [];
give.ESCOTagsAr = [];
const getTags = (path_, arr) =>
  fs.createReadStream(path.join(__dirname, path_))
      .pipe(csv({columns: true}))
      .on('data', function(row) {
        const preferredLabel = row.preferredLabel;
        const masculine = preferredLabel.split('/')[0];
        const feminine = preferredLabel.split('/')[1];
        arr.push({masculine: masculine, feminine: feminine});
      });
getTags('../data/taxonomy/occupations_fr.csv', give.ESCOTagsFr);
getTags('../data/taxonomy/occupations_ar.csv', give.ESCOTagsAr);
getTags('../data/taxonomy/occupations_en.csv', give.ESCOTagsEn);

module.exports.db = db;
module.exports.give = give;
