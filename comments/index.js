const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] ||[]);
});

app.post("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  const commentId = randomBytes(4).toString("hex");
  comments.push({ id: commentId, content: req.body.content });
  commentsByPostId[req.params.id] = comments;
  res.send(comments);
});

app.listen(4001, () => {
  console.log("Comments Service listening on PORT 4001");
});
