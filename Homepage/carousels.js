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

/*acestea vor fi obiectele noastre de tip Carousel*/
let carousel1;
let carousel2;
let carousel3;

/*implementam functia pentru crearea caruselelor si punem pe butoanele de left si
right un eventListener care va apela metodele din clasa Carousel pentru fiecare carusel in parte*/
 function createCarousels() {
    carousel1 = new Carousel(countainerCarousel1,leftButtonCarousel1,rightButtonCarousel1);
    carousel1.leftButton.addEventListener('click',carousel1.moveLeft);
    carousel1.rightButton.addEventListener('click',carousel1.moveLeft);

    carousel2 = new Carousel(countainerCarousel2,leftButtonCarousel2,rightButtonCarousel2);
    carousel2.leftButton.addEventListener('click',carousel2.moveLeft);
    carousel2.rightButton.addEventListener('click',carousel2.moveLeft);

    carousel3 = new Carousel(countainerCarousel3,leftButtonCarousel3,rightButtonCarousel3);
    carousel3.leftButton.addEventListener('click',carousel3.moveLeft);
    carousel3.rightButton.addEventListener('click',carousel3.moveLeft);
}


/*aici implementam functia care va face load la carusele in body*/
function loadCarousels() {
    createCarousels();
    carousel1.loadImages(0);
    carousel2.loadImages(0);
    carousel3.loadImages(0);
}
