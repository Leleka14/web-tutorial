let getPokemonButton = document.querySelector(".buttonPokemon");
let cardPokemon = document.querySelector(".card__pokemon");

//getPokemonButton.addEventListener("click", (e) => fetchKantoPokemon(e));

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
    .then((response) => response.json())
    .then((allpokemon) => {
      console.log(allpokemon);
      allpokemon.results.forEach((pokemon, id) => {
        renderPokemon(pokemon, id);
        console.log(pokemon);
      });
    });
}

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then((pokemonData) => {
      console.log(pokemonData);
      aboutPokemon(pokemonData);
    });
}

function aboutPokemon(pokemonData) {
  let pokemonDataContainer = document.querySelector("#pokemonData-container");
  pokemonDataContainer.className = "pokemonData";
  let pokemonDiv = document.createElement("div");
  pokemonDataContainer.textContent = pokemonData.name;

  let pokeName = document.createElement("h4");
   pokeName.textContent = pokemonData.name;

  createPokeImage(pokemonData.id - 1, pokemonData.name, pokemonDataContainer);

  let pokeNumber = document.createElement("p");
  pokeNumber.textContent = `${pokemonData.id}`;

  pokemonDiv.append(pokeName, pokeNumber);
  pokemonDataContainer.appendChild(pokemonDiv);
}

function renderPokemon(pokemon, id) {
  let allPokemonContainer = document.querySelector("#poke-container");
  let pokemonContainer = document.createElement("div");

  pokemonContainer.className = "cardPokemon";
  pokemonContainer.id = `idpoke${id + 1}`;

  pokemonContainer.addEventListener("click", (e) => fetchPokemonData(pokemon));

  createPokeImage(id, pokemon.name, pokemonContainer);

  let pokeName = document.createElement("h4");
  pokeName.textContent = pokemon.name;

  let pokeNumber = document.createElement("p");
  pokeNumber.textContent = `${id + 1}`;

  pokemonContainer.append(pokeName, pokeNumber);
  allPokemonContainer.appendChild(pokemonContainer);
}

function createPokeImage(pokemonID, pokemonName, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  pokeImgContainer.className = "imageContainer";

  let pokeImage = document.createElement("img");
  pokeImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
    pokemonID + 1
  }.svg`;
  pokeImage.alt = `${pokemonName}`;

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

fetchKantoPokemon();
