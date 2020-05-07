async function getProductsForShoppingCart() {
    const userId = window.localStorage.getItem('user');

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


const loadBasketCards = async () => {

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
            card.parentNode.parentNode.parentNode.outerHTML = "";
            deleteProductCard(e.target.id);

            const products = await getProductsForShoppingCart();

            if (!products.length) {
                window.location.replace("http://localhost:3000/order");
            }
        }
    }, false);
}

function backToHome() {
    const userId = window.localStorage.getItem('user');
    if (userId) {
        window.location.replace("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }
}


const submitYourOrder = async () => {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneNo').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    const result = {
        firstName,
        lastName,
        email,
        phoneNo,
        country,
        state,
        address,
        payment
    };

    console.log(result);
    const cart = document.getElementsByClassName('card');
    const toSend = [];
    for (let i = 0; i < cart.length; i++) {
        toSend.push(cart.item(i).innerHTML);
    }

    console.log(toSend);


    const payload = {
        userDetails: result,
        userCart: toSend,
    };

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

};

let displayForm = true;

const initialize = async () => {
    await loadBasketCards();
    deleteCard();

    const basketCardContainer = document.getElementById('basket-cards-container');
    const placeOrderButton = document.createElement('button');

    placeOrderButton.setAttribute('class', 'place_order_button');
    placeOrderButton.setAttribute('id', 'placeOrder');
    placeOrderButton.setAttribute('type', 'button');
    placeOrderButton.innerHTML = 'Checkout';
    placeOrderButton.addEventListener('click', () => {

        const detailsContainer = document.getElementById('detailsContainer');
        displayForm ? detailsContainer.style.display = 'block' : detailsContainer.style.display = 'none';
        displayForm = !displayForm;
    });

    basketCardContainer.appendChild(placeOrderButton);

    const backBtn = document.getElementById('#back-btn');
    backBtn.addEventListener('click', backToHome);


};

document.getElementById('#body').addEventListener('load', initialize());
document.getElementById('submitButton').addEventListener('click', submitYourOrder);
