requisicoes = [];

try{
    async function buscarPokemon(){
        for(let id = 1; id <= 25; id++){
            requisicoes.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json()));
            console.log(requisicoes);
        }
    }
}catch(erro){
    console.error('Erro ao buscar Pokémon:', erro);
}