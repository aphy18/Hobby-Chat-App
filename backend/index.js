/* eslint-disable camelcase */
const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const server = require('http').createServer(app);
// asterick is not recommended
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

app.get('/view', async(req,res) => {
  try {
    const getUser = await pool.query(
      `SELECT person.id, username, person_bio, hobby.* FROM person JOIN hobby ON person.id = person_id;`
    );
    res.json(getUser.rows);
    console.log('VIEW PAGE', getUser.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/checkrequests', async(req,res) => {
  const getFriendRequests = await pool.query(`
    SELECT * FROM friend_request`);
  res.json(getFriendRequests.rows);
});

app.post('/view', async(req,res) => {
  try {
    const { id } = req.body.userObj;
    const { person_id } = req.body.receiverObj;
    const senderName = req.body.userObj.username;
    const receiverName = req.body.receiverObj.username;
    console.log('req.body', req.body);
    const establishFriendReq = await pool.query(`
    INSERT INTO friend_request (sender_username, receiver_username, sender_id, receiver_id) VALUES ($1, $2, $3, $4)`, [senderName, receiverName, id, person_id]);
    console.log('establish', establishFriendReq.rows);
    res.json(establishFriendReq.rows);
  } catch (err) {
    console.log('error message',err.message);
  }
});

app.get('/requests', async(req,res) => {
  try {
    const getFriendReq = await pool.query(`SELECT * FROM friend_request`);
    console.log('getting all friend requests', getFriendReq.rows);
    res.json(getFriendReq.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.post('/requests', async(req,res) => {
  try {
    console.log('req.body of friends',req.body);
    const { receiver_username, sender_username, sender_id, receiver_id } = req.body.requestObj;

    const firstPost = await pool.query(`
    INSERT INTO friends (username, friend_username, sender_id, receiver_id) VALUES ($1, $2, $3, $4)`, [receiver_username,sender_username, receiver_id, sender_id]);
    const secondPost = await pool.query(`
    INSERT INTO friends (username, friend_username, sender_id, receiver_id) VALUES ($1, $2, $3, $4)`, [sender_username,receiver_username, sender_id, receiver_id]);

    res.json(firstPost.rows);
    res.json(secondPost.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/requests', async(req,res) => {
  try {
    console.log('req body 88 -->', req.body);
    const { sender_id, receiver_id } = req.body.requestObj;
    const deleteRequest = await pool.query(`
    DELETE FROM friend_request WHERE receiver_id = $1 AND sender_id = $2`,[receiver_id, sender_id]);
    res.json(deleteRequest.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/friends', async(req,res) => {
  try {
    const getFriends = await pool.query(`
    SELECT * FROM friends`);
    console.log('get friends', getFriends.rows);
    res.json(getFriends.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/friends', async(req,res) => {
  try {
    console.log('req.body delete friend',req.body);
    const { sender_id } = req.body.obj;
    const { receiver_id } = req.body.obj;
    const removeFriendOne = await pool.query(`
    DELETE FROM friends WHERE sender_id = $1 AND receiver_id = $2 OR sender_id = $2 AND receiver_id = $1`,[sender_id, receiver_id]);
    res.json(removeFriendOne.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.get('/register', async(req,res) => {
  try {
    const getData = await pool.query(
      `SELECT person_email FROM person`
    );
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING * `, [username, first_name, last_name, gender, address, email, password, password_confirm]);

    res.json(userRegistration.rows[0]);
    console.log('User registration ---->', userRegistration.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/firsthobby', async(req,res) => {
  try {
    console.log('req body',req.body);
    const { currentUserID } = req.body;
    const { hobby_name, level_of_expertise, my_spending_estimate, amount_of_time } = req.body.values;
    const firstHobby = await pool.query(`
    INSERT INTO hobby (hobby_name, level_of_expertise, my_spending_estimate, amount_of_time_doing_hobby, person_id) VALUES ($1, $2, $3, $4, $5)`, [hobby_name, level_of_expertise, my_spending_estimate, amount_of_time, currentUserID]);
    res.json(firstHobby.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/login', async(req,res) => {
  try {
    const getData = await pool.query(
      `SELECT person_email,person_password FROM person`
    );
    console.log(getData.rows);
    res.json(getData.rows);
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

app.put('/changepassword', async(req,res) => {
  try {
    const { password, password_confirm } = req.body.values;
    const { id } = req.body.userObj;
    const updatePassword = await pool.query(`
    UPDATE person
    SET person_password = $1,
    password_confirm = $2
    WHERE id = ${id}`,[password, password_confirm]);
    res.json(updatePassword.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/message', async(req,res) => {
  try {
    console.log('on message page');
    const getFriends = await pool.query(`
    SELECT * FROM friends`);
    console.log(getFriends.rows);
    res.json(getFriends.rows);
  } catch (err) {
    console.log('err message',err.message);
  }
});

app.post('/message',async(req,res) => {
  try {
    console.log('sending message req.body',req.body);
    const { message } = req.body.values;
    const { sender_id,receiver_id } = req.body.arr[0];
    const saveMessage = await pool.query(`INSERT INTO user_conversations (person_message,sender_id,receiver_id) VALUES ($1, $2, $3)`,[message,sender_id,receiver_id]);
    console.log('saving message -->',saveMessage.rows);
    res.json(saveMessage.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.get('/getmessage',async(req,res) => {
  try {
    const getMessage = await pool.query(`SELECT * FROM user_coversations`);
    res.json(getMessage.rows);
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
    console.log('the value',value);
  });
});


