const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
 apiKey: 'd4ccf75959a54619b16a900eab3667e7'
});

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



app.get("/", function(req,res){
  res.json("Server Running");
})

app.post("/signin", (req,res) =>{
  const {email, password} = req.body;
  // console.log(req.body);
  // console.log(email);
  // console.log(password);

  knex("logins").where({email})
  .then(foundUser => {

    if(foundUser[0] && foundUser.length >0){
      bcrypt.compare(password, foundUser[0].hash, function(err,result){
        if(err){
          console.log(err);
          res.status(400).json("Failed to Login, Please Try Again");
        }else if(result){
          knex("users")
          .where({email:email})
          .then(user => res.json(user[0]));
        }else {
          res.status(400).json("Failed to Login, Please Try Again");
        }
      })
    }else{
      res.status(400).json("Failed to Login, Please Try Again");
    }
  });
});

app.post("/register", (req,res) =>{
  const {email, password, name} = req.body;

  if(email && password){

    bcrypt.hash(password, 10, function(err,hash){
      // console.log(hash);
      knex.transaction(trx => {
        trx("logins").insert({
          email,
          hash,
        })
        .returning("email")
        .then(returningEmail => {
          return trx("users").insert({
            name:name,
            email:returningEmail[0],
            detecteditems: JSON.stringify([])
          })
          .returning("*")
          .then(returningUser => res.json(returningUser[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback)

      }).catch(err => {
        console.log(err);
        res.status(400).json("Error Registering User, Please Try Again");
      });
    });
  }else{
    res.status(400).json("Please Enter Both Email and Password in Register Form");
  }
});

app.post("/urlInputAnalyze", (req,res) =>{
  console.log(req.body.urlInput);
  console.log(req.body.email);
  clarifaiApp.models
  .predict("aaa03c23b3724a16a56b629203edc62c", req.body.urlInput)
  .then(response => {
      //insert into users(urlInput, detecteditems) values("fdas", [{"fds":"fds"},{"fd"}])
      // knex('books')
      // .where('published_date', '<', 2000)
      // .update({
      //   status: 'archived',
      //   thisKeyIsSkipped: undefined
      // })
      // Outputs:
      // update `books` set `status` = 'archived' where `published_date` < 2000
      //
      //
      knex("users")
      .where({
        email:req.body.email
      })
      .update({
        urlinput:req.body.urlInput,
        detecteditems:JSON.stringify(response.outputs[0].data.concepts),
        thisKeyIsSkipped: undefined
      })
      .returning("*")
      .then(console.log);


      res.json(response);

  });
})

app.put("/itemList", (req,res) =>{


  knex("users")
  .where({email:req.body.email})
  .update({
    detecteditems:JSON.stringify(req.body.detectedItems),
    thisKeyIsSkipped: undefined
  })
  .then(response => res.json("Update Successfully"))
  .catch(err => res.json("Failed To Update"));

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
