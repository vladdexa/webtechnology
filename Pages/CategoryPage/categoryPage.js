import {loadFooter} from "../../Components/Generics/Footer/footer.js";
import initializeNavbar from "../../Components/Generics/Navbar/navbar.js";

const loadCards = async (numberOfCards) => {
    const cardsContainer = document.getElementById('#cards-container');
    const cardPath = '../../Components/Generics/Card/card.html';

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
};

const loadNavbar = async () => {
    const navbarDiv = document.getElementById('#navbar');
    const htmlNavbarPath = '../../Components/Generics/Navbar/navbar.html';
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
    const htmlFooterPath = '../../Components/Generics/Footer/footer.html';
    const pathForMenu = '../../Components/Generics/Menu/menuItems.json';
    const pathForStyles = '../../Components/Generics/Navbar';
    const idFooterContainer = '#footer-container';


    await loadNavbar();
    await initializeNavbar(pathForMenu, pathForStyles, '#ContainerCards');
    await loadCards(9);
    await loadFooter(idFooterContainer, htmlFooterPath);
}

document.getElementById('body').addEventListener('load', load());
