const loadBasketCards = async(numberOfCards) => {
    const basketCardsContainer = document.getElementById('basket-cards-container');
    const basketCardPath = '../Generics/BasketCard/basketCard.html';

    try {
        await fetch(basketCardPath)
            .then(response => response.text())
            .then(html => {
                for (let i = 1; i <= numberOfCards; i++) {
                    let genericDiv = document.createElement('div');
                    genericDiv.innerHTML = html;
                    basketCardsContainer.appendChild(genericDiv);
                }
            })
            .catch(error => {
                console.log(error);
            })

    } catch (e) {
        throw new Error(e);
    }
}

async function load() {
    await loadBasketCards(5);
}