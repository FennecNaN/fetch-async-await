const searchBtn = document.getElementById("searchBtn");
const userInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const favBtn = document.getElementById("favBtn")
const app = document.getElementById("app");
let apiURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
let nextLink = "";
let prevLink = "";

let listaNombres = [];
let listaImagenes = [];
let listaNombresfav = [];
let listaImagenesfav = [];

function getAPI() {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }
      return response.json();
    })
    .then((data) => {
      nextLink = data.next;
      prevLink = data.previous;

      for (let i = 0; i < 10; i++) {
        fetch(data.results[i].url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud al servidor");
            }
            return response.json();
          })
          .then((data) => {
            getPokemon(data);
            console.log(data);
            // seleccion pokemon para fav
            const seleccion = document.getElementsByClassName("pokemon");
            for (let i = 0; i < seleccion.length; i++) {
              seleccion[i].addEventListener("click", () => {
                console.log(seleccion[i]);
                let imagen = seleccion[i].querySelector("img").src;
                let name = seleccion[i].querySelector("h3").innerText;

                listaImagenesfav.push(imagen);
                listaNombresfav.push(name);
                console.log(name, imagen);
              });
            }
          });
      }
    });
  /*
.catch ((error) => {
    console.error("Error al obtener de la API!", error)
})
*/
}

function getPokemon(data) {
  const nombre = data.name;
  const img = data.sprites.other["home"].front_default;
  listaNombres.push(nombre);
  listaImagenes.push(img);
  joinPokemon(listaNombres, listaImagenes);
}

function joinPokemon(listaNombres, listaImagenes) {
  app.innerHTML = "";
  listaNombres.forEach((element, index) => {
    const divPokemon = document.createElement("div");
    divPokemon.classList.add("pokemon");

    const imgPokemon = document.createElement("img");
    imgPokemon.src = listaImagenes[index];
    divPokemon.appendChild(imgPokemon);

    const hNombre = document.createElement("h3");
    const spanNombre = document.createElement("span");
    const txtNombre = document.createTextNode(
      element.charAt(0).toUpperCase() + element.slice(1)
    );
    hNombre.appendChild(spanNombre);
    hNombre.appendChild(txtNombre);
    divPokemon.appendChild(hNombre);

    app.appendChild(divPokemon);
  });
}


nextBtn.addEventListener("click", () => {
  if (nextLink) {
    app.innerHTML = "";
    apiURL = nextLink;
    listaNombres = [];
    listaImagenes = [];
    getAPI();
  }
});

prevBtn.addEventListener("click", () => {
  if (prevLink) {
    app.innerHTML = "";
    apiURL = prevLink;
    listaNombres = [];
    listaImagenes = [];
    getAPI();
  }
});

searchBtn.addEventListener("click", () => {
  if (userInput.value) {
    console.log(userInput.value);
    apiURL =
      `https://pokeapi.co/api/v2/pokemon/` + userInput.value.toLowerCase();
    app.innerHTML = "";
    listaNombres = [];
    listaImagenes = [];
    getAPISearch();
  }
});

favBtn.addEventListener("click", ()=>{
  app.innerHTML = "";
  listaNombres = [];
  listaImagenes = [];
  joinPokemon(listaNombresfav, listaImagenesfav)
})

resetBtn.addEventListener("click", () => {
  apiURL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10";
  app.innerHTML = "";
  listaNombres = [];
  listaImagenes = [];
  listaNombresfav = [];
  listaImagenesfav = [];
  getAPI();
});

getAPI();

function getAPISearch() {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const nombre = data.name;
      const img = data.sprites.other["home"].front_default;
      listaNombres.push(nombre);
      listaImagenes.push(img);
      joinPokemon(listaNombres, listaImagenes);
    });
}
