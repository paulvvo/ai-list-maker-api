const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const clarifai = require("clarifai");

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const imageurl = require("./controllers/imageurl");
const itemList = require("./controllers/itemList");


const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
    // host : 'localhost',
    // user : 'postgres',
    // password : 'password',
    // database : 'listmakerai'
  }
});

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.json("Server Running");
})
app.post("/signin", (req,res) =>{
  signin.handleSignIn(req,res,bcrypt,knex);
});
app.post("/register", (req,res)=>{
  register.handleRegister(req,res,bcrypt,knex);
});

app.post("/urlInputAnalyze", (req,res) =>{
  imageurl.handleImageUrl(req,res,knex);
})

app.put("/itemList", (req,res) =>{
  itemList.handleUpdateItemList(req,res,knex);
});



app.listen(3000, () =>{
  console.log("Server is listening");
});

//Routes
// signin
// register
// user
// signout
// listupdate (add) post
// listupdate modify put
//listdeleteitem delete


  //
  // const newOjb = [
  //     {jack:"yellow"},
  //     {terry:"red"},
  //     {cole:"blue"}
  // ];
  //
  // knex("jsontest").insert({
  //   data:JSON.stringify(newOjb)
  // })
  // .catch(err => console.log("There was an error"));
  //
  // knex("jsontest")
  // .then(response => res.json(response));
