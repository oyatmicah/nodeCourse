const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("bacon", 8);
const app = express();
const port = 3000;
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Jide",
      email: "jide@gmail.com",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "apple",
    "$2a$10$3yruaCilBNiTeO3ixFEu7eP2xnWYx40yOwuFQ7bGx9JK/OvXziCwO",
    function (err, res) {
      console.log("first guess", res);
    }
  );
  bcrypt.compare("not_bacon", "$2a$10$3yruaCilBNiTeO3ixFEu7eP2xnWYx40yOwuFQ7bGx9JK/OvXziCwO", function (err, res) {
    console.log("second guess", res);
  });

  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("Error signing in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  //   bcrypt.genSalt(10, function(err, salt){
  //       bcrypt.hash(password, salt, function (err, hash) {
  //         console.log(hash);
  //       });
  //   })
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

// Load hash from your password DB.

bcrypt.compare("not_bacon", hash, function (err, res) {
  // res === false
});

// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("B4c0//", hash).then((res) => {
  // res === true
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
