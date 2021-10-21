const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const port = 8000;

app.use(cors());
app.use(express.json());

// app.get('/users', (req,res) => {
//   console.log("hello");
// });


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});