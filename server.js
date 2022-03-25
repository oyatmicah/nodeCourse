const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
