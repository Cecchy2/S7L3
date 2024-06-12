//https://striveschool-api.herokuapp.com/books

const fetchBooks = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((responseObj) => {
      console.log("RESPONSE OBJ", responseObj);
      if (responseObj.ok) {
        return responseObj.json();
      } else {
        throw new Error("ERRORE NEL REPERIMENTO DEI DATI");
      }
    })
    .then((booksObj) => {
      console.log("booksObj", booksObj);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
});
