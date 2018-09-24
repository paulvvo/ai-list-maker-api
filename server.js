const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
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
  res.json(obj);
})

app.listen(3000, () =>{
  console.log("Server is listening");
});

//Routes
// signin
// register
// user
// signout
