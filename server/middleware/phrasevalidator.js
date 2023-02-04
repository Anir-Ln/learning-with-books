
const validateCreate = (req, res, next) => {
  const phrase = req.body
  const messages = []

  if (!phrase) {
    messages.push("No phrase object is provided!")
  }
  if (!phrase?.text) messages.push("text is not provided")
  if (!phrase?.phrase_type_id) messages.push("phrase_type_id is not provided")
  if (!phrase?.learning_level_id) messages.push("learning_level_id is not provided")

  if (messages.length === 0) {
    next()
    return
  }

  res.status(400).send({"message": messages.join(", ")})
}

const test = (req, res, next) => {
  next()
}

module.exports = {
  validateCreate,
  test
}