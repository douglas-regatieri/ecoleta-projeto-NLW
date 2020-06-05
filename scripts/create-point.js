
function populateUFs () {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities (event){
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Carregando Cidades</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        citySelect.innerHTML = "<option value>Selecione a cidade</option>"
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    })



}



document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

    //Items de coleta
//Pegar todos os <li>

const itemsToCollect = document.querySelectorAll('.items-grid li')

for(const item of itemsToCollect){
    item.addEventListener('click', handleSelectedItems)
}

let selectedItems = []

function handleSelectedItems(event){
    //Adicionar ou remover uma classe --> .toggle()
    const itemLi = event.target
    itemLi.classList.toggle('selected')
    //----------------------------------------

    const itemId = itemLi.dataset.id

    //Verificar se existem itens selecionados, se sim pegar os items selecionados
    //Se já estiver selecionado, tirar da seleção
    //Se não, adicionar à seleção

    const alreadySelected = selectedItems.findIndex( item =>{
        //Comparando se é verdadeiro ou Falso
        const itemFound = item == itemId 
        //Retornando o resultado
        return itemFound
    })
    console.log(alreadySelected)
    //***Atualizar o campo escondido com os itens selecionados

    if(alreadySelected >= 0){
        //Tirar da Seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    }
    else{
        //Adicionar um elemento ao Array
        selectedItems.push(itemId)
    }

    console.log(selectedItems)

}
