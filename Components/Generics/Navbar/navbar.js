import Menu from "../Menu/Menu.js";
import { authorizer } from "../authorizer.js";

const initilizeSearch = () => {
    const inputSearch = document.getElementById('#searchInput');

    inputSearch.addEventListener('keyup', (event) => {
        if (event.code === "Enter") {
            event.preventDefault();
            if (inputSearch.value !== '' && inputSearch.value !== inputSearch.defaultValue) {
                inputSearch.value = inputSearch.defaultValue;
            }
        }
    });

};

async function getProductsForShoppingCart() {
    const userId = authorizer();

    if (userId) {
        const response = await fetch(`http://localhost:3000/order/get-products-shopping-cart?uid=${userId}`);

        const responseFromServer = await response.json();

        return responseFromServer.products;
    } else {
        alert('You do not have authorization for this action.');
    }

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

const dv = document.getElementById('pdf');
dv.innerHTML = "";

function createTable(statisticObj) {
    const table = document.createElement("TABLE");

    //Add the header row.
    let row = table.insertRow(-1);

    let headerCell = document.createElement("TH");
    headerCell.innerHTML = statisticObj[0].title;
    row.appendChild(headerCell);


    //Add the data rows.
    for (var i = 1; i < statisticObj.length; i++) {
        row = table.insertRow(-1);

        let cell = row.insertCell(-1);
        cell.innerHTML = statisticObj[i].name;

        cell = row.insertCell(-1);
        cell.innerHTML = statisticObj[i].accessCounter;
    }

    dv.appendChild(table);
    const br = document.createElement('br');
    dv.appendChild(br);

}

function convertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let stringResult = '';

    for (let index = 0; index < array.length; index++) {
        let line = '';
        for (const indexx in array[index]) {
            if (line != '') {
                line += ','
            }
            line += array[index][indexx];
        }

        stringResult += line + '\r\n';
    }

    return stringResult;

}

async function getStatisticsPDF() {

    const userId = authorizer();

    if (userId) {
        const response = await fetch("http://localhost:3000/home/getStatistics");
        const responseFromServer = await response.json();

        const categories = responseFromServer.categories;
        const products = responseFromServer.products;
        const searchKeys = responseFromServer.searchKeys
        const productsPercents = responseFromServer.productsPercents
        const soldProducts = responseFromServer.soldProducts

        createTable(categories);
        createTable(products);
        createTable(searchKeys);

        //productsPercents create table
        const table = document.createElement("TABLE");

        //Add the header row.
        let row = table.insertRow(-1);

        let headerCell = document.createElement("TH");
        headerCell.innerHTML = productsPercents[0].title;
        row.appendChild(headerCell);


        //Add the data rows.
        for (var i = 1; i < productsPercents.length; i++) {
            row = table.insertRow(-1);

            let cell = row.insertCell(-1);
            cell.innerHTML = productsPercents[i].numbers;

            cell = row.insertCell(-1);
            cell.innerHTML = productsPercents[i].percents;
        }

        dv.appendChild(table);
        const br = document.createElement('br');
        dv.appendChild(br);

        createTable(soldProducts);

        html2canvas(document.getElementById('pdf')).then(canvas => {
            const data = canvas.toDataURL("image/jpeg", 0.9);
            const docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            }
            pdfMake.createPdf(docDefinition).download("statistics.pdf");

            dv.innerHTML = "";
        })
    } else {
        alert('You do not have authorization for this action');
    }


}

async function getStatisticsCSV() {
    const userId = authorizer();

    if (userId) {
        const response = await fetch("http://localhost:3000/home/getStatistics");
        const responseFromServer = await response.json();

        const categoriesResult = convertToCSV(responseFromServer.categories);
        const productsResult = convertToCSV(responseFromServer.products);
        const searchKeys = convertToCSV(responseFromServer.searchKeys);
        const productsPercents = convertToCSV(responseFromServer.productsPercents);
        const soldProducts = convertToCSV(responseFromServer.soldProducts);
        const csvString = categoriesResult + "\n" + productsResult + "\n" + searchKeys + "\n" + productsPercents + "\n" + soldProducts;

        const exportedFilenmae = "statistics" + '.csv';

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        const link = document.getElementById('#statisticsCSV');
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        if (link.download !== undefined) {
            link.setAttribute("download", exportedFilenmae);
        }
    } else {
        alert('You do not have authorization for this action.');
    }


}
async function LogOutFunction() {

    const userId = authorizer();
    if (userId) {
        localStorage.removeItem("user");
        window.location.replace("http://localhost:3000/auth/login");
    } else {
        alert('You do not have authorization for this action.');
    }


}

const homePageRedirect = () => {
    const userId = authorizer();

    if (userId) {
        window.location.assign("http://localhost:3000/home");
    } else {
        alert('You do not have authorization for this action');
    }

}

const initializeMenu = async(path, pathForStyle, elementToOverlay) => {

    const menu = new Menu(path);
    await menu.buildMenu();

    const shoopingCartBtn = document.getElementById('shoppingCartBtn');
    shoopingCartBtn.addEventListener('click', goToOrderPage);

    const details = document.getElementById('#details');
    details.addEventListener('click', goToUserPage);

    const statisticsPDF = document.getElementById('#statisticsPDF');
    statisticsPDF.addEventListener('click', getStatisticsPDF);

    const statisticsCSV = document.getElementById('#statisticsCSV');
    statisticsCSV.addEventListener('click', getStatisticsCSV);

    const logout = document.getElementById('#logout');
    logout.addEventListener('click', LogOutFunction);

    const menuButton = document.getElementById('#menuButton');
    menuButton.src = pathForStyle + '/NavbarImages/menu.svg';

    const applicationLogo = document.getElementById('#appLogo');
    applicationLogo.addEventListener('click', homePageRedirect);
    applicationLogo.src = pathForStyle + '/NavbarImages/oto.png';
    applicationLogo.style.cursor = "pointer";
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