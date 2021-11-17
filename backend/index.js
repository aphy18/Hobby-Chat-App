/* eslint-disable camelcase */
const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" }});

const pool = require('./db');

// const bcrypt = require('bcryptjs');


app.use(cors());
app.use(express.json());

app.get('/', async(req,res) => {
  try {
    const getAllUserInfo = await pool.query(
      `SELECT id, username, first_name, last_name, person_gender, 
        person_address, person_email, person_bio FROM person ORDER BY id`
    );
    res.json(getAllUserInfo.rows);
    console.log('JUST GOT TO HOME PAGE', getAllUserInfo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/register', async(req,res) => {
  try {
    const getData = await pool.query(
      `SELECT person_email FROM person`
    );
    console.log('CONSOLE LOG THIS',getData.rows);
    res.json(getData.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.post('/register', async(req,res) => {
  console.log('reqbody -->', req.body);
  try {
    let { username, first_name, last_name, gender, address, email, password, password_confirm } = req.body.values;
    // password = await bcrypt.hashSync(password, 10);
    // password_confirm = await bcrypt.hashSync(password_confirm, 10);

    // console.log('hashed password -->', password);
    // console.log('hashed password 2 -->', password_confirm);

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
    res.json(userLogin.rows[0]);
    console.log('user just logged in -->', userLogin.rows[0]);
    
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/profile/:id', async(req,res) => {
  try {
    const { id } = req.params;
    const getUserProfile = await pool.query(
      `SELECT person.id, person.username, person.first_name, person.last_name, person.person_gender, 
      person.person_address, person.person_email, person.person_bio, hobby_name, level_of_expertise, amount_of_time_doing_hobby, my_spending_estimate
      FROM person
      JOIN hobby ON person.id = person_id
      WHERE person.id = ${id}`);
    console.log('getting user profile -->', getUserProfile.rows);
    res.json(getUserProfile.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/profile/:id', async(req,res) => {
  try {
    console.log('req.bodyyy ->', req.body);
    const { username, first_name, last_name, person_gender, person_address, person_email, person_bio } = req.body.values;
    const { id } = req.params;
    console.log('received values -->', req.body);
    const updateProfile = await pool.query(
      `UPDATE person
      SET username = $1,
      first_name = $2,
      last_name = $3,
      person_gender = $4,
      person_address = $5,
      person_email = $6,
      person_bio = $7
      WHERE id = ${id}`,
      [username, first_name, last_name, person_gender, person_address, person_email, person_bio]);
    console.log('updated profile values -->', updateProfile.rows);
    res.json(updateProfile.rows);

  } catch (err) {
    console.log(err.message);
  }
});

app.get('/hobby/:id', async(req,res) => {
  const { id } = req.params;
  const getHobbyInfo = await pool.query(
    `SELECT * FROM hobby WHERE person_id = ${id}`
  );
  console.log('everything i can see on this page -->', getHobbyInfo.rows);
  res.json(getHobbyInfo.rows);
});

app.post('/hobby/:id', async(req,res) => {
  try {
    const { hobby_name,level_of_expertise,my_spending_estimate, amount_of_time_doing_hobby, person_id } = req.body.values;
    console.log('req.body -->', req.body.values);
    await pool.query(
      `INSERT INTO hobby (hobby_name,level_of_expertise,my_spending_estimate, amount_of_time_doing_hobby, person_id)
      VALUES ($1, $2, $3, $4, $5);`,[hobby_name, level_of_expertise, my_spending_estimate, amount_of_time_doing_hobby, person_id]);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/messageList', async(req,res) => {
  try {
    const getAllUserInfo = await pool.query(
      `SELECT id, username, first_name, last_name, person_gender, 
        person_address, person_email, person_bio FROM person ORDER BY id`
    );
    res.json(getAllUserInfo.rows);
    console.log('All user info --->', getAllUserInfo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// this is where receiver_id is set

app.post('/messageList', async(req,res) => {
  try {
    const { arr } = req.body;
    console.log('req.bodyyyyy -->', req.body);
  
    const postCurrentUser = await pool.query(`
    INSERT INTO id_storage (receiver_id) VALUES ($1)`, [arr]);
    console.log('current user rows', postCurrentUser.rows[0]);
    res.json(postCurrentUser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// put messageList ?

app.get('/message/:id', async(req,res) => {
  try {
    console.log('REQ BODY 165', req.body);
    const getUserInfo = await pool.query(`SELECT receiver_id FROM id_storage`);
    console.log('id storage and send message', getUserInfo.rows);
    const seeMessage = await pool.query(`SELECT * FROM send_message`);
    console.log('all messages',seeMessage.rows);
    res.json(getUserInfo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/message/:id', async(req,res) => {
  const { message } = req.body.values;
  const { id, username } = req.body.userObj;
  const receiverId = parseInt(req.params.id);

  try {
    const postMessage = await pool.query(`INSERT INTO send_message (text_message, sender_username, sender_id, receiver_id) VALUES ($1, $2, $3, $4)`, [message, username, id, receiverId]);
    res.json(postMessage.rows);
  } catch (err) {
    console.log(err.message);
  }
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});


// all io code in this function

io.on('connection', (socket) => {
  console.log('user connected to socket', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected from socket');
  });

  socket.on('message', (data, value) => {
    io.emit('message', data);
    console.log("data from message -->", data);
  });
});


