const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const modalTypes = document.getElementById('modalTypes');
const limit = 3
let offset = 0
const maxRecords = 151


function loadPokemonItens(offset , limit) {
    pokeApi.getPokemns(offset , limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class = "type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>`).join('')

        pokemonList.innerHTML += newHtml
    })
}

modalTypes.innerHTML = '';



function loadTypesModal(){
    pokeApi.getPokemns().then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<li class="type grass">Grass</li>
                    <li class="type poison">Poison</li>`).join('')

        pokemonHeader.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtRecordNexPage = offset + limit

    if (qtRecordNexPage >= maxRecords)
    {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limit)
    }
})