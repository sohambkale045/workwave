const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db'); // Assuming db.js is in the same directory

// Call the connection function before starting the server
mongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


app.get('/', (req, res) => {
  res.send('Hello World!');
});