import { loadFooter } from "../../Components/Generics/Footer/footer.js";
import initializeNavbar from "../../Components/Generics/Navbar/navbar.js";
import {authorizer} from "../Components/Generics/authorizer.js";

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('categoryId');
const categoryId = parseInt(param, 10);

async function getProductByCategoryId() {

    const response = await fetch('http://localhost:3000/category/getProductsByCategoryId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `categoryId=${categoryId}`
    });

    const responseFromServer = await response.json();

    return responseFromServer.products;
}
const loadCards = async() => {
    const products = await getProductByCategoryId();
    const cardsContainer = document.getElementById('#cards-container');
    const cardPath = '../../Components/Generics/Card/card.html';

    try {
        await fetch(cardPath)
            .then(response => response.text())
            .then(html => {
                for (let index = 0; index < products.length; index++) {
                    const genericDiv = document.createElement('div');
                    genericDiv.innerHTML = html;

                    genericDiv.getElementsByClassName('price')[0].innerText = products[index].price + " RON";
                    genericDiv.getElementsByClassName('img')[0].src = products[index].picture;
                    genericDiv.getElementsByClassName('img')[0].setAttribute("id", `${products[index].id}`);

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

function checkNumber(someString) {
    someString = someString.trim();
    for (let index = 0; index < someString.length; index++)
        if (!(someString[index] >= '0' && someString[index] <= '9')) return false;
    return true;
}

function getImageId() {
    document.body.addEventListener("mousedown", async(e) => {
        if (e.target.nodeName === "IMG") {
            const productId = e.target.id;
            const userId = authorizer();

            if (productId && checkNumber(productId) && userId) {
                window.location.assign(`http://localhost:3000/product?productId=${productId}`);
            } else if (!userId) {
                alert('You do not have authorization for this action.');
            }
        }
    }, false);
}



const loadNavbar = async() => {
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

    getImageId();
}

document.getElementById('body').addEventListener('load', load());