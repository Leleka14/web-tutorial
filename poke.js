let getPokemonButton = document.querySelector(".buttonPokemon");
let cardPokemon = document.querySelector(".card__pokemon");

//getPokemonButton.addEventListener("click", (e) => fetchKantoPokemon(e));

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=6&offset=0")
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
  pokemonDiv.className = "pokemon-attributes";

  pokemonDataContainer.textContent = pokemonData.name;
  createPokeImage(pokemonData.id - 1, pokemonData.name, pokemonDataContainer);

  let pokeTypes = document.createElement("ul");
  let pokemonDivStats = document.createElement("table");

  createTypes(pokemonData.types, pokeTypes);
  createStats(pokemonData.stats, pokemonDivStats);

  pokemonDiv.append(pokeTypes, pokemonDivStats);
  pokemonDataContainer.appendChild(pokemonDiv);
}

function createStats(stats, statDiv) {
  stats.forEach((stat) => {

    let statTr = document.createElement("tr");
    let statBox = document.createElement("td");
    let base_statBox = document.createElement("td");

    statBox.textContent = stat["stat"]["name"];
    base_statBox.textContent = stat.base_stat;

    statTr.appendChild(statBox, base_statBox);
    statDiv.append(statTr);
  });
}

function createTypes(types, ul) {
  types.forEach((type) => {
    let typeBox = document.createElement("li");
    let tepeBoxHref = document.createElement("a");
    tepeBoxHref.textContent = type["type"]["name"];
    tepeBoxHref.href = type["type"]["url"];

    typeBox.appendChild(tepeBoxHref);
    ul.append(typeBox);
  });
}

function renderPokemon(pokemon, id) {
  let allPokemonContainer = document.querySelector("#poke-container");
  let pokemonContainer = document.createElement("div");
  let pokemonTextContainer = document.createElement("div");
  pokemonTextContainer.className = "textPokemon";
  pokemonContainer.className = "cardPokemon";
  pokemonContainer.id = `idpoke${id + 1}`;

  pokemonContainer.addEventListener("click", (e) => fetchPokemonData(pokemon));

  createPokeImage(id, pokemon.name, pokemonContainer);

  let pokeName = document.createElement("h4");
  pokeName.textContent = pokemon.name;

  let pokeNumber = document.createElement("p");
  pokeNumber.textContent = `${id + 1}`;

  pokemonTextContainer.append(pokeName, pokeNumber);
  pokemonContainer.append(pokemonTextContainer);
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
