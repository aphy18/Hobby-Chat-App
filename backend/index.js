/* eslint-disable camelcase */
const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const port = 8080;
const bcryptjs = require('bcryptjs');

app.use(cors());
app.use(express.json());


app.post('/register', async(req,res) => {
  console.log('reqbody -->', req.body);
  try {
    const { username, first_name, last_name, gender, address, email, password, password_confirm } = req.body.values;
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hashSync(password, salt);
    // console.log("salt --->", salt);
    // console.log("hashed pass -->", hashedPassword);

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const hashedPasswordConfirm = bcryptjs.hashSync(password_confirm, 10);

    console.log('hashed password -->');
    console.log('hashed password 2 -->');

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
    console.log('user just logged in -->', userLogin.rows[0]);
    res.json(userLogin.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});