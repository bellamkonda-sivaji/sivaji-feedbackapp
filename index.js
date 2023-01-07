
const express = require("express");
const path = require('path');
const cors = require('cors')
const app = express();
const port = 3000;

const db=require('./db')

app.use(express.json())
app.use(express.urlencoded());

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, PATCH. OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.post("/feedback",db.createFeed)
app.get('/feedback',db.getFeed)

// Server setup
app.listen(port, () => {
	console.log("server is running");
});

app.use(function(req, res, next) {
	res.status(404);
	if (req.accepts('json')) {
		res.json({ error: 'Not found' });
		return;
	  }
})
