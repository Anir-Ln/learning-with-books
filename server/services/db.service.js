const sqlite = require('better-sqlite3')
const path = require('path')

const db_path = path.resolve(path.join('helpers', 'database.db'))
const db = sqlite(db_path, {fileMustExist: true})

// console.log(db_path);
console.log('db successfully connected...');

const query = (sql, params) => {
  return db.prepare(sql).all(params)
}

const run = (sql, params) => {
  return db.prepare(sql).run(params)
}

module.exports = {
  query,
  run,
}