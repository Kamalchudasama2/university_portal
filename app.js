var express = require('express');
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var mysql = require("mysql");
var app = express();

/*--------------------Routing start----------------------------*/

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// get the login, sign up pages start

app.get('/', function(req, res) {
  res.sendfile('signup.html');
});

app.get('/login.html', function(req, res) {
  res.sendfile(__dirname + '/login.html');
});

app.get('/signup.html', function(req, res) {
  res.sendfile(__dirname + '/signup.html');
});

app.get('/home.html', function(req, res) {
  res.sendFile(__dirname + "/views/Home.html");
});

app.get('/Attendence.html', function(req, res) {
  res.sendFile(__dirname + "/views/Attendence.html")
});

app.get('/Marksheet.html', function(req, res) {
  res.sendFile(__dirname + "/views/Marksheet.html");
});


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kam@13032003",
  database: "hackathon",
});
connection.connect(function(err) {
  if (!err) {
    console.log("DB Connection Succeeded");
  }
  console.log(err);
});


app.post('/', function(req, res, next) {

  global.rand = Math.floor(100000 + Math.random() * 900000);
      console.log(rand);
  global.empname = req.body.empname;
  global.email = req.body.email;
  global.emppassword = req.body.emppassword;

  global.search = 'select* from employee where email= "' + email + '" and emppassword="' + emppassword + '"';

global.query = 'INSERT INTO employee (empname, email,emppassword) values ("' + empname + '", "' + email + '","' + emppassword + '")';

// search for the email wether it is exists or not

  connection.query(search, function(err, data) {
    if (err) {
        console.log(err);
    }
      console.log(data.length);
    if (data.length != 0) {
      console.log(data.length);
      res.sendfile(__dirname+"/views/home.html");
    }
   else
   {
      res.sendfile(__dirname+"/error.html");
  }
});
});
// if not exists then send the email using nodemailer

app.post('/signup', function(req, res, next) {
global.empname = req.body.empname;
global.email = req.body.email;
global.emppassword = req.body.emppassword;
global.rand = Math.floor(100000 + Math.random() * 900000);

global.search = 'select* from employee where email= "' + email + '" and emppassword="' + emppassword + '"';
global.query = 'INSERT INTO employee (empname, email,emppassword) values ("' + empname + '", "' + email + '","' + emppassword + '")';

    var mailOptions, host, link;
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "",   //your email, from which mail will be sent
          pass: ""   //your gmail password which will going to be around 15 letters
        }
      });

      var mailOptions = {
        to: email,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please tell OTP to the admin to get your email verify.<br><br><h1> " + rand + "</h1>"
      }

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          res.send("error");}

          else{

// insterting the data into the database if user not exists

            connection.query(query, function(err, data) {
              if (err) {
              res.send("user already exists");
              }
              else {
              console.log("inserted");}
            });
          }
        });

          });

          app.post('/otp', function(request, response) {
            console.log(rand);
            var otp = request.body.otp;
            console.log(otp);
            if(rand != otp) {
              response.send("otp isn't match");
            }

            if (rand == otp) {
              response.sendfile(__dirname + '/varify.html');
            }

          });


/*--------------------Routing over----------------------------*/

app.listen(3000, function() {
  console.log("Express Started on Port 3000");
});
