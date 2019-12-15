const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
  axios.get("https://www.caranddriver.com/news/").then(function(response) {
    const $ = cheerio.load(response.data);

    $(".full-item-content").each(function(i, element) {
      const result = {};
      result.title = $(this)
        .childred("a")
        .text();
      result.body = $(this)
        .children("p")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      db.Articles.create(result)
        .then(function(dbArticles) {
          console.log(dbArticles);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("scrape complete");
  });
});

app.get("/articles", function(req, res) {
  db.Articles.find({}).then(function(dbArticles) {
    res.json(dbArticles);
  });
});

app.get("/saved", function(req, res) {
  db.Saved.find({})
    .populate("note")
    .then(function(dbSaved) {
      res.json(dbSaved);
    });
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function() {
  console.log("Server running on PORT: " + PORT);
});
