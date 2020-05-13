import {
    loadFooter
} from "../Generics/Footer/footer.js";
import {
    authorizer
} from "../Components/Generics/authorizer.js";

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('productId');
const productId = parseInt(param, 10);

async function getProduct() {

    const response = await fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productId=${productId}`
    });

    const responseFromServer = await response.json();

    return responseFromServer.product;
}

async function getImagesForCarousel() {

    const response = await fetch('http://localhost:3000/product/products-byCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productId=${productId}`
    })

    const responseFromServer = await response.json();
    return responseFromServer.images;
}

function backToHome() {
    const userId = authorizer();
    if (userId) {
        window.location.assign("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }
}

async function getProductsForShoppingCart() {
    const userId = authorizer();
    const response = await fetch('http://localhost:3000/order/get-products-shopping-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userId=${userId}`
    });

    const responseFromServer = await response.json();

    return responseFromServer.products;

}

async function goToOrderPage() {
    const userId = authorizer();

    if (!userId) {
        alert('You do not have authorization for this action');
    } else {
        const products = await getProductsForShoppingCart();
        if (!products.length) {
            alert("You do not have any product in your shopping cart.");
        } else {
            window.location.assign("http://localhost:3000/order");
        }
    }
}

async function addProductToShoppingCart() {
    const userId = authorizer();

    if (userId) {
        const successResponse = 'The product has been added in the shopping cart with success';
        const response = await fetch('http://localhost:3000/product/add-product-shoppingCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userId=${userId}&productId=${productId}`
        });

        const responseFromServer = await response.json();

        if (!responseFromServer.message.localeCompare(successResponse)) {
            alert(responseFromServer.message);
        }
    } else {
        alert('You do not have authorization for this action');
    }


}

function goToSearchPage() {
    const value = urlParams.get('value');

    if (authorizer() && value) {
        window.location.assign(`http://localhost:3000/search?value=${value}`);
    } else if (!value) {
        alert('You do not have any search before.');
    } else {
        alert('You do not have authorization for this action');
    }
}

async function renderProductPage() {
    const product = await getProduct();
    const images = await getImagesForCarousel();

    const img = document.getElementById('#left-img');
    img.setAttribute("src", product.picture);

    const name = document.getElementById('#product-name');
    name.innerText = product.name;

    const description = document.getElementById('#product-description');
    description.innerText = product.description;

    const price = document.getElementById('#product-price');
    price.innerText = product.price + ' RON';

    const backBtn = document.getElementById('#back-btn');
    backBtn.addEventListener('click', backToHome);

    const imagesContainer = document.getElementById('images-container');
    images.forEach(image => {
        image = image.trim();
        const imageURL = image.slice(0, (image.indexOf(" ")));
        const imageId = image.slice((image.indexOf(" ") + 1), (image.length));
        const img = document.createElement('img');
        img.src = imageURL;
        img.setAttribute("id", imageId);
        img.className = 'get-img';
        imagesContainer.appendChild(img);
    });

    const addToCartBtn = document.getElementById('#cart-btn');
    addToCartBtn.addEventListener('click', addProductToShoppingCart);

    const viewCart = document.getElementById('#view-cart');
    viewCart.addEventListener('click', goToOrderPage);
}


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

            if (checkNumber(productId) && authorizer()) {
                window.location.assign(`http://localhost:3000/product?productId=${productId}`);
            } else if (!authorizer()) {
                alert('You do not have authorization for this action.');
            }
        }
    }, false);
}



const initialize = async() => {
    const htmlFooterPath = '../Generics/Footer/footer.html';
    const idFooterContainer = '#footer-container';

    await loadFooter(idFooterContainer, htmlFooterPath);
    await renderProductPage();
    getImageId();
};
document.getElementById('#body').addEventListener('load', initialize());