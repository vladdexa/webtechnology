import {authorizer} from "../../Components/Generics/authorizer.js";

const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get('value');
const valueInputSearch = param.toString();

async function getProductsBySearchInput() {

    const productNotFoundMessage = 'Product not found.';

    const response = await fetch('http://localhost:3000/search/menu-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `valueInputSearch=${valueInputSearch}`
    })

    const messageFromServer = await response.json();

    if (!messageFromServer.message.localeCompare(productNotFoundMessage)) {
        alert(productNotFoundMessage);
        window.location.replace("http://localhost:3000/home");
    } else {
        return messageFromServer.products;
    }
}


const loadCards = async() => {
    const products = await getProductsBySearchInput();
    const cardsContainer = document.getElementById('#cards-container');
    const cardPath = '../../Components/Generics/Card/card.html';

    try {
        await fetch(cardPath)
            .then(response => response.text())
            .then(html => {
                for (let index = 0; index <= products.length; index++) {
                    const genericDiv = document.createElement('div');
                    genericDiv.innerHTML = html;

                    genericDiv.getElementsByClassName('price')[0].innerText = products[index].price + " RON";
                    genericDiv.getElementsByClassName('product-description')[0].innerText = products[index].name
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

            if (productId && checkNumber(productId) && authorizer()) {
                window.location.assign(`http://localhost:3000/product?productId=${productId}&value=${valueInputSearch}`);
            } else if (!authorizer()) {
                alert('You do not have authorization for this action.');
            }
        }
    }, false);
}


const initialize = async() => {
    await loadCards();
    getImageId();
};
document.getElementById('#body').addEventListener('load', initialize());
