const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const queries = {};
const ops = {};


/**
 * Insert a document into DB
 * @param {*} db database instance
 * @param {*} elem a JSON representation of a Listing
 * @return {Promise}
 */
queries.insertDocument = async function(db, elem) {
  console.log('insertDocument');
  // https://stackoverflow.com/a/59841285/1951298
  elem.geolocation = {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [elem.lng, elem.lat],
  };
  // TODO: isArabic?
  const collection = db.collection('listing');
  return new Promise(function(resolve, reject) {
    collection.insertOne(elem, function(err, result) {
      console.log('Inserted 1 document into the collection');
      if (err) {
        return reject(err);
      }
      return resolve(result.ops[0]);
    });
  });
};

const baseQuery = {'d': false, 'a': true};
const baseProjection = {'pass': 0.0, 'geolocation': 0.0, 'd': 0.0, 'a': 0.0};
const baseSort = [['_id', 'desc']];
/**
 * Get a document from DB
 * If Admin then get unnaproved document
 * @param {*} db database instance
 * @param {String} id Id of a Listing
 * @param {Boolean} isAdmin if the caller is admin
 * @return {Promise}
 */
queries.getDocumentById = async function(db, id, isAdmin) {
  const collection = db.collection('listing');
  const query = isAdmin ? {'a': false} : JSON.parse(JSON.stringify(baseQuery));
  return new Promise(function(resolve, reject) {
    try {
      new ObjectID(id);
    } catch (err) {
      return reject(err);
    }
    query['_id'] = new ObjectID(id);
    collection.findOne(query, {projection: baseProjection})
        .then((doc) => {
          resolve(doc);
        });
  });
};

const dateFromObjectId = function(objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

/**
 * This function returns an ObjectId embedded with a given datetime
 * Accepts number of days since document was created
 * Author: https://stackoverflow.com/a/8753670/1951298
 * @param {Number} days
 * @return {object}
 */
function getObjectId(days) {
  const yesterday = new Date();
  days = days ? days : process.env.NODE_ENV === 'local' ? 1000 : 14;
  yesterday.setDate(yesterday.getDate() - days);
  const hexSeconds = Math.floor(yesterday/1000).toString(16);
  const constructedObjectId = new ObjectID(hexSeconds + '0000000000000000');
  return constructedObjectId;
};

/**
 * Get documents created since number of days
 * @param {*} db database
 * @param {*} days number of days since document was created
 * @param {*} section which section
 * @param {*} pagination number of pages and listings in each page
 * @return {Promise}
 */
queries.getDocumentsSince = function(db, days, section, pagination) {
  const collection = db.collection('listing');
  const objectId = getObjectId(days);
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['_id'] = {$gt: objectId};
  if (section) query['section'] = section;
  return new Promise(function(resolve, reject) {
    collection.find(query)
        .project(baseProjection)
        .sort(baseSort)
        .skip((pagination.perPage * pagination.page) - pagination.perPage)
        .limit(pagination.perPage)
        .toArray( async function(err, docs) {
          if (err) {
            return reject(err);
          }
          const count = await collection.countDocuments(query);
          return resolve({documents: docs, count: count});
        });
  });
};

/**
 * Get documents created by a specific user
 * @param {*} db database
 * @param {*} user user email
 * @return {Promise}
 */
queries.getDocumentsByUser = function(db, user) {
  const collection = db.collection('listing');
  const query = {};
  query['usr'] = user;
  return new Promise(function(resolve, reject) {
    collection.find(query)
        .project(baseProjection)
        .sort(baseSort)
        .toArray( function(err, docs) {
          if (err) {
            return reject(err);
          }
          return resolve(docs);
        });
  });
};


/**
 * Approximate search based on indexed text fields: title, desc, tags
 * @param {*} db database
 * @param {*} phrase sentense to search
 * @param {*} exact whether search the exact sentense or separate terms
 * @param {*} division which division
 * @param {*} section which section
 * @return {Promise}
 */
queries.gwoogl = function(db, phrase, exact, division, section) {
  const collection = db.collection('listing');
  const objectId = getObjectId(100);
  phrase = exact ? `\"${phrase}\"` : phrase;
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['$text'] = {$search: phrase};
  query['_id'] = {$gt: objectId};
  if (section) query['section'] = section;
  if (division) query['div'] = division;
  return new Promise(function(resolve, reject) {
    collection.find(query, {score: {$meta: 'textScore'}})
        .project(baseProjection)
        .sort({score: {$meta: 'textScore'}})
        .limit(20)
        .toArray( function(err, docs) {
          if (err) {
            return reject(err);
          }
          return resolve(docs);
        });
  });
};

/**
 * Search tag based on indexed tags field
 * @param {*} db database
 * @param {*} tag which tag
 * @param {*} pagination number of pages and listings in each page
 * @return {Promise}
 */
queries.getDocumentsByTag = function(db, tag, pagination) {
  const collection = db.collection('listing');
  const objectId = getObjectId(100);
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['_id'] = {$gt: objectId};
  query['tags'] = tag;
  return new Promise(function(resolve, reject) {
    collection.find(query)
        .project(baseProjection)
        .sort(baseSort)
        .skip((pagination.perPage * pagination.page) - pagination.perPage)
        .limit(pagination.perPage)
        .toArray( async function(err, docs) {
          if (err) {
            return reject(err);
          }
          const count = await collection.countDocuments(query);
          return resolve({documents: docs, count: count});
        });
  });
};

/**
 * Search tag based on division field
 * @param {*} db database
 * @param {*} division which division
 * @param {*} pagination number of pages and listings in each page
 * @return {Promise}
 */
queries.getDocumentsByDivision = function(db, division, pagination) {
  const collection = db.collection('listing');
  const objectId = getObjectId(100);
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['_id'] = {$gt: objectId};
  query['div'] = division;
  return new Promise(function(resolve, reject) {
    collection.find(query)
        .project(baseProjection)
        .sort(baseSort)
        .skip((pagination.perPage * pagination.page) - pagination.perPage)
        .limit(pagination.perPage)
        .toArray( async function(err, docs) {
          if (err) {
            return reject(err);
          }
          const count = await collection.countDocuments(query);
          return resolve({documents: docs, count: count});
        });
  });
};

/**
 * Search based on indexed Geospatial field: lat, lng
 * @param {*} db database
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} section
 * @return {Promise}
 */
queries.getDocumentsByGeolocation = function(db, latitude, longitude, section) {
  const collection = db.collection('listing');
  const objectId = getObjectId(100);
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['_id'] = {$gt: objectId};
  if (section) query['section'] = section;
  query['geolocation'] = {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      $maxDistance: 6*4*1000, // 24 KM
      $minDistance: 0,
    },
  };
  return new Promise(function(resolve, reject) {
    collection.find(query)
        .project(baseProjection)
        .sort(baseSort)
        .limit(20)
        .toArray( function(err, docs) {
          if (err) {
            return reject(err);
          }
          return resolve(docs);
        });
  });
};
queries.deactivateDocument = function(db, password) {
  const collection = db.collection('listing');
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['pass'] = password;
  const newValues = {$set: {'d': true}};
  const options = {upsert: false};
  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(query, newValues, options, function(err, res) {
      if (err) reject(err);
      if (res.lastErrorObject.n === 0) {
        reject(new Error('document to be deactivated not found'));
      }
      resolve(res._id);
    });
  });
};

queries.approveDocument = function(db, id) {
  const collection = db.collection('listing');
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['_id'] = new ObjectID(id);
  query['a'] = false;
  const newValues = {$set: {'a': true}};
  const options = {upsert: false};
  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(query, newValues, options, function(err, res) {
      if (err) reject(err);
      if (res.lastErrorObject.n === 0) {
        reject(new Error('document to be approved not found'));
      }
      resolve(res._id);
    });
  });
};

// queries.getDocumentId = function(db, query, cb) {
//   const collection = db.collection('listing');
//   return collection.findOne(query, baseProjection)
//       .then((doc) => {
//         if (cb && typeof cb === 'function') {
//           return cb(doc);
//         } else {
//           return doc._id.str;
//         }
//       });
// };

queries.reactivateDocument = function(db, password) {
  const collection = db.collection('listing');
  const query = JSON.parse(JSON.stringify(baseQuery));
  query['pass'] = password;
  query['d'] = true;
  const newValues = {$set: {'d': false}};
  const options = {upsert: false};
  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(query, newValues, options, function(err, res) {
      if (err) reject(err);
      if (res.lastErrorObject.n === 0) {
        reject(new Error('document to be reactivated not found'));
      }
      resolve(res._id);
    });
  });
};

queries.autocomplete = function(db, keyword) {
  const collection = db.collection('words');
  const keywRgx = new RegExp('^' + keyword, 'i');
  return new Promise(function(resolve, reject) {
    collection.find({'_id': keywRgx}).project({_id: 1}).toArray(function(err, docs) {
      if (err) {
        return reject(err);
      }
      return resolve(docs);
    });
  });
};

queries.getDocumentsByKeyword = function(db, keyword, pagination) {
  const collection = db.collection('words');
  return new Promise(function(resolve, reject) {
    collection.findOne({'_id': keyword}, function(err, result) {
      if (err) {
        reject(err);
      }
      if (result) {
        const objIds = result.value.documents;
        db.collection('listing').find({_id: {$in: objIds}})
            .project(baseProjection)
            .sort(baseSort)
            .skip((pagination.perPage * pagination.page) - pagination.perPage)
            .limit(pagination.perPage)
            .toArray(
                async function(err, docs) {
                  if (err) {
                    reject(err);
                  }
                  const count = await collection.countDocuments({_id: {$in: objIds}});
                  return resolve({documents: docs, count: count});
                });
      } else {
        resolve([]);
      }
    });
  });
};

module.exports.mongoQueries = queries;
module.exports.mongoOps = ops;
