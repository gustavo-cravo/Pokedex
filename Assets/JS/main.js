// Esta função vai gerar o texto da lista em html Inicialmnente apenas com os dados dos nomes
function convertHTML(pokemon){
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>`
}

const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemns().then((pokemons = []) => {

    pokemonList.innerHTML += pokemons.map(convertHTML).join('')
})