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

let displayForm = true;

async function load() {
    await loadBasketCards();
    deleteCard();

    const backBtn = document.getElementById('#back-btn');
    backBtn.addEventListener('click', backToHome);

    const placeOrderButton = document.getElementById('placeOrder');
    placeOrderButton.addEventListener('click',()=>{

        const detailsContainer = document.getElementById('detailsContainer');
        displayForm ? detailsContainer.style.display = 'block': detailsContainer.style.display='none';
        displayForm = !displayForm;
    })

}
