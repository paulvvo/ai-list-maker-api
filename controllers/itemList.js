const handleUpdateItemList = (req,res, knex) =>{

  knex("users")
  .where({email:req.body.email})
  .update({
    detecteditems:JSON.stringify(req.body.detectedItems),
    thisKeyIsSkipped: undefined
  })
  .then(response => res.json("Update Successfully"))
  .catch(err => res.json("Failed To Update"));

}

module.exports = {
  handleUpdateItemList
}
