$(".search-button").on("click", function () {
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=21350dc7&s=",

    success: (data) => {
      const movies = data.Search;
      let card = "";

      movies.forEach((e) => {
        card += showsCard(e);
      });
      $(".data-film").html(card);
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=21350dc7&i=" +
            $(this).data("imdbid"),
          success: (data) => {
            const movieDetail = showDetail(data);
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showsCard(e) {
  return `
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
}

function showDetail(data) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3"><img src ='${data.Poster}' class = "img-fluid"/></div>
    <div class="col-md">
      <ul>
        <li>Title :<strong>${data.Title}</strong> (${data.Year})</li>
        <li>Actors :<strong>${data.Actors}</strong></li>
        <li>Director :<strong>${data.Director}</strong></li>
        <li>Language :<strong>${data.Language}</strong></li>
        <li>Plot : ${data.Plot}</li>
      </ul>
    </div>
  </div>
</div>x`;
}
