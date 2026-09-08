// ----------- Requisição para pegar os dados dos pokemons------------

async function buscarPokemon(inicio, quantidade){
    try{
            const requisicoes = [];
            const fim = inicio + quantidade;

            for(let id = inicio; id < fim; id++){
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

const pokemonsBuscados = await buscarPokemon(1,75);

function formatarPokemons(pokemonsBuscados){

    return pokemonsBuscados.map(pokemonAtual => {
        return {
            id: pokemonAtual.id,
            name: pokemonAtual.name,
            types: pokemonAtual.types.map(item => {
                return item.type.name
            }),
            image: pokemonAtual.sprites.other["home"].front_default
        }
    });
}

const pokemonsFormatados = formatarPokemons(pokemonsBuscados);

// ----------- Renderização no HTML ------------


function renderizarPokemons(ListaDePokemons){
    const listaPokemons = document.getElementById("lista_pokemons");

    ListaDePokemons.forEach(pokemon =>{

        const PokemonHTML = `
            <li class="${pokemon.types[0]} pokemon" data-id="${pokemon.id}">
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
                <img src="${pokemon.image}" alt="${pokemon.name}">
            </li>
        `;

        listaPokemons.insertAdjacentHTML(
            "beforeend",
            PokemonHTML
        );
    })
}

renderizarPokemons(pokemonsFormatados);

// ----------- Reinicia o processo ao chegar no final da página ------------

let proximoId = 76;

const quantidadePorBusca = 75;

let carregando = false;

async function carregarMaisPokemons() {

    if (carregando) {
        return;
    }

    carregando = true;

    try {

        const pokemonsBuscados = await buscarPokemon(
                proximoId,
                quantidadePorBusca
            );

        const pokemonsFormatados = formatarPokemons(pokemonsBuscados);

        renderizarPokemons(pokemonsFormatados);

        proximoId += quantidadePorBusca;

    } catch (erro) {

        console.error(
            "Erro ao carregar Pokémon:",
            erro
        );

    } finally {

        carregando = false;

    }
}

// ----------- Identifica um elemento invisível para reafazer o processo de requisição ------------


const fimLista = document.getElementById("fim_lista");

const observer = new IntersectionObserver(entries => {

    const elementoObservado = entries[0];

    if (elementoObservado.isIntersecting) {
        carregarMaisPokemons();
    }

},
{
    rootMargin: "200px"
});

observer.observe(fimLista);