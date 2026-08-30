import {Pokemon} from "./pokemon.js";

async function buscarPokemon(){
    try{
            const requisicoes = [];

            for(let id = 1; id <= 2; id++){
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

console.log(pokemosFiltrados);