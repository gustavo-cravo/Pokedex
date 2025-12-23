
const pokeApi = {}

pokeApi.getPokemns = function(offset = 0, limit = 10){
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
    //Este primeiro vai pegar o retorno da minha requisição do fetch e converter em um json.
    .then(function(response){
        return response.json();
    })
    // Aqui ele vai pegar o retorno do primeiro then e mostrar no console.
    .then(function(jsonBody){
        return jsonBody.results;
    })
    .catch(function (error){
        console.error(error);
    })
}