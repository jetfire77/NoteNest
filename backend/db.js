const mongoose = require("mongoose");
const mongoURI = "enter your uri";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to DB!"))
    .catch((error) => console.log(error));
};

module.exports = connectToMongo;
