const handleSignIn = (req,res,bcrypt,knex) =>{
  const {email, password} = req.body;

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
};

module.exports = {
  handleSignIn:handleSignIn
}
