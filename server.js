const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();
const path = require("path");

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
        .children("a")
        .text();
      result.body = $(this)
        .find("p")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      console.log(result);

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

app.put("/saving", function(req, res) {
  db.Articles.update({ _id: Articles._id }, { $set: { isSaved: true } }).then(
    function() {
      res.send("article saved");
    }
  );
});

app.get("/saved", function(req, res) {
  db.Articles.find({ isSaved: true })
    .populate("note")
    .then(function(dbArticles) {
      res.json(dbArticles);
    });
});

app.post("/notes", function(req, res) {
  db.Notes.create(req.body)
    .then(function(dbNotes) {
      return db.Articles.findById(
        {},
        { $push: { note: dbNotes._id } },
        { new: true }
      );
    })
    .then(function(dbArticles) {
      res.json(dbArticles);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saves", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/saved.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
  console.log("Server running on PORT: " + PORT);
});
