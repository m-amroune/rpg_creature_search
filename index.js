const searchBtn = document.querySelector("#search-button");

const InputPokemons = document.querySelector("#search-input");

const listPokemons = document.querySelector("#top-container");

const pokemonName =  document.querySelector("#creature-name");
const pokemonId =  document.querySelector("#creature-id");
const pokemonWeight =  document.querySelector("#weight");
const pokemonHeight =  document.querySelector("#height");
const typeSpans = document.querySelectorAll("#types .type")
const specialName = document.querySelector("#special-name");
const specialDescription = document.querySelector("#special-description");

  const typesElement = document.querySelector("#types");

const hp = document.querySelector("#hp"); 
const attack = document.querySelector("#attack");  
const defense = document.querySelector("#defense");  
const specialAttack = document.querySelector("#special-attack");  
const specialDefense = document.querySelector("#special-defense");  
const speed = document.querySelector("#speed");



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
  pokemonWeight.textContent = `Weight : ${creature.weight}`;
  pokemonHeight.textContent = `Height : ${creature.height}`;
  specialName.textContent =  creature.special.name;
  specialDescription.textContent = creature.special.description;

typesElement.innerHTML = "";

creature.types.forEach(type=> {
  const span = document.createElement("span");
  span.classList.add("type");
  span.textContent = type.name.toUpperCase(); 
  typesElement.appendChild(span);
});


 hp.textContent = creature.stats[0].base_stat;
 attack.textContent = creature.stats[1].base_stat;
defense.textContent = creature.stats[2].base_stat;
 specialAttack.textContent = creature.stats[3].base_stat;
 specialDefense.textContent = creature.stats[4].base_stat;
 speed.textContent = creature.stats[5].base_stat;

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
    alert("Creature not found");
    return;
  }
  // CALL FUNCTION DETAILS FOR ONE CREATURE
    const details = await getCreaturesDetails(match.id || match.name);
    displayCreature(details);

};


// EVENT SEARCH CREATURE BY CLICK
searchBtn.addEventListener("click", handleSearch);

