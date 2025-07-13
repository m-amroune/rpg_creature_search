const searchBtn = document.querySelector("#search-button");





async function getCreatures(){
    try{
        const response = await fetch('https://rpg-creature-api.freecodecamp.rocks/api/creatures');
        
        if(!response.ok){
            throw new Error(`Error HTTP : ${response.status} `);
        }
        const creatures = await response.json();
        console.log("list creatures :", creatures);

    } catch(error){
        console.error("Error fetch :", error)
    }
}
getCreatures()

