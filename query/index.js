const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
app.get('/posts', (req,res)=> {

});

app.post('/events', (req,res)=>{

});

app.listen(4002, ()=> console.log('Query service listening on 4002'))