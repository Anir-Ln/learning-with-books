const db = require('./db.service')

const getAll = () => {
  return db.query("SELECT * FROM phrases", [])
}

const save = (phrase) => {
  return db.run(
    `INSERT INTO phrases(text, meaning, phrase_type_id, learning_level_id) VALUES(:text, :meaning, :phrase_type_id, :learning_level_id)`,
    phrase 
  )
}


module.exports = {
  getAll,
  save,
}