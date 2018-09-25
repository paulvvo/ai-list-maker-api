const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

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


app.get("/", function(req,res){
  //this route can send out json
  res.json(database[0]);
})

app.post("/signin", (req,res) =>{
  const {email, password} = req.body;

  database[0].email === email && database[0].password===password
  ? res.json(database[0])
  : res.status(400).json("Error Signing In, Check Email or Password");
});

app.post("/register", (req,res) =>{
  const {email, password, name} = req.body;

  if(email && password){
    const newUser = {
      email,
      password,
      name,
      list:[],
    }
    database.push(newUser);
    console.log(database);
    res.json(newUser);
  }else{
    res.status(400).json("Please Enter Both Email and Password in Register Form");
  }
});

app.listen(3000, () =>{
  console.log("Server is listening");
});

//Routes
// signin
// register
// user
// signout
