const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");

router.post("/", (req, res) => {
  let { users, body, userId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing Email/Password" });
  }

  password = sha256(password + salt);

  const user = getUser(users, email, password);

  if (user) {
    res.send({ status: 0, reason: "Email already exists" });
    return;
  }
  userId.value += Math.floor(Math.random() * 11 + 1);
  req.users.push({ id: userId.value, email, password });
  res.send({ status: 1, id: userId.value });
});

router.patch("/:id", (req, res) => {
  const { email, password } = req.body;
  let { id } = req.params;
  const { users } = req;

  if (!(email || password)) {
    res.send({ stauts: 0, reason: "Missing Data" });
  }

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the ID" });
  }

  if (email) {
    users[indexOf].email = email;
  }
  if (password) {
    users[indexOf].password = sha256(password + salt);
  }

  res.send({ status: 1 });
});

router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the ID" });
  }

  res.send({ status: 1, user: users[indexOf] });
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the ID" });
  }

  users.splice(indexOf, 1);
  res.send({ status: 1 });
});

module.exports = router;
