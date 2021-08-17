const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/cors", (req, res) => {
  console.log(req.body);
});

app.listen(4000, () => console.log(`Listening on port 4000`));
