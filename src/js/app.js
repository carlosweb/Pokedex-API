import "../scss/style.scss"

const dataPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromissies = []

    for(let i = 1; i <=150; i++) {
        pokemonPromissies.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromissies)
    .then(pokemons => {
        // console.log(pokemons)

        const cardPokemons = pokemons.reduce((acc, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            acc += `
            <div class="card ">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" class="cardimage ${types[0]}" alt="${pokemon.name}"
                <h2>${pokemon.name}</h2>
                <h4>${pokemon.id}</h4>
                <p>${types.join(' |  ')}</p>
            </div>`
            return acc
        },'')

        const cards = document.querySelector('.cards')
        cards.innerHTML = cardPokemons
        console.log(cardPokemons)
    })
    
}
dataPokemon()