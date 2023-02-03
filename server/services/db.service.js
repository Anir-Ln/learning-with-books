const sqlite = require('better-sqlite3')
const path = require('path')

const db_path = path.resolve(path.join('helpers', 'database.db'))
console.log(db_path);
const db = sqlite(db_path, {fileMustExist: true})

const query = (sql, params) => {
  return db.prepare(sql).all(params)
}

module.exports = {
  query
}