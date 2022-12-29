const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require('cors')
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] ||[]);
});

app.post("/posts/:id/comments",async  (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  const commentId = randomBytes(4).toString("hex");
  const {content} = req.body
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  
 await axios.post('http://localhost:4005/events',{
    type:'CommentCreated',
    data :{
      id:commentId,
      content,
      postId: req.params.id
    }
  }).catch((e)=> console.log("Error",e))


  res.send(comments);
});

app.post('/events', (req,res)=> {
  console.log('Received Event', req.body.type)
  res.send({})
})

app.listen(4001, () => {
  console.log("Comments Service listening on PORT 4001");
});
