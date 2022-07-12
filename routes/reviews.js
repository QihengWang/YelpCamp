const express = require('express');
const router = express.Router({ mergeParams: true});//让line27获取到req.params.id
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const Review = require('../models/review');
const Joi = require('joi');
const reviews = require('../controllers/reviews');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;