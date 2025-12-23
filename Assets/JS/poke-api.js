
const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemns = function(offset = 0, limit = 10){
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