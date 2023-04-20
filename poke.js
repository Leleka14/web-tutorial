let getLearnButton = document.querySelector("#learnButton");
let cardPokemon = document.querySelector(".card__pokemon");

//let urlNext = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6"

let offsetPoke=0

let fetchKantoPokemon = (numberPoke=6) => {
  const urlNext = `https://pokeapi.co/api/v2/pokemon?offset=${offsetPoke}&limit=${numberPoke}`;
  fetch(urlNext)
    .then((response) => response.json())
    .then((allpokemon) => {
      console.log(allpokemon);
      allpokemon.results.forEach((pokemon, id) => {
        renderPokemon(pokemon, id);
        console.log(pokemon);
        console.log(offsetPoke)
      });
      offsetPoke+=numberPoke
      console.log(offsetPoke)

     // urlNext = allpokemon.next
    });
   
};

getLearnButton.addEventListener("click", () => fetchKantoPokemon());

function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then((pokemonData) => {
      console.log(pokemonData);
      aboutPokemon(pokemonData);
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

function aboutPokemon(pokemonData) {
  let pokemonDataContainer = document.querySelector("#pokemonData-container");

  pokemonDataContainer.className = "pokemonData";
  let pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-attributes";
  let pokemonDivTypes = document.createElement("div");
  pokemonDivTypes.className = "poke-types";
  let pokemonDivStats = document.createElement("div");
  pokemonDivStats.className = "poke-stats";

  pokemonDataContainer.textContent = pokemonData.name;
  createPokeImage(pokemonData.id - 1, pokemonData.name, pokemonDataContainer);

  let pokeTypes = document.createElement("ul");
  let pokemonTableStats = document.createElement("table");

  createTypes(pokemonData.types, pokeTypes);
  createStats(pokemonData.stats, pokemonTableStats);

  pokemonDivTypes.append(pokeTypes);
  pokemonDivStats.append(pokemonTableStats);

  pokemonDiv.append(pokemonDivTypes, pokemonDivStats);

  pokemonDataContainer.append(pokemonDiv);
}

function createStats(stats, statTable) {
  stats.forEach((stat) => {
    let statTr = document.createElement("tr");
    let statBox = document.createElement("td");
    let cellText = document.createTextNode(
      ` ${stat["stat"]["name"]},  ${stat.base_stat}`
    );
    statBox.appendChild(cellText);
    statTr.appendChild(statBox);
    statTable.append(statTr);
  });
}

function createTypes(types, ul) {
  types.forEach((type) => {
    let typeBox = document.createElement("li");

    let tepeBoxHref = document.createElement("a");
    tepeBoxHref.textContent = type["type"]["name"];
    tepeBoxHref.href = type["type"]["url"];

    typeBox.className = type["type"]["name"];

    typeBox.appendChild(tepeBoxHref);
    ul.append(typeBox);
  });
}


fetchKantoPokemon();
