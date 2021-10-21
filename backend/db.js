const Pool = require('pg').Pool;

const pool = new Pool({
  user: "hobby_chat_app",
  password: "chatter18",
  database: "hobby_chat_app",
  host: "localhost",
  port: 5432
});

module.exports = pool;