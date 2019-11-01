const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'dfuent',
  host: 'localhost',
  database: 'movies',
  password: '',
  port: 5432
});

module.exports = pool;
