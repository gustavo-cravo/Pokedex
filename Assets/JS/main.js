const offset = 0;
const limit = 10;

const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

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

// Seleciona a lista dos pokemons pelo ID e armazena na variável
const pokemonList = document.getElementById('pokemonList');

fetch(url)
    //Este primeiro vai pegar o retorno da minha requisição do fetch e converter em um json.
    .then(function(response){
        return response.json();
    })
    // Aqui ele vai pegar o retorno do primeiro then e mostrar no console.
    .then(function(jsonBody){
        return jsonBody.results;
    })
    // Vai pegar o retorno da anterior e iniciar uma repetição para adicionar no HTML as listas dos próximos pokemons
    .then(function(pokemons){
        for(let i = 0; i < pokemons.length; i++)
        {
            let pokemon = pokemons[i];
            pokemonList.innerHTML += convertHTML(pokemon);
        }
    })
    // Caso dê alguma mensagem de erro ele vai executar o catch
    .catch(function(error){
        console.error(error);
    })
    .finally(function(){
        console.log('Requisição concluída!')
    })