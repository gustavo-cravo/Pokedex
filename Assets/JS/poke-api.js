
const pokeApi = {}
function convertToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defense = pokeDetail.stats[2].base_stat
    pokemon.specialAttack = pokeDetail.stats[3].base_stat
    pokemon.specialDefense = pokeDetail.stats[4].base_stat
    pokemon.speed = pokeDetail.stats[5].base_stat

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertToPokemon)
}

pokeApi.getPokemns = function(offset = 0, limit = 6){
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
    //Este primeiro vai pegar o retorno da minha requisição do fetch e converter em um json.
    .then((response) => response.json())
    // Aqui ele vai pegar o retorno do primeiro then e mostrar no console apenas os results.
    .then((jsonBody) => jsonBody.results)
    // Está mapeando a lista em uma lista de requisições dos detalhes dos pokemons.
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    // Aguardando terminar todas as requisições
    .then((detailRequests) => Promise.all(detailRequests))
    // Quando terminar ele vai entregar uma lista de detalhes dos pokemons.
    .then((pokemonDetails) => pokemonDetails)
    .catch(function (error){
        console.error(error);
    })
}

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) => {
    console.log(results);
})