const mongoose = require("mongoose");
const uri = process.env.mongoURL;

mongoose
  .connect(uri)
  .then(console.log("mongoDB connected successful"))
  .catch((err) => {
    console.log("some error in db connection");
    console.log(err);
  });

module.exports = mongoose.connection;
