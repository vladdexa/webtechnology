import Menu from "../Menu/Menu.js";
import {authorizer} from "../authorizer.js";

const initilizeSearch = () => {
    const inputSearch = document.getElementById('#searchInput');

    inputSearch.addEventListener('keyup', (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            if (inputSearch.value !== '' && inputSearch.value !== inputSearch.defaultValue) {
                console.log(inputSearch.value);
                inputSearch.value = inputSearch.defaultValue;
            }
        }
    });

};

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
    const products = await getProductsForShoppingCart();



    if (authorizer() && products.length) {
        window.location.assign("http://localhost:3000/order");
    } else if (!products.length) {
        alert("You do not have any product in your shopping cart.");
    } else {
        alert('You do not have authorization for this action');
    }
}


function getInputSearch() {
    const inputSearchValue = document.getElementById('#searchInput').value;

    if (authorizer() && inputSearchValue) {
        window.location.assign(`http://localhost:3000/search?value=${inputSearchValue}`);
    } else if (!inputSearchValue) {
        alert('You must type any input search.')
    } else {
        alert('You do not have authorization for this action.');
    }

}


async function goToUserPage() {

    if (authorizer()) {
        window.location.assign("http://localhost:3000/user");
    } else {
        alert('You do not have authorization for this action');
    }

}

async function LogOutFunction() {

    localStorage.removeItem("user");
    window.location.replace("http://localhost:3000/auth/login");
    
}

const initializeMenu = async(path, pathForStyle, elementToOverlay) => {

    const menu = new Menu(path);
    await menu.buildMenu();

    const shoopingCartBtn = document.getElementById('shoppingCartBtn');
    shoopingCartBtn.addEventListener('click', goToOrderPage);

    const details = document.getElementById('#details');
    details.addEventListener('click', goToUserPage);

    const logout = document.getElementById('#logout');
    logout.addEventListener('click', LogOutFunction);

    const menuButton = document.getElementById('#menuButton')

    menuButton.src = pathForStyle + '/NavbarImages/menu.svg';
    document.getElementById('#appLogo').src = pathForStyle + '/NavbarImages/oto.png';
    document.getElementById('#searchIcon').src = pathForStyle + '/NavbarImages/search.svg';
    document.getElementById('#userIcon').src = pathForStyle + '/NavbarImages/user.png';
    document.getElementById('#shoppingBag').src = pathForStyle + '/NavbarImages/shopping-bag.svg';

    const menuContainer = document.getElementById('#menuContainer');
    const elementOverlayd = document.getElementById(elementToOverlay);

    menuButton.onmouseover = () => {
        menuContainer.style.display = 'block';
        elementOverlayd.style.width = '70%';
        elementOverlayd.style.left = '25%';

    };

    menuContainer.onmouseleave = () => {
        menuContainer.style.display = 'none';
        elementOverlayd.style.width = '80%';
        elementOverlayd.style.left = '10%';
    };

};

const initializeDropdown = () => {

    const dropdown = document.getElementById('myDropdown');
    const button = document.getElementById('dropdownTrigger');
    const adImage = document.getElementById('#Ad');

    document.addEventListener('click', (event) => {

        (button.contains(event.target) || dropdown.contains(event.target)) ?
        (dropdown.style.display = 'block', adImage.style.mixBlendMode = 'overlay') :
        (dropdown.style.display = 'none');
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Escape') {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    });
}

const initializeNavbar = async(pathForMenu, pathForStyle, elementToOverlay) => {

    const inputSearchBtn = document.getElementById('#search-btn');
    inputSearchBtn.addEventListener('click', getInputSearch);

    initilizeSearch();
    initializeDropdown();
    await initializeMenu(pathForMenu, pathForStyle, elementToOverlay);
};

export default initializeNavbar;
