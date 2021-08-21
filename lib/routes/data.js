const express = require('express');
const router = express.Router();
const giveData = require('../helper_data').give;

router.get('/get_tags_en', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsEn});
});
router.get('/get_tags_ar', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsAr});
});
router.get('/get_tags_fr', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsFr});
});

router.get('/get_donations_tags_en', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsEnLite});
});
router.get('/get_donations_tags_ar', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsArLite});
});
router.get('/get_donations_tags_fr', function(req, res, next) {
  res.status(200).json({tags: giveData.googleTagsFrLite});
});
router.get('/get_skills_tags_en', function(req, res, next) {
  res.status(200).json({tags: giveData.ESCOTagsEn});
});
router.get('/get_skills_tags_fr', function(req, res, next) {
  res.status(200).json({tags: giveData.ESCOTagsFr});
});
router.get('/get_skills_tags_ar', function(req, res, next) {
  res.status(200).json({tags: giveData.ESCOTagsAr});
});

module.exports = router;