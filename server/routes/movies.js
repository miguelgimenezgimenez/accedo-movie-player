const express = require('express')

const router = express.Router()
const movieController = require('../controllers/movie')
const asyncWrapper = require('../utils/asyncWrapper')

// GET ALL MOVIES //
router.get('/', asyncWrapper(async (req, res, next) => {
  const movies = await movieController.list()
  res.json(movies)
}))
module.exports = router
