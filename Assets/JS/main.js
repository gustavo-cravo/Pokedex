function convertPokemonTypesToList(pokemonTypes){
    return pokemonTypes.map((typeSlot)=> {
        return `<li class = "type">${typeSlot.type.name}</li>`
    })
}

// Esta função vai gerar o texto da lista em html Inicialmnente apenas com os dados dos nomes
function convertHTML(pokemon){
    return `<li class="pokemon">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypesToList(pokemon.types).join('')}
                    </ol>

                    <img src="${pokemon.sprites.other.dream_world.front_default}"
                        alt="${pokemon.name}">
                </div>
            </li>`
}

const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemns().then((pokemons = []) => {

    pokemonList.innerHTML += pokemons.map(convertHTML).join('')
})