const clarifaiApp = new Clarifai.App({
 apiKey: 'd4ccf75959a54619b16a900eab3667e7'
});


const handleImageUrl = (req,res, knex) =>{
  // console.log(req.body.urlInput);
  // console.log(req.body.email);
  clarifaiApp.models
  .predict("aaa03c23b3724a16a56b629203edc62c", req.body.urlInput)
  .then(response => {
      knex("users")
      .where({
        email:req.body.email
      })
      .update({
        urlinput:req.body.urlInput,
        detecteditems:JSON.stringify(response.outputs[0].data.concepts),
        thisKeyIsSkipped: undefined
      })
      .then(response => console.log("Updated URL Input and Items List Successful"))
      .catch(err => res.status(400).json("Error Updating URL Input and Items List"));
      res.json(response);
  })
  .catch(err => res.status(400).json("Fail Clarifai API Call"));
};

module.exports = {
  handleImageUrl: handleImageUrl
}
