

// Esta função vai gerar o texto da lista em html Inicialmnente apenas com os dados dos nomes
function convertHTML(pokemon){
    return `<li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="${pokemon.name}">
                </div>
            </li>`
}

const pokemonList = document.getElementById('pokemonList');

pokeApi.getPokemns().then((pokemons) => {
    const listItens = []

    for(let i = 0; i < pokemons.length; i++)
    {
        let pokemon = pokemons[i];
        listItens.push(convertHTML(pokemon))
    }

    console.log(listItens);
})