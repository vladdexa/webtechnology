const loadBasketCards = async(numberOfCards) => {
    const basketCardsContainer = document.getElementById('basket-cards-container');
    const basketCardPath = '../../Components/Generics/BasketCard/basketCard.html';
    try {
        await fetch(basketCardPath)
            .then(response => response.text())
            .then(html => {
                for (let i = 1; i <= numberOfCards; i++) {
                    let genericDiv = document.createElement('div');
                    genericDiv.innerHTML = html;
                    genericDiv.getElementsByTagName('span')[0].setAttribute("id", `${i+1}`);
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




function deleteCard() {
    document.body.addEventListener("mousedown", e => {
        if (e.target.nodeName === "SPAN") {
            const elem = document.getElementById(e.target.id);
            elem.parentNode.parentNode.parentNode.outerHTML = "";
        }
    }, false);
}


async function load() {
    await loadBasketCards(5);
    deleteCard();
}