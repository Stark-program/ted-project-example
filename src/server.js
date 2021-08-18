const express = require("express");
const app = express();
const cors = require("cors");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/cors", (req, res) => {
  let inputId = req.body;
  let id = Object.keys(JSON.parse(JSON.stringify(inputId)));

  fetch("https://graphql.ted.com", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        video(id:${id}) {
          title
          speakers {
            firstName
            lastName
          }
          primaryImageSet {
            url
          }
        }
      }
      `,
    }),
  })
    .then((res) => res.json())
    .then((data) => res.json(data));
});

app.listen(4000, () => console.log(`Listening on port 4000`));
