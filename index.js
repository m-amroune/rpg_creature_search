const searchBtn = document.querySelector("#search-button");

const InputPokemons = document.querySelector("#search-input");

const listPokemons = document.querySelector("#top-container");

const pokemonName =  document.querySelector("#creature-name");
const pokemonId =  document.querySelector("#creature-id");
const pokemonWeight =  document.querySelector("#weight");
const pokemonHeight =  document.querySelector("#height");



// GET API DATA FOR CREATURES LIST
async function getCreatures(){
    try{
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creatures/`);
        
        if(!response.ok){
            throw new Error(`Error HTTP : ${response.status} `);
        }
        const creatures = await response.json();
        console.log("list creatures :", creatures);
        return creatures;
    } catch(error){
        console.error("Error fetch :", error)
    }

}

// GET API DATA FOR ONE CREATURE DETAILS
async function getCreaturesDetails(id){
    try{
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${id}`);
        
        if(!response.ok){
            throw new Error(`Error HTTP : ${response.status} `);
        }
        const creature = await response.json();
        console.log("details creature :", creature);
        return creature;
    } catch(error){
        console.error("Error fetch :", error)
    }

}



// DISPLAY DETAILS FOR ONE CREATURE
const displayCreature = (creature) => {
  pokemonName.textContent = creature.name;
  pokemonId.textContent = `#${creature.id}`;
  pokemonWeight.textContent = creature.weight;
  pokemonHeight.textContent = creature.height;
};

// SEARCH IN INPUT BY ID OR NAME
const handleSearch = async (event) => {
  event.preventDefault();
  // CALL FUNCTION LIST OF CREATURES
  const creatures = await getCreatures();
  const searchInput = InputPokemons.value.toLowerCase();

  const match = creatures.find(
    (creature) =>
      creature.id === Number(searchInput) ||
      creature.name.toLowerCase() === searchInput
  );

  if (!match) {
    console.log("Creature not found");
    return;
  }
  // CALL FUNCTION DETAILS FOR ONE CREATURE
    const details = await getCreaturesDetails(match.id || match.name);
    displayCreature(details);

};


// EVENT SEARCH CREATURE BY CLICK
searchBtn.addEventListener("click", handleSearch);

