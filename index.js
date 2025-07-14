const searchBtn = document.querySelector("#search-button");

const InputPokemons = document.querySelector("#search-input");

const listPokemons = document.querySelector("#top-container");

const pokemonName =  document.querySelector("#creature-name");
const pokemonId =  document.querySelector("#creature-id");
const pokemonWeight =  document.querySelector("#weight");
const pokemonHeight =  document.querySelector("#height");




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

async function getCreaturesDetails(id){
    try{
        console.log("📤 ID utilisé dans fetch :", id);
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





const displayCreature = (creature) => {
  pokemonName.textContent = creature.name;
  pokemonId.textContent = `#${creature.id}`;
  pokemonWeight.textContent = creature.weight;
  pokemonHeight.textContent = creature.height;
};

const handleSearch = async (event) => {
  event.preventDefault();
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
    const details = await getCreaturesDetails(match.id || match.name);
    displayCreature(details);

};



searchBtn.addEventListener("click", handleSearch);

