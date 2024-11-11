const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { client } = require('./server/db');  

client.connect()
   .then(() => console.log('Connected to the database'))
  .catch(err => {
    console.error('Database connection error:', err);
     process.exit(1);
   });

app.use(cors());
app.use(express.json());
app.use("/api", require("./server/api"));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server listening on port, hooray! ${port}`);
});
