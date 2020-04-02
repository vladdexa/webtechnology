import { loadFooter } from "../Generics/Footer/footer.js";

const loadCards = async(numberOfCards) => {
    const cardsContainer = document.getElementById('#cards-container');
    const cardPath = '../Generics/card.html';

    try {
        await fetch(cardPath)
            .then(response => response.text())
            .then(html => {
                new Promise(() => {
                    for (let i = 1; i <= numberOfCards; i++) {
                        let genericDiv = document.createElement('div');
                        genericDiv.innerHTML = html;
                        cardsContainer.appendChild(genericDiv);
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })

    } catch (e) {
        throw new Error(e);
    }
}


async function load() {
    const htmlFooterPath = '../Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';

    await loadCards(9);
    await loadFooter(idFooterContainer, htmlFooterPath);
}


document.getElementById('body').addEventListener('load', load());