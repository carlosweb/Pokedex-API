import "../scss/style.scss"

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
        fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons = pokemons.reduce((acc, {name, id, types}) => {
        const elementTypes = types.map(typeInfo => typeInfo.type.name)
        acc += `
        <div class="card ${elementTypes[0]} ">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" class="cardimage" alt="${name}"
            <h2>${name}</h2>
            <h4>${id}</h4>
            <p>${elementTypes.join(' |  ')}</p>
        </div>`
        return acc
    },'')


const insertPokemnos = pokemons => {
    const cards = document.querySelector('.cards')
    cards.innerHTML = pokemons
}

const pokemonPromissies = generatePokemonPromises()   
Promise.all(pokemonPromissies)
    .then(generateHTML)
    .then(insertPokemnos)
