// Required Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.port || 5000;

// Mongodb Connection setup
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xga3p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

// MongoDB and server starts
client.connect((err) => {
  if (err) {
    console.log("Database error", err);
    return;
  }
  console.log("Database connected");

  const servicesCollection = client
    .db(`${process.env.DB_NAME}`)
    .collection("services");

  require("./routes/serviceRoutes")(app, servicesCollection);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
