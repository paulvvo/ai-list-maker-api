const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'password',
    database : 'listmakerai'
  }
});

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const database = [
  {
    name: "Billy",
    password: "pass",
    email: "billy@gmail.com",
    list: [1,2,3,4,5,6]
  },
  {
    name: "Jack",
    password: "pass",
    email: "jack@gmail.com",
    list: [1,2,3,4,5,6]
  },
  {
    name: "Berry",
    password: "pass",
    email: "berry@gmail.com",
    list: [1,2,3,4,5,6]
  },
  {
    name: "yogurt",
    password: "pass",
    email: "yogurt@gmail.com",
    list: [1,2,3,4,5,6]
  }
]


// console.log("here");
// knex('logins')
//   .where({ email: 'fdsa' })
//   .then(console.log);


// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//   console.log(hash);
//   bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
//     if(res){
//       console.log("yeeboi it worked");
//     }
//   });
// });

app.get("/", function(req,res){
  res.json(database[0]);
})

app.post("/signin", (req,res) =>{
  const {email, password} = req.body;

  knex("logins").where({email})
  .then(foundUser => {
    if(foundUser[0]){
      bcrypt.compare(foundUser[0].hash, password, function(err,results){
        if(err){
          res.status(400).json("Failed to Login, Please Try Again [Code:Compara]")
        }
        res.json(foundUser[0]);
      })
    }else{
      res.status(400).json("Failed to Login, Please Try Again [Code:!Select]");
    }
  });
});

app.post("/register", (req,res) =>{
  const {email, password, name} = req.body;

  if(email && password){
    bcrypt.hash(password, 10, function(err,hash){
      console.log(hash);
      knex("logins").insert({
        email,
        hash,
      })
      .returning("*")
      .then(returningUser => {
          res.json(returningUser[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json("Error Registering User, Please Try Again");
      });
    });

  }else{
    res.status(400).json("Please Enter Both Email and Password in Register Form");
  }
});

app.get("/analyze", (req,res) =>{
  res.json("analyze route");
})

app.listen(3000, () =>{
  console.log("Server is listening");
});

//Routes
// signin
// register
// user
// signout
