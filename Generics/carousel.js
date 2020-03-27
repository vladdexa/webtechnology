
/*momentan vom avea un set de date hardcodat si anume un array in care pun stringuri(denumiri ale imaginilor)*/
let pictures = [
    ['bck2.jpg', 'bck3.jpg', 'bck6.jpg'],
    ['j1.jpg', 'j2.jpg', 'j3.jpg']
];


class Carousel {
    /*prin constructor vom popula campurile necesare pentru a manipula caruselul*/
    constructor(newContainer, lButton, rButton) {
        this.ownPictures = pictures;
        this.container = document.getElementById(newContainer);
        this.leftButton = document.getElementById(lButton);
        this.rightButton = document.getElementById(rButton);
        this.index = 0;
    }
    moveRight = () => {
        this.cleanContainer();
        this.index = (this.index == pictures.length - 1) ? 0 : ++this.index;
        this.loadImages(this.index);
    }

    moveLeft = () => {
        this.cleanContainer();
        this.index = (this.index < 1) ? pictures.length - 1 : --this.index;
        this.loadImages(this.index);
    }

/*    accesez o bucata din setul de date si fac map pentru a realiza pentru fiecare valoare din array cate un element img pe care il adaug la containerul caruselului*/
    loadImages(indexParameter) {

        let slide = this.ownPictures[indexParameter];
        let cont = this.container;
        try {
            slide.map(picture => {
                let img = document.createElement('img');
                img.src = picture;
                img.className = 'img';
                cont.appendChild(img);
            })
        } catch (e) {
            throw new Error(e);
        }
    }
/*    functie realizata pentru curatarea containerului cand se face moveright sau moveleft*/
    cleanContainer = () => {
        let container = this.container;
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }
}





