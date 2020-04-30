/*momentan vom avea un set de date hardcodat si anume un array in care pun stringuri(denumiri ale imaginilor)*/
// const pictures = [
//     ['bck2.jpg', 'bck3.jpg', 'bck6.jpg'],
//     ['j1.jpg', 'j2.jpg', 'j3.jpg']
// ];


class Carousel {
    /*prin constructor vom popula campurile necesare pentru a manipula caruselul*/
    constructor(newContainer, lButton, rButton, pictures) {
        this.ownPictures = pictures;
        this.container = document.getElementById(newContainer);
        this.leftButton = document.getElementById(lButton);
        this.rightButton = document.getElementById(rButton);
        this.index = 0;
    }
    moveRight = () => {
        this.cleanContainer();
        this.index = (this.index == this.ownPictures.length - 1) ? 0 : ++this.index;
        this.loadImages(this.index);
    }

    moveLeft = () => {
        this.cleanContainer();
        this.index = (this.index < 1) ? this.ownPictures.length - 1 : --this.index;
        this.loadImages(this.index);
    }

    /*    accesez o bucata din setul de date si fac map pentru a realiza pentru fiecare valoare din array cate un element img pe care il adaug la containerul caruselului*/
    loadImages(indexParameter) {
            const slide = this.ownPictures[indexParameter];
            const cont = this.container;
            try {
                slide.map(picture => {
                    picture = picture.trim();
                    const pictureURL = picture.slice(0, (picture.indexOf(" ")));
                    const pictureId = picture.slice((picture.indexOf(" ") + 1), (picture.length));
                    const img = document.createElement('img');
                    img.src = pictureURL;
                    img.className = 'img';
                    img.setAttribute("id", pictureId);
                    cont.appendChild(img);
                })
            } catch (e) {
                throw new Error(e);
            }
        }
        /*    functie realizata pentru curatarea containerului cand se face moveright sau moveleft*/
    cleanContainer = () => {
        const container = this.container;
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
    }
}

export default Carousel;