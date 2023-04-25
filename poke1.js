let getLearnButton = document.querySelector("#learnButton");
let cardPokemon = document.querySelector(".card__pokemon");

// let resultInput = document.querySelector("input");
// let getPokemonButton = document.querySelector(".getbutton");

//let urlNext = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=6"

let offsetPoke = 0;
const searchInput = document.querySelector("[data-search]");

let pokemons = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  pokemons.forEach((pokemon) => {
    const isVisible = pokemon.name.toLowerCase().includes(value);
    // user.email.toLowerCase().includes(value)
    pokemon.element.classList.toggle("hide", !isVisible);
  });
});

let fetchKantoPokemon = (numberPoke = 6) => {
  const urlNext = `https://pokeapi.co/api/v2/pokemon?offset=${offsetPoke}&limit=${numberPoke}`;
  fetch(urlNext)
    .then((response) => response.json())
    .then((allpokemon) => {
      console.log(allpokemon);
      pokemons = allpokemon.results.map((pokemon, id) => {
        renderPokemon(pokemon, id);

        console.log(pokemon);

        console.log(offsetPoke);
      });
      offsetPoke += numberPoke;
      console.log(offsetPoke);

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

function renderPokemon(pokemon) {
  let allPokemonContainer = document.querySelector("#poke-container");

  let pokemonContainer = document.createElement("div");
  let pokemonTextContainer = document.createElement("div");

  let oldPoke = document.querySelectorAll(".cardPokemon");
  const lengthOffsetPoke = oldPoke.length + 1;

  pokemonTextContainer.className = "textPokemon";
  pokemonContainer.className = "cardPokemon";
  pokemonContainer.id = `idpoke${lengthOffsetPoke}`;

  pokemonContainer.addEventListener("click", (e) => fetchPokemonData(pokemon));

  createPokeImage(lengthOffsetPoke, pokemon.name, pokemonContainer);

  let pokeName = document.createElement("h4");
  pokeName.className = "namePoke";
  //pokeName.classList.add("namePoke", "hide");
  pokeName.textContent = upFirst(pokemon.name);

  let pokeNumber = document.createElement("p");
  pokeNumber.textContent = `${lengthOffsetPoke}`;

  pokemonTextContainer.append(pokeName, pokeNumber);
  pokemonContainer.append(pokemonTextContainer);
  allPokemonContainer.appendChild(pokemonContainer);

  // //Search button click
  // document.getElementById("search").addEventListener("click", () => {
  //   //initializations
  //   let searchInput = document.getElementById("search-input").value;
  //   let elements = document.querySelectorAll(".namePoke");
  //   //let pokemonContainer = document.querySelectorAll(".cardPokemon");
  //   //loop through all elements
  //   elements.forEach((element) => {
  //     //check if text includes the search value
  //     if (element.innerText.includes(searchInput.toUpperCase())) {
  //       //display matching card
  //       oldPoke.classList.remove("hide");
  //     } else {
  //       //hide others
  //       oldPoke.classList.add("hide");
  //     }
  //   });
  // });
}

function createPokeImage(pokemonID, pokemonName, containerDiv) {
  let pokeImgContainer = document.createElement("div");
  pokeImgContainer.className = "imageContainer";

  let pokeImage = document.createElement("img");
  pokeImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonID}.svg`;
  pokeImage.alt = `${pokemonName}`;

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

function aboutPokemon(pokemonData) {
  let pokemonDataContainer = document.querySelector("#pokemonData-container");
  pokemonDataContainer.textContent = "";
  pokemonDataContainer.className = "pokemonData";
  let pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-attributes";

  const closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn";
  closeBtn.type = "button";
  closeBtn.innerHTML = "&times;";

  closeBtn.addEventListener("click", function () {
    pokemonDataContainer.className = "closePoke";
  });

  let pokemonName = document.createElement("h1");
  pokemonName.className = "namePoke";

  let pokemonDivTypes = document.createElement("div");
  pokemonDivTypes.className = "poke-types";
  let pokemonDivStats = document.createElement("div");
  pokemonDivStats.className = "poke-stats";

  pokemonName.textContent = upFirst(pokemonData.name);

  pokemonDiv.append(pokemonName);

  createPokeImage(pokemonData.id, pokemonData.name, pokemonDiv);

  let pokeTypes = document.createElement("ul");
  let pokemonTableStats = document.createElement("table");

  createTypes(pokemonData.types, pokeTypes);
  createStats(pokemonData.stats, pokemonTableStats);

  pokemonDivTypes.append(pokeTypes);
  pokemonDivStats.append(pokemonTableStats);

  pokemonDiv.append(pokemonDivTypes, pokemonDivStats);
  pokemonDataContainer.append(closeBtn, pokemonDiv);
}

function createStats(stats, statTable) {
  stats.forEach((stat) => {
    let statTr = document.createElement("tr");
    let statBox = document.createElement("td");
    let cellText = document.createTextNode(
      ` ${upFirst(stat["stat"]["name"])} -  ${stat.base_stat}`
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
    tepeBoxHref.textContent = upFirst(type["type"]["name"]);
    tepeBoxHref.href = type["type"]["url"];

    typeBox.className = type["type"]["name"];

    typeBox.appendChild(tepeBoxHref);
    ul.append(typeBox);
  });
}

const upFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

fetchKantoPokemon();
