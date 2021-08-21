const express = require('express');
const router = express.Router();
const mongoQueries = require('../mongo_ops').mongoQueries;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const listings = await mongoQueries.getDocumentsSince(
      global.mongodb, 20, '', req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;
  res.render('index', {
    title: 'Classified-ads-48',
    user: req.session.user,
    listings: listings.documents,
    current: page,
    pages: Math.ceil(listings.count / perPage),
  });
});

router.get('/tag/:tag', async function(req, res, next) {
  const tag = req.params.tag;
  const listings = await mongoQueries.getDocumentsByTag(
      global.mongodb, tag, req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;
  res.render('index', {
    title: tag,
    user: req.session.user,
    listings: listings.documents,
    current: page,
    pages: Math.ceil(listings.count / perPage),
  });
});


router.get('/division/:division', async function(req, res, next) {
  const division = req.params.division;
  const listings = await mongoQueries.getDocumentsByDivision(
      global.mongodb, division, req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;
  res.render('index', {
    title: division,
    user: req.session.user,
    listings: listings.documents,
    current: page,
    pages: Math.ceil(listings.count / perPage),
  });
});

router.get('/keyword/:keyword', async function(req, res, next) {
  const keyword = req.params.keyword;
  const listings = await mongoQueries.getDocumentsByKeyword(
      global.mongodb, keyword, req.body.pagination);
  const {page: page, perPage: perPage} = req.body.pagination;
  res.render('index', {
    title: keyword,
    user: req.session.user,
    listings: listings.documents,
    current: page,
    pages: Math.ceil(listings.count / perPage),
  });
});

// Blog pages are pages with little server processing
router.get('/categories', function(req, res, next) {
  res.render('blogs', {
    title: 'Categories',
    user: req.session.user, sections: [
      {id: 'Donations', html: req.t('Donations')},
      {id: 'Skills', html: req.t('Skills')},
      {id: 'Blogs', html: req.t('Blogs')},
    ],
  });
});

router.get('/about', function(req, res, next) {
  res.render('blogs', {
    title: 'What is Classified-ads-48',
    user: req.session.user,
    sections: [
      {id: 'What is', html: req.t('What is')},
      {id: 'Careful', html: req.t('What is, careful')},
    ],
  });
});

router.get('/howto', function(req, res, next) {
  res.render('blogs', {
    title: 'How to post on Listings',
    user: req.session.user,
    sections: [
      {id: 'Careful', html: req.t('Careful')},
      {id: 'Login', html: req.t('Login')},
      {id: 'Validation', html: req.t('Validation')},
    ],
  });
});

router.get('/policy', function(req, res, next) {
  res.render('blogs', {
    title: 'Terms of usage', user: req.session.user, sections: [
      {id: 'sec1', html: 'bob'},
      {id: 'sec2', html: 'lorem upsom lorem upsom lorem upsom lorem  '},
      {id: 'sec3', html: 'lorem upsom lorem upsom lorem upsom lorem  '.toUpperCase()},
    ],
  });
});

const svgs = require('../bigToes').svgs;
router.get('/fennec-fox', function(req, res, next) {
  const idx = Math.floor(Math.random() * 4) + 1;
  res.render('easteregg', {
    svg: svgs[idx],
    style: `easteregg-${idx}.css`,
  });
});

const freemail = require('freemail');
router.get('/login', function(req, res) {
  const errors = req.flash('passwordless');
  let errHtml = '';
  for (let i = errors.length - 1; i >= 0; i--) {
    errHtml += errors[i];
  }
  res.render('login', {error: errHtml});
});

router.post(
    '/sendtoken',
    // urlencodedParser,
    global.passwordless.requestToken(
    // Simply accept every user*
        function(user, delivery, callback) {
          if (freemail.isFree(user) && !freemail.isDisposable(user)) {
            callback(null, user);
          } else {
            callback(null, null);
          }
        }
        , {failureRedirect: '/login', failureFlash: 'This user is unknown!'}),
    function(req, res) {
      res.send('Check your email. You will be able to login from there.');
    },
);

router.get('/logged_in', global.passwordless.acceptToken(),
    function(req, res) {
      req.session.user = req.user;
      res.render('messages', {
        title: 'Express',
        message: 'User login',
        success: 'User has been successfully logged in :)',
      });
    });

module.exports = router;
