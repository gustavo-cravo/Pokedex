import {Pokemon} from "./pokemon.js";

// ----------- Requisição para pegar os dados dos pokemons------------

async function buscarPokemon(){
    try{
            const requisicoes = [];

            for(let id = 1; id <= 25; id++){
                requisicoes.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(response => response.json()));
            }

            const pokemon = await Promise.all(requisicoes);

            return pokemon;
    }catch(erro){
        console.error('Erro ao buscar Pokémon:', erro);
        console.log(erro)
    }
} 

// ----------- Filtragem dos dados ------------

const pokemonsBuscados = await buscarPokemon();

const pokemosFiltrados = pokemonsBuscados.map(pokemonAtual => {
    
   return {
    id: pokemonAtual.id,
    name: pokemonAtual.name,
    types: pokemonAtual.types.map(item => {
        return item.type.name
   }),
   image: pokemonAtual.sprites.other["home"].front_default}
});

// ----------- Renderização no HTML ------------


function renderizarPokemons(ListaDePokemons){
    const listaPokemons = document.getElementById("lista_pokemons");

    ListaDePokemons.forEach(pokemon =>{

        const PokemonHTML = `
            <li class="${pokemon.types[0]}">
                <div class="header_pokemon">
                    <div class="titulo_pokemon">${pokemon.name}</div>
                    <div class="number_pokemon">#${pokemon.id}</div>
                </div>
                <div class="type_pokemon">
                    ${pokemon.types.map(type => {
                    return `<p>${type}</p>`;
                    }).join("")}
                </div>
                <img src="assets/pokebola_fundo.png" alt="Imagem de fundo" class="background_pokemon">
                <img src="${pokemon.image}" alt="Bulbasaur">
            </li>
        `;

        listaPokemons.insertAdjacentHTML(
            "beforeend",
            PokemonHTML
        );
    })
}

renderizarPokemons(pokemosFiltrados);