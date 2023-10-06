const Pool = require('pg').Pool

const pool = new Pool({
    user: 'jocsakesley',
    host: 'localhost',
    database: 'bank',
    password: '123456',
    port: 5432
})


module.exports = {
    pool
  }