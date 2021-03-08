// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model.js");
server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio)
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  else
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res
          .status(500)
          .json({
            message: "There was an error while saving the user to the database",
          });
      });
});
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user)
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      else res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.remove(id)
    .then((user) => {
      if (!user)
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      else res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  if (!updatedUser.name || !updatedUser.bio)
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  else {
    User.update(id, updatedUser)
      .then((user) => {
        if (!user)
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        else 
        res.status(200).json(user);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
