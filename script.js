"strick";

$.ajax({
  url: "http://www.omdbapi.com/?apikey=21350dc7&s=HERO",

  success: function (data) {
    const movies = data.Search;
    let card = "";

    movies.forEach(function (e) {
      card += `
                <div class="col-md-3 my-5">
                <div class="card">
                <img src="${e.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${e.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${e.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button"  data-bs-toggle="modal" data-bs-target="#exampleModal"
                     data-imdbid =${e.imdbID} >show details</a>
                </div>
                </div>
                </div>
        `;
    });
    $(".data-film").html(card);
    $(".modal-detail-button").on("click", function () {
      console.log($(this).data("imdbid"));
    });
  },
  error: function (xhr, exception) {
    var msg = "";
    if (xhr.status === 0) {
      msg = "Not connect.\n Verify Network." + xhr.responseText;
    } else if (xhr.status == 404) {
      msg = "Requested page not found. [404]" + xhr.responseText;
    } else if (xhr.status == 500) {
      msg = "Internal Server Error [500]." + xhr.responseText;
    } else if (exception === "parsererror") {
      msg = "Requested JSON parse failed.";
    } else if (exception === "timeout") {
      msg = "Time out error." + xhr.responseText;
    } else if (exception === "abort") {
      msg = "Ajax request aborted.";
    } else {
      msg = "Error:" + xhr.status + " " + xhr.responseText;
    }
  },
});
