const offset = 0;
const limit = 10;

const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

fetch(url)
    //Este primeiro vai pegar o retorno da minha requisição do fetch e converter em um json.
    .then(function(response){
        return response.json();
    })
    // Aqui ele vai pegar o retorno do primeiro then e mostrar no console.
    .then(function(jsonBody){
        console.log(jsonBody);
    })
    // Caso dê alguma mensagem de erro ele vai executar o catch
    .catch(function(error){
        console.error(error);
    })
    .finally(function(){
        console.log('Requisição concluída!')
    })
