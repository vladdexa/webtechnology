import { loadFooter } from "../Generics/Footer/footer.js";
import initializeNavbar from "../Generics/Navbar/navbar.js";

const loadCards = async(numberOfCards) => {
    const cardsContainer = document.getElementById('#cards-container');
    const cardPath = '../Generics/card.html';

    try {
        await fetch(cardPath)
            .then(response => response.text())
            .then(html => {
                for (let i = 1; i <= numberOfCards; i++) {
                    const genericDiv = document.createElement('div');
                    genericDiv.innerHTML = html;
                    cardsContainer.appendChild(genericDiv);
                }
            })
            .catch(error => {
                console.log(error);
            })

    } catch (e) {
        throw new Error(e);
    }
}

const loadNavbar = async() => {
    const navbarDiv = document.getElementById('#navbar');
    const htmlNavbarPath = '../Generics/Navbar/navbar.html';
    try {
        await fetch(htmlNavbarPath)
            .then(response => response.text())
            .then(html => {
                navbarDiv.innerHTML = html;
            })
            .catch(err => {
                throw new Error(err);
            })
    } catch (err) {
        console.warn(err);
    }

}

async function load() {
    const htmlFooterPath = '../Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';


    await loadNavbar();
    await initializeNavbar();
    await loadCards(9);
    await loadFooter(idFooterContainer, htmlFooterPath);
}

document.getElementById('body').addEventListener('load', load());