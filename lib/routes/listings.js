// TODO: revise redirects to /messages

const express = require('express');
const router = express.Router();
const db = require('../helper_data').db;
const messages = require('../bigToes').messages;
const illustrations = require('../bigToes').illustrations;
const fontFamilies = require('../bigToes').fontFamilies;
const path = require('path');
const _ = require('underscore');
const dotenv = require('dotenv');
dotenv.config();

const mongoQueries = require('../mongo_ops').mongoQueries;

router.get('/', async function(req, res, next) {
  const listings = await mongoQueries.getDocumentsSince(
      global.mongodb, 20, '', req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;
  res.render('listings', {
    title: 'Classified-ads-48',
    intro: 'Classified advertising brought to the web',
    user: req.session.user,
    success: 'Hello there :)',
    section: 'index',
    listings: listings.documents,
    addressPoints: [],
    current: page,
    pages: Math.ceil(listings.count / perPage),
  });
});
const messages_ = {
  'donations': 'Share or look for used items nextdoor',
  'skills': 'Share skills',
  'blogs': 'Creative passions, hobbies and passtimes!',
};
let addressPoints = {};
router.get(/^\/(donations|skills|blogs)/, async function(req, res, next) {
  const section = req.params[0];
  const listings = await mongoQueries.getDocumentsSince(
      global.mongodb, 100, section, req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;

  const response = {
    title: section,
    intro: messages_[section],
    user: req.session.user,
    success: 'Hello there :)',
    section: section,
    listings: listings.documents,
    current: page,
    pages: Math.ceil(listings.count / perPage),
    addressPoints: [],
  };
  // Update addressPoints which is defined outside this request
  // for 'all future' requests
  addressPoints[section] = listings.documents.map((a) => {
    return [a.lat, a.lng, a.title, a._id];
  });
  response['addressPoints'] = addressPoints[section];
  res.render('listings', response);
});


router.get('/tags', function(req, res, next) {
  res.render('tags', {
    title: 'Express',
    user: req.session.user,
    success: 'Hello there :)',
  });
});

/* GET one listing; must not be deactivated. */
router.get('/id/:id', async function(req, res, next) {
  const hex = /[0-9A-Fa-f]{6}/g;
  const elem = (hex.test(req.params.id))?
      await mongoQueries.getDocumentById(global.mongodb, req.params.id, false) :
        undefined;
  if (elem) {
    elem.usr = elem.usr ? ops.initials(elem.usr) : 'YY';
    return res.render('listing', {
      title: 'Express',
      data: elem,
      user: req.session.user,
      success: 'Yep :)',
      section: elem.section,
    });
  }
  res.render('messages', {
    title: 'Express',
    message: 'No listing found, it can be deactivated or not approved yet :(',
    user: req.session.user,
    error: 'Listing not found',
  });
});

/* Query listings not including deactivated. */
router.post('/gwoogl', async (req, res, next) => {
  const {body} = req;
  const querySchema = Joi.object().keys({
    title_desc: Joi.
        string().
        optional().
        allow('').
        min(3).
        max(100),
    exact: Joi.boolean().truthy('on').falsy('off').default(false),
    // .regex(/^\W*\w+(?:\W+\w+)*\W*$/),
    div_q: Joi.string().allow('').min(3).max(40).optional(),
    since: Joi.date().iso(),
    section: Joi.string().valid(...['donations', 'skills']),
  });

  const result = querySchema.validate(body);
  const {value, error} = result;
  const valid = error == null;
  let listings;
  if (!valid) {
    return res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: error,
    });
  } else {
    listings = await mongoQueries.gwoogl(global.mongodb, body.title_desc,
        body.exact, body.div_q, body.section);
  }
  res.render(
      'listings',
      {
        title: 'Express',
        intro: 'Classified advertising brought to the web',
        context: 'gwoogl',
        section: body.section,
        addressPoints: [],
        listings: listings,
        user: req.session.user,
        success: 'Yep, we got some :)',
      });
});

/* Query listings withing a geopoint and radius */
router.post('/geolocation', async (req, res, next) => {
  const {body} = req;
  const querySchema = Joi.object().keys({
    lat: Joi.number().max(90).min(-90),
    lng: Joi.number().max(180).min(-180),
    section: Joi.string().valid(...['donations', 'skills']),
  });

  const result = querySchema.validate(body);
  const {value, error} = result;
  const valid = error == null;
  let listings;
  if (!valid) {
    return res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: error,
    });
  } else {
    listings = await mongoQueries.getDocumentsByGeolocation(global.mongodb,
        body.lat, body.lng, body.section);
  }
  res.render(
      'listings',
      {
        title: 'Express',
        intro: 'Classified advertising brought to the web',
        context: 'geolocation',
        section: body.section,
        listings: listings,
        addressPoints: [],
        user: req.session.user,
        success: 'Yep, we got some :)',
      });
});

/* Add one listing. */
const Joi = require('joi');


const obj = require('../helper_ops').obj;
const ops = require('../helper_ops').ops;

const arabic = /[\u0600-\u06FF]/g;

/**
 * Detects if String is Arabic, if ration of arabic characters count is at least 0.5
 * @param {string} str The first number.
 * @return {boolean} isArabic or null.
 */
function isArabic(str) {
  const count = str.match(arabic);
  return count && ((count.length / str.length) > 0.5);
}
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');
const storage = new Storage({keyFilename: process.env.CREDS_PATH});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const donationsSchema = Joi.object().keys({
  title: Joi.string().min(10).max(100).required(),
  // .regex(/^\W*\w+(?:\W+\w+)*\W*$/)
  desc: Joi.string().min(10).max(5000).required(),
  // TODO: limit number of tags to 2
  tags: Joi.array().items(Joi.string().min(3).max(20)).required(),
  lat: Joi.number().max(90).min(-90).optional(),
  lng: Joi.number().max(180).min(-180).optional(),
  div: Joi.string().min(3).max(40).optional(),
  section: Joi.string().valid('donations').required(),
  tagsLang: Joi.string().valid(...['arabic', 'english']),
  // avatar: Joi.string().required()
});



const skillsSchema = Joi.object().keys({
  title: Joi.string().min(10).max(100).required(),
  // .regex(/^\W*\w+(?:\W+\w+)*\W*$/)
  desc: Joi.string().min(10).max(5000).required(),
  // TODO: limit number of tags to 2
  tags: Joi.array().items(Joi.string().min(3).max(20)).required(),
  section: Joi.string().valid('skills').required(),
  font: Joi.string().valid(...fontFamilies),
  illu_q: Joi.string().min(2).max(15).required(),
  undraw: Joi.string().valid(...illustrations).optional(),
  color: Joi.string().regex(/^[0-9a-f]{3,10}$/i).optional(),
  // TODO: properly validate this
  img_radio: Joi.string().optional(),
  // avatar: Joi.string().required()
});

const schema = {
  donations: donationsSchema,
  skills: skillsSchema,
};
router.post(/^\/(donations|skills|blogs)/,
    global.passwordless.restricted({failureRedirect: '/login'}),
    obj.upload.single('avatar'),
    async (req, res, next) => {
      const section = req.params[0];
      const {body} = req;
      let tags;
      let validJson = true;
      try {
        tags = JSON.parse(body.tags);
        body.tags = _.pluck(tags, 'value');
      } catch (e) {
        validJson = false;
      }
      const validPoint = ops.isPointInsidePolygon({lat: body.lat, lng: body.lng});
      if (section === 'skills') {
        // TODO: fix font as well
        [body.undraw, body.color] = body.undraw.split('#');
      }
      const result = schema[section].validate(body);
      if (section === 'skills') {
        body.undraw = body.undraw + '#' + body.color;
        delete body.color;
      }
      const {value, error} = result;
      valid = (error == null) && validJson && validPoint;
      if (!valid) {
        res.status(422).json({
          message: 'Invalid request',
          data: body,
          error: error,
        });
        // At least request object is correct
      } else {
        const password = (Math.random().toString(36).substr(4)).slice(0, 9);
        const htmlCleanDesc = ops.sanitize(body.desc);
        const maskedDesc = ops.cleanSensitive(htmlCleanDesc);
        body.desc = maskedDesc;

        // Upload that damn picture
        // Create a new blob in the bucket and upload the file data.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Files other than images are undefined
        if (!req.file) {
          res.status(422).json({
            message: 'Invalid request',
            data: body,
            error: 'file not found',
          });
        }
        const filename = uniqueSuffix + path.extname(req.file.originalname);
        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (err) => {
          next(err);
        });
        blobStream.on('finish', async () => {
          // The public URL can be used to directly access the file via HTTP.
          const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
          );
          if (section === 'skills') {
            delete body['illu_q'];
            delete body['img_radio'];
          }
          const entry = _.extend(body, {
            pass: password,
            d: false,
            a: false,
            img: publicUrl,
            usr: req.session.user,
            ara: isArabic(maskedDesc),
          });
          try {
            let entry_ = await mongoQueries.insertDocument(global.mongodb, entry);
            entry_ = JSON.parse(JSON.stringify(entry_));
            ops.toAdminMail(messages.approve.en(adminPass, entry_._id)).then((value) => {
              res.render('listing', {
                title: 'One listing',
                data: entry_,
                user: req.session.user,
                success: 'Success. Here is the password whenever you want to deactivate the listing :)',
                error: 'Image will be loaded shortly!',
              });
            }).catch((err) => {
              res.render('messages', {
                title: 'Express',
                message: 'Oops, an internal error accured :(',
                user: req.session.user,
                error: 'Oops, an internal error accured :(',
              });
            });
          } catch (error) {
            res.render('messages', {
              title: 'Express',
              message: 'Item not inserted',
              error: 'Item not inserted',
            });
          }
        });
        blobStream.end(req.file.buffer);
      }
    });


/* Deactivate one listing. */
router.post('/deactivate', async function(req, res, next) {
  const {body} = req;
  const listing = Joi.object().keys({
    password: Joi.string().min(6).max(9).required(),
  });
  const result = listing.validate(body);
  const {value, error} = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: error,
    });
  } else {
    const id = await mongoQueries.deactivateDocument(global.mongodb, body.password);
    // TODO: render the other case
    const io = req.app.get('socketio');
    io.emit('broadcast', id);
    res.render('messages', {
      title: 'Express',
      message: 'Item deactivated',
      user: req.session.user,
      success: 'Listing has been successfully deactivated. ' +
        'Users will not see it again :)',
    });
  }
});

const adminPass = process.env.PASS;

/* Admin Checks one listing;*/
router.get(`/check/${adminPass}/:id`, async function(req, res, next) {
  const hex = /[0-9A-Fa-f]{6}/g;
  const elem = (hex.test(req.params.id))?
      await mongoQueries.getDocumentById(global.mongodb, req.params.id, true) : undefined;
  if (elem) {
    elem.usr = elem.usr ? ops.initials(elem.usr) : 'YY';
    return res.render('listing', {
      title: 'Check',
      data: elem,
      success: 'Admin check :)',
      section: elem.section,
    });
  }
  // elem is empty or password is not correct
  res.render('messages', {
    title: 'Check',
    message: 'No listing found :(',
    error: 'No listing found :(',
  });
});


/* Admin Approves one listing. */
router.get(`/approve/${adminPass}/:id`, async function(req, res, next) {
  try {
    const success = await mongoQueries.approveDocument(global.mongodb, req.params.id);
    res.render('messages', {
      title: 'Approve',
      message: 'Item approval',
      success: 'Listing has been successfully approved :)',
    });
  } catch (error) {
    res.render('messages', {
      title: 'Approve',
      message: 'Item approval',
      error: 'Listing not found or already approved',
    });
  }
});


/* GET one deactivated listing; Asking user to reactivate before delete. */
router.get('/reactivate/:pass/:id', async function(req, res, next) {
  const hex = /[0-9A-Fa-f]{6}/g;
  const elem = (hex.test(req.params.id))?
      await mongoQueries.getDocumentById(global.mongodb, req.params.id, true) : undefined;
  if (elem) {
    elem.usr = elem.usr ? ops.initials(elem.usr) : 'YY';
    const pass = ops.hashCode(elem.pass + elem._id.str);
    if (pass === req.params.pass) {
      return res.render('listing', {
        title: 'Reactivate',
        data: elem,
        user: req.session.user,
        success: 'You can enter your secret code to reactivate :)',
        section: elem.section,
      });
    }
  }
  // elem is empty or password is not correct
  res.render('messages', {
    title: 'Reactivate',
    message: 'No listing found :( it can be already active or not found',
    user: req.session.user,
    error: 'No listing found :( it can be already active or not found',
  });
});

/* Reactivate one listing. */
// TODO: send email with /reactivate/
// where pass === item.pass to usr
router.post('/reactivate', async function(req, res, next) {
  const {body} = req;
  const listing = Joi.object().keys({
    password: Joi.string().min(6).max(9).required(),
  });
  const result = listing.validate(body);
  const {value, error} = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: error,
    });
  } else {
    try {
      const success = await mongoQueries.reactivateDocument(global.mongodb, body.password);
      res.render('messages', {
        title: 'Express',
        message: 'Item reactivation',
        user: req.session.user,
        success: 'Listing has been successfully reactivated. Users can see it again :)',
      });
    } catch (error) {
      res.render('messages', {
        title: 'Express',
        message: 'Item reactivation',
        error: 'Listing not found or already active',
      });
    }
  }
});

/* Contact poster one listing. */
router.post('/contact',
    global.passwordless.restricted({failureRedirect: '/login'}),
    async function(req, res, next) {
      const {body} = req;
      const listing = Joi.object().keys({
        message: Joi.string().min(20).required(),
        id: Joi.string().min(8).max(11).required(),
      });
      const result = listing.validate(body);
      const {value, error} = result;
      const valid = error == null;
      if (!valid) {
        res.status(422).json({
          message: 'Invalid request',
          data: body,
          error: error,
        });
      } else {
        // TODO: mongodb middlware
        const elem = await db.get({id: parseInt(body.id), d: 0, a: 1}, ['usr']);
        if (_.isEmpty(elem)) {
          res.render('listing', {
            title: 'messages',
            message: 'You cannot send an email to the item\'s publisher',
            user: req.session.user,
            error: 'You cannot send an email to the item\'s publisher',
          });
        }

        // MIMMail(message, EMAIL_RECIEVER, EMAIL_SENDER, subjectId)
        const mail = {
          message: body.message,
          EMAIL_SENDER: req.user,
          EMAIL_RECIEVER: elem.usr,
          subjectId: body.id,
        };
        ops.MIMMail(mail).then((value) => {
          res.render('listing', {
            title: 'messages',
            message: 'Email successfully sent to publisher, he may repond to you.',
            user: req.session.user,
            success: 'Email successfully sent to publisher',
          });
        }).catch((err) => {
          res.render('messages', {
            title: 'Express',
            message: 'Email has not been sent',
            user: req.session.user,
            error: 'Oops, an internal error accured :(',
          });
        });
      }
    });

/* TODO: throttle this and limit requests to > 3 chars*/
router.get('/autocomplete/:keyword', async function(req, res, next) {
  const keyword = req.params.keyword;
  const elems = await mongoQueries.autocomplete(global.mongodb, keyword);
  if (elems) {
    return res.status(200).json(elems);
  }
  res.render('messages', {
    title: 'Express',
    message: 'No listing found, it can be deactivated or not approved yet :(',
    user: req.session.user,
    error: 'Listing not found',
  });
});

router.get('/user',
    global.passwordless.restricted({failureRedirect: '/login'}),
    async function(req, res, next) {
      const listings = await mongoQueries.getDocumentsByUser(
          global.mongodb, req.session.user);
      res.render(
          'listings',
          {
            title: 'Your listings',
            intro: 'Classified advertising brought to the web',
            listings: listings,
            user: req.session.user,
            success: 'Yep, we got some :)',
          });
    });

module.exports = router;
