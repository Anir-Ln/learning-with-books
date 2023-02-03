const express = require('express')
const router = express.Router()
const phrasesService = require('../services/phrases.service')

// get phrases
router.get("/", (req, res, next) => {
  console.log("phrases get all endpoint");
  try {
    res.json(phrasesService.getAll())
  } catch(err) {
    console.log(err);
    next(err)
  }
})

module.exports = router