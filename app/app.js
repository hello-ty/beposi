const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const words = require("./routes/words");
const search = require("./routes/search");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/words", words);
app.use("/api/v1/search", search);

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port" + port);
