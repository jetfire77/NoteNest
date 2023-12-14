const connectToMongo = require("./db");

connectToMongo();
const express = require("express");

const app = express();
const port = 5000; // because on 3000 react app will work

var cors = require("cors");

app.use(cors());

app.use(express.json()); // middleware to use req.body on thunderclient
// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get("/", (req, res) => {
//   res.send("Hello tanuj!");
// });

app.listen(port, () => {
  console.log(`NoteNest backend listening on port ${port}`);
});
