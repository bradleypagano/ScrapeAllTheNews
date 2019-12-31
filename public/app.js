const axios = require("axios");

axios.get("/articles", function(data) {
  console.log("ARTICLES", data);
  for (var i = 0; i < data.length; i++) {
    $("#articles1").append(
      `<div class="card">
          <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">${data[i].body}.</p>
            <a href="${data[i].link}">Original Story Link</a>
            <a href="/saving" class="btn btn-primary">Save this Article</a>
          </div>
        </div>`
    );
  }
});

axios.get("/saved", function(data) {
  console.log("SAVED", data);
  for (var i = 0; i < data.length; i++) {
    $("#saved").append(`<div class="card">
      <div class="card-body">
        <h5 class="card-title">${data[i].name}</h5>
        <p class="card-text">${data[i].body}.</p>
        <a href="${data[i].link}">Original Story Link</a>
      </div>
      <button id="noteButton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#notesModal">
        See your notes Here!
        </button>
      </div>
        <div id="notes" class="card-footer">
            <h4 class="card-text">Add a Note</h4>
            <h5>Title</h5>
            <input type="text" id="titleinput">
            <h5>Note<h5>
            <input type="text" id="bodyinput">
            <a href="/notes" class="btn btn-primary">Save Note</a>
        </div>
    </div>`);
  }
});

$("#noteButton").on("click", function() {
  $("#notesView").empty();
  var thisId = $(this).attr("data-id");
  axios.get("/articles/" + thisId).then(function(data) {
    console.log(data);
    if (data.note) {
      for (let i = 0; i < data.length; i++) {
        $("#notesView").append(
          `<h2>${data[i].note.title}</h2>
         <p>${data[i].note.body}</p>`
        );
      }
    }
  });
});

$("#savenote").on("click", function() {
  const thisId = $(this).attr("data-id");

  axios
    .post({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput")
          .val()
          .trim(),
        body: $("#bodyinput")
          .val()
          .trim()
      }
    })
    .then(function(data) {
      console.log(data);
    });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
