// ----------- Lógica para clicar em um pokemon específico, e buscar os dados específicos deste pokemon ------------

const divListaPokemons = document.querySelector("#lista_pokemons");

divListaPokemons.addEventListener("click", async (event) => {
    const pokemonClicado = event.target.closest(".pokemon");

    if (!pokemonClicado) {
        return window.alert("Não foi clicado em um Pokemon.");
    }

    const id = Number(pokemonClicado.dataset.id);

    const Pokemon = await buscarDadosModal(id);

    montarModal(Pokemon);
    modal.classList.add("modal-aberto");
});

async function buscarDadosModal(id){
    try{
        const DadosPokemonModal = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const Pokemon = await DadosPokemonModal.json();

        return {
            id: Pokemon.id,
            name: Pokemon.name,
            types: Pokemon.types.map(item => {
                return item.type.name
            }),
            image: Pokemon.sprites.other["home"].front_default,
            hp: Pokemon.stats[0].base_stat,
            attack: Pokemon.stats[1].base_stat,
            defense: Pokemon.stats[2].base_stat,
            special_attack: Pokemon.stats[3].base_stat,
            special_defense: Pokemon.stats[4].base_stat,
            speed: Pokemon.stats[5].base_stat
        }

    }catch(erro){
        console.error(`Não foi possível buscar dados do modal: ${erro}`);
    }
}

// ----------- Fechar Modal ------------

const modal = document.querySelector(".modal");

modal.addEventListener("click", (event) => {

    const botaoVoltar = event.target.closest(".btn-voltar");

    if (!botaoVoltar) {
        return;
    }

    modal.classList.remove("modal-aberto");
});


// ----------- Renderizar Modal Modal ------------

function montarModal(Pokemon){
    const PokemonModalHTML = `
        <div class="modal modal-aberto ${Pokemon.types[0]}">
            <div class="voltar">
            <button class="btn-voltar">
            <img src="./assets/arrow-left-solid-full (1).svg" alt="Voltar">
            </button>
            </div>
            
            <div class="header_modal">
                <p class="modal_name_pokemon">${Pokemon.name}</p>
                <p class="id_pokemon_modal">#${Pokemon.id}</p>
            </div>

            
            <div class="formato_img_modal">
                <img id="img_modal" src="${Pokemon.image}" alt="Pokemon_selecionado">
                <img id="pokebola_modal" src="assets/pokebola_fundo.png" alt="Fundo_modal">
            </div>
            

            <div class="modal_content">
                <div class="header_content">
                    <p class="modal_name">Base Status</p>
                </div>

                <div class="info_modal">
                    <div class="info_progress">
                        <p class="atributo">HP</p>
                        <label>
                            ${Pokemon.hp} <progress  value="${Pokemon.hp}" max="255"></progress>
                        </label>
                    </div>
                    <div class="info_progress">
                        <p class="atributo">Attack</p>
                        <label>
                            ${Pokemon.attack} <progress value="${Pokemon.attack}" max="255"></progress>
                        </label>
                    </div>
                    <div class="info_progress">
                        <p class="atributo">Defense</p>
                        <label>
                            ${Pokemon.defense} <progress value="${Pokemon.defense}" max="255"></progress>
                        </label>
                    </div>
                    <div class="info_progress">
                        <p class="atributo">Sp.Att</p>
                        <label>
                            ${Pokemon.special_attack} <progress value="${Pokemon.special_attack}" max="255"></progress>
                        </label>
                    </div>
                    <div class="info_progress">
                        <p class="atributo">Sp.Def</p>
                        <label>
                            ${Pokemon.special_defense} <progress value="${Pokemon.special_defense}" max="255"></progress>
                        </label>
                    </div>
                    <div class="info_progress">
                        <p class="atributo">Speed</p>
                        <label>
                            ${Pokemon.speed} <progress value="${Pokemon.speed}" max="255"></progress>
                        </label>
                    </div>
                </div>
                
            </div>
            
        </div>
    `;

    modal.innerHTML = PokemonModalHTML;
}