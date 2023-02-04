const express = require('express')
const router = express.Router()
const phrasesService = require('../services/phrases.service')
const phraseValidator = require('../middleware/phrasevalidator')

// get phrases
router.get("/", (req, res, next) => {
  console.log("phrases get all endpoint");
  try {
    res.json(phrasesService.getAll())
  } catch(err) {
    console.log("error while getting phrases ", err.message);
    next(err)
  }
})

router.post("/", phraseValidator.validateCreate, (req, res, next) => {
  console.log("phrases post endpoint");
  try {
    res.json(phrasesService.save(req.body))
  } catch(err) {
    console.log("error while posting a phrase ", err.message);
    next(err)
  }
})

module.exports = router