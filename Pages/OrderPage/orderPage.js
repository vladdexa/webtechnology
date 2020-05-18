import { authorizer } from "../../Components/Generics/authorizer.js";

async function getProductsForShoppingCart() {
    const userId = authorizer();
    if (userId) {
        const response = await fetch('http://localhost:3000/order/get-products-shopping-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userId=${userId}`
        });

        const responseFromServer = await response.json();

        return responseFromServer.products;
    } else {
        alert('You do not have authorization for this action.');
    }


}

async function deleteProductCard(productId) {
    const response = await fetch('http://localhost:3000/order/delete-product-from-shoppingCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `productId=${productId}`
    });

    const responseFromServer = await response.json();

    const deletedSuccess = 'The product has been deleted from shopping cart with successs.';

    if (!responseFromServer.message.localeCompare(deletedSuccess)) {
        alert(deletedSuccess);
    }
}


const loadBasketCards = async() => {

    const products = await getProductsForShoppingCart();

    const basketCardsContainer = document.getElementById('basket-cards-container');
    const basketCardPath = '../../Components/Generics/BasketCard/basketCard.html';


    try {
        await fetch(basketCardPath)
            .then(response => response.text())
            .then(html => {
                for (let index = 0; index < products.length; index++) {
                    const genericDiv = document.createElement('div');
                    genericDiv.setAttribute('class', 'card');
                    genericDiv.setAttribute("id", `${index}`);
                    genericDiv.innerHTML = html;
                    genericDiv.getElementsByClassName('price')[0].innerText = products[index].price + " RON";
                    genericDiv.getElementsByClassName('product-description')[0].innerText = products[index].name
                    genericDiv.getElementsByClassName('product-img')[0].src = products[index].picture;
                    genericDiv.getElementsByTagName('span')[0].setAttribute("id", `${products[index].id}`);
                    basketCardsContainer.appendChild(genericDiv);
                }
            })
            .catch(error => {
                console.log(error);
            })

    } catch (e) {
        throw new Error(e);
    }
}


function deleteCard() {
    document.body.addEventListener("mousedown", async e => {
        if (e.target.nodeName === "SPAN") {
            const card = document.getElementById(e.target.id);

            if (authorizer()) {
                card.parentNode.parentNode.parentNode.outerHTML = "";
                deleteProductCard(e.target.id);

            } else {
                alert('You do not have authorization for this action.');
            }

        }
    }, false);
}

function backToHome() {
    const userId = authorizer();
    if (userId) {
        window.location.assign("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }
}


const submitYourOrder = async() => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    const userId = authorizer();

    const result = {
        userId,
        firstName,
        lastName,
        email,
        phoneNo,
        country,
        state,
        address,
        payment
    };

    const cart = document.getElementsByClassName('card');

    const toSend = [];
    for (let i = 0; i < cart.length; i++) {
        const cartItem = {
            description: document.getElementById(`${i}`).getElementsByClassName('product-description')[0].innerText,
            price: document.getElementById(`${i}`).getElementsByClassName('price')[0].innerText
        }

        toSend.push(cartItem);
    }

    const payload = {
        userDetails: result,
        userCart: toSend,
    };


    if (userId) {
        const response = await fetch('http://localhost:3000/order/place-your-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const messageFromServer = await response.json();

        if (!messageFromServer.success) {
            alert(messageFromServer.message);
        } else {
            await alert(messageFromServer.message);
            window.location.assign('http://localhost:3000/home');
        }
    } else {
        alert('You do not have authorization for this action');
    }
};

let displayForm = true;

const initialize = async() => {
    await loadBasketCards();
    deleteCard();

    const basketCardContainer = document.getElementById('basket-cards-container');
    const placeOrderButton = document.createElement('button');
    const form = document.getElementById('#order-form');

    placeOrderButton.setAttribute('class', 'place_order_button');
    placeOrderButton.setAttribute('id', 'placeOrder');
    placeOrderButton.setAttribute('type', 'button');
    placeOrderButton.innerHTML = 'Checkout';
    placeOrderButton.addEventListener('click', () => {
        basketCardContainer.appendChild(form);
        const detailsContainer = document.getElementById('detailsContainer');

        displayForm ? detailsContainer.style.display = 'block' : detailsContainer.style.display = 'none';
        displayForm = !displayForm;
    });

    const cart = document.getElementsByClassName('card');
    if (cart.length !== 0) {
        basketCardContainer.appendChild(placeOrderButton);
    }


    const backBtn = document.getElementById('#back-btn');
    backBtn.addEventListener('click', backToHome);


};

document.getElementById('#body').addEventListener('load', initialize());
document.getElementById('submitButton').addEventListener('click', submitYourOrder);