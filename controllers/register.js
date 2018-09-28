const handleRegister = (req,res,bcrypt,knex) =>{
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
}

module.exports = {
  handleRegister
}
