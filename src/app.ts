import express from "express";
import bodyParser from "body-parser";
// import * as bodyParser from "body-parser";
import words from "./routes/words";
import search from "./routes/search";

const app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../static"));

app.use("/api/v1/words", words);
app.use("/api/v1/search", search);

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port" + port);
