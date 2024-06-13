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

      booksObj.forEach((libro) => {
        const row = document.getElementById("rowCards");
        const col = document.createElement("div");
        col.classList.add("col-3");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = libro.img;

        const titolo = document.createElement("h5");
        titolo.classList.add("card-title");
        titolo.innerText = libro.title;

        const price = document.createElement("p");
        price.classList.add("card-text");
        price.innerText = libro.price + "$";

        const scartaBtn = document.createElement("button");
        scartaBtn.classList.add("btn", "btn-primary");
        scartaBtn.innerHTML = "scarta";
        scartaBtn.addEventListener("click", (event) => {
          col.remove();
        });

        const addCartBtn = document.createElement("button");
        addCartBtn.classList.add("btn", "btn-success");
        addCartBtn.innerHTML = "Add to Cart";

        const carrello = [];

        addCartBtn.addEventListener("click", (event) => {
          const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
          cart.push(libro);
          localStorage.setItem("cartItems", JSON.stringify(cart));
          addToCartDisplay(libro);
        });

        card.appendChild(img);
        card.appendChild(titolo);
        card.appendChild(price);
        card.appendChild(scartaBtn);
        card.appendChild(addCartBtn);

        col.appendChild(card);
        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("FETCH ERROR: ", error);
    });
};

const addToCartDisplay = (libro) => {
  const listCart = document.createElement("li");
  listCart.innerText = `${libro.title} - ${libro.price}$`;
  const dropCart = document.getElementById("dropCart");
  dropCart.appendChild(listCart);
};

const loadCartFromStorage = () => {
  const cartData = localStorage.getItem("cartItems");
  let cart = [];
  if (cartData) {
    cart = JSON.parse(cartData);
  }
  cart.forEach((libro) => {
    addToCartDisplay(libro);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  fetchBooks();
  loadCartFromStorage();
});
