const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  insecureAuth : true,
  database: 'haikus'
});

con.connect(function(err) {
	if (err) throw err;

		 console.log("Connected!");
});


class Haiku{
	constructor(id_code,author,line_1,line_2,line_3){
		this.id_code = id_code;
		this.author = author;
		this.line_1 = line_1;
		this.line_2 = line_2;
		this.line_3 = line_3;
	}
}

app.get('/express_backend', (req, res) => {
  console.log("actually CONNECTED")
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/',function (req,res) {
	res.send('Homepage');
});

app.use('/test', express.static(__dirname + '/test'));

app.get('/haikus',function (req,res) {

		 con.query(`SELECT id,author,line_1,line_2,line_3 FROM HAIKUS ORDER BY id DESC`, function (err, result) {
			    if (err) throw err;
			    res.json(result);
		    });


});

app.post('/addhaiku',function(req,res){
		console.log('body');
		console.log(req.body);
  //  var haiku = JSON.parse(req.body)
				con.query(`Insert INTO haikus (author,line_1,line_2,line_3) VALUES ?`,
					[req.body.author,req.body.line_1,req.body.line_2,req.body.line_3], function (err, result) {
				    	if (err) res.status(500).json({ error: err.message });
              res.sendStatus(200);
					});



});
app.post('/test',function(req,res){
	console.log(req.body)
	res.send(200)
})

app.listen(port, function(){
	console.log(`Server listening on port ${port}`)
})
