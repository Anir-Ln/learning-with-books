const db = require('./db.service')

const getAll = () => {
  return db.query("SELECT * FROM phrases", [])
}



module.exports = {
  getAll,
}