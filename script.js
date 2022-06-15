// $(".search-button").on("click", function () {
//   $.ajax({
//     url: `http://www.omdbapi.com/?apikey=21350dc7&s=` + $("#myValue").val(),

//     success: (data) => {
//       const movies = data.Search;
//       let card = "";

//       movies.forEach((e) => {
//         card += showsCard(e);
//       });
//       $(".data-film").html(card);
//       // ketika tombol detail diklick
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url:
//             "http://www.omdbapi.com/?apikey=21350dc7&i=" +
//             $(this).data("imdbid"),
//           success: (data) => {
//             const movieDetail = showDetail(data);
//             $(".modal-body").html(movieDetail);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// fetch
const eventClick = document.getElementById("button-addon2");
eventClick.addEventListener("click", function () {
  const inputValue = document.querySelector("#myValue");
  fetch("http://www.omdbapi.com/?apikey=21350dc7&s=" + inputValue.value)
    .then((response) => response.json())
    .then((res) => {
      const movies = res.Search;
      let card = "";
      movies.forEach((e) => (card += showsCard(e)));

      const innerMovies = document.querySelector(".data-film");
      innerMovies.innerHTML = card;

      const modalButton = document.querySelectorAll(".modal-detail-button");
      modalButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          const imdbid = this.dataset.imdbid;
          fetch("http://www.omdbapi.com/?apikey=21350dc7&i=" + imdbid)
            .then((response) => response.json())
            .then((e) => {
              const detail = showDetail(e);
              const modalBody = document.querySelector(".modal-body");
              modalBody.innerHTML = detail;
            });
        });
      });
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

function showDetail(e) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3"><img src ='${e.Poster}' class = "img-fluid"/></div>
    <div class="col-md">
      <ul>
        <li>Title :<strong>${e.Title}</strong> (${e.Year})</li>
        <li>Actors :<strong>${e.Actors}</strong></li>
        <li>Director :<strong>${e.Director}</strong></li>
        <li>Language :<strong>${e.Language}</strong></li>
        <li>Plot : ${e.Plot}</li>
      </ul>
    </div>
  </div>
</div>x`;
}
