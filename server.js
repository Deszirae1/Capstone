const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { client } = require('./server/db');  // Ensure you have this import

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.log('Database connection error:', err));

app.use(express.json());

app.use("/api", require("./server/api"));  // Check if the API routes are correctly set up

app.use((err, req, res, next) => {
  console.log(err);  // Log errors
  res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);  // Ensure the server is listening on port 3000
});
