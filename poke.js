let getPokemonButton = document.querySelector(".buttonPokemon");
let cardPokemon = document.querySelector(".card__pokemon");

getPokemonButton.addEventListener("click", (e) => fetchKantoPokemon(e));

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((allpokemon) => {
      console.log(allpokemon);
    //   allpokemon.results.forEach((pokemon) => {
    //     fetchPokemonData(pokemon);
    //     console.log(pokemon);
    //   });

    renderPokemon(allpokemon)
    });
}

// function fetchPokemonData(pokemon) {
//   let url = pokemon.url;
//   fetch(url)
//     .then((response) => response.json())
//     .then((pokemonData) => {
//       console.log(pokemonData);
//       renderPokemon(pokemonData);
//     });
// }

function renderPokemon(allpokemon) {
  let allPokemonContainer = document.querySelector("#poke-container");
  let pokemonContainer = document.createElement("div");

  pokemonContainer.className = "cardPokemon";
  //createPokeImage(pokemonData.results.id, pokemonData.name, pokemonContainer);

  let pokeName = document.createElement("h4");
  pokeName.innerText = allpokemon.results.name;
  console.log(pokeName.innerText);

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `${allpokemon.results.id}`;

  pokemonContainer.append(pokeName, pokeNumber);
  allPokemonContainer.appendChild(pokemonContainer);
}

// function createPokeImage(pokemonID, pokemonName, containerDiv) {
//   let pokeImgContainer = document.createElement("div");
//   pokeImgContainer.className = "imageContainer";

//   let pokeImage = document.createElement("img");
//   pokeImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
//   pokeImage.alt = `${pokemonName}`;

//   pokeImgContainer.append(pokeImage);
//   containerDiv.append(pokeImgContainer);
// }
