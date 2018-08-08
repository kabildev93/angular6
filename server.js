const express = require('express');
const path =require('path');
const app=express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

const posts = require('./server/routes/posts');


app.use(express.static(path.join(__dirname,'src')));
app.use('/posts', posts);


app.get('*',(req,res)=>{

	res.sendFile(path.join(__dirname,'src/index.html'))

});

const port = process.env.PORT || 4600;
app.listen(port,(req,res)=>{
	console.log('Running on port' +port);

});