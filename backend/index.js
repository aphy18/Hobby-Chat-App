/* eslint-disable camelcase */
const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const port = 8080;
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());


app.post('/register', async(req,res) => {
  console.log('reqbody -->', req.body);
  try {
    let { username, first_name, last_name, gender, address, email, password, password_confirm } = req.body.values;
    password = await bcrypt.hashSync(password, 10);
    password_confirm = await bcrypt.hashSync(password_confirm, 10);

    console.log('hashed password -->', password);
    console.log('hashed password 2 -->', password_confirm);

    const userRegistration = await pool.query(
      `INSERT INTO person (username, first_name, last_name, person_gender, person_address, person_email, person_password, password_confirm) 
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING * `, [username, first_name, last_name, gender, address, email, password, password_confirm]);
    res.json(userRegistration.rows[0]);
    console.log('User registration ---->', userRegistration.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/login', async(req,res) => {
  try {
    const { email, password } = req.body.values;

    const userLogin = await pool.query(
      `SELECT * FROM person WHERE person_email = $1 AND person_password = $2`,
      [email, password]);

    console.log('rows 42 -->',userLogin.rows[0]);
    if (bcrypt.compare(password, userLogin.rows[0].person_password)) {
      res.json(userLogin.rows[0]);
      console.log('user just logged in -->', userLogin.rows[0]);
    } else {
      console.log('passwords do not match');
    }
  } catch (err) {
    console.log(err.message);
  }
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});