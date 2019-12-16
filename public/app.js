const Axios = require("axios");

$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      `<div class="card">
          <div class="card-body">
            <h5 class="card-title">${data[i].name}</h5>
            <p class="card-text">${data[i].body}.</p>
            <a href="${data[i].link}">Original Story Link</a>
            <a href="/saving" class="btn btn-primary">Save this Article</a>
          </div>
        </div>`
    );
  }
});

$.getJSON("/saved", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#saved").append(`<div class="card">
      <div class="card-body">
        <h5 class="card-title">${data[i].name}</h5>
        <p class="card-text">${data[i].body}.</p>
        <a href="${data[i].link}">Original Story Link</a>
      </div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#notesModal">
        See your notes Here!
        </button>
      </div>
        <div id="notes" class="card-footer">
            <h4 class="card-text">Add a Note</h4>
            <h5>Title</h5>
            <input type="text" id="titleinput">
            <h5>Note<h5>
            <input type="text" id="bodyinput>
            <a href="/notes" class="btn btn-primary">Save Note</a>
        </div>
    </div>`);
  }
});

$("#savenote").on("click", function() {
  const thisId = $(this).attr("data-id");

  Axios.post({
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
  }).then(function(data) {
    console.log(data);
  });
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
