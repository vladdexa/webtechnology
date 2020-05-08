/*implementam functia pentru crearea caruselelor si punem pe butoanele de left si
right un eventListener care va apela metodele din clasa Carousel pentru fiecare carusel in parte*/

import { loadFooter } from "../../Components/Generics/Footer/footer.js";
import initializeNavbar from "../../Components/Generics/Navbar/navbar.js";
import Carousel from "../../Components/Generics/Carousel/carousel.js";
import {authorizer} from "../../Components/Generics/authorizer.js";

const createCarousels = async() => {
    /*cu acesti paramestri vom stoca id-urile necesare fiecarui carusel in parte*/
    const countainerCarousel1 = 'ctn1';
    const leftButtonCarousel1 = 'lbtn1';
    const rightButtonCarousel1 = 'rbtn1';

    const countainerCarousel2 = 'ctn2';
    const leftButtonCarousel2 = 'lbtn2';
    const rightButtonCarousel2 = 'rbtn2';

    const countainerCarousel3 = 'ctn3';
    const leftButtonCarousel3 = 'lbtn3';
    const rightButtonCarousel3 = 'rbtn3';

    const response = await fetch('http://localhost:3000/home/carousel-images');

    const carouselsImages = await response.json();

    const carousel1 = new Carousel(countainerCarousel1, leftButtonCarousel1, rightButtonCarousel1, carouselsImages.carousel1);
    carousel1.leftButton.addEventListener('click', carousel1.moveLeft);
    carousel1.rightButton.addEventListener('click', carousel1.moveRight);

    const carousel2 = new Carousel(countainerCarousel2, leftButtonCarousel2, rightButtonCarousel2, carouselsImages.carousel2);
    carousel2.leftButton.addEventListener('click', carousel2.moveLeft);
    carousel2.rightButton.addEventListener('click', carousel2.moveRight);

    const carousel3 = new Carousel(countainerCarousel3, leftButtonCarousel3, rightButtonCarousel3, carouselsImages.carousel3);
    carousel3.leftButton.addEventListener('click', carousel3.moveLeft);
    carousel3.rightButton.addEventListener('click', carousel3.moveRight);

    return new Object({
        carousel1,
        carousel2,
        carousel3,
    });
}


/*aici implementam functia care va face load la carusele in body*/
const loadCarousels = async() => {
    const carousels = await createCarousels();
    const { carousel1, carousel2, carousel3 } = carousels;
    carousel1.loadImages(0);
    carousel2.loadImages(0);
    carousel3.loadImages(0);

};

const loadNavbar = async() => {
    const navbarSection = document.getElementById('#navbarSection');

    const path = '../../Components/Generics/Navbar/navbar.html';

    try {
        const response = await fetch(path);

        navbarSection.innerHTML = await response.text();
    } catch (e) {
        throw new Error(e);
    }


};

const initialize = async() => {
    const htmlFooterPath = '../../Components/Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';
    const pathForMenu = '../../Components/Generics/Menu/menuItems.json';
    const pathForStyles = '../../Components/Generics/Navbar';

    await loadNavbar();
    await initializeNavbar(pathForMenu, pathForStyles, '#Ad');
    await loadCarousels();
    await loadFooter(idFooterContainer, htmlFooterPath);

    getImageId();
};
document.getElementById('#body').addEventListener('load', initialize());

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

            if (productId && checkNumber(productId) && authorizer()) {
                window.location.assign(`http://localhost:3000/product?productId=${productId}`);
            } else if (!authorizer()) {
                alert('You do not have authorization for this action.')
            }
        }
    }, false);
}
