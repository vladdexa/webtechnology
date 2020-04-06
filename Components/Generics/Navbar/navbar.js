import Menu from "../Menu/Menu.js";

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

const initializeMenu = async (path, pathForStyle) => {

    const menu = new Menu(path);
    await menu.buildMenu();


    const menuButton = document.getElementById('#menuButton');


    menuButton.src = pathForStyle + '/NavbarImages/menu.svg';
    document.getElementById('#appLogo').src = pathForStyle + '/NavbarImages/oto.png';
    document.getElementById('#searchIcon').src = pathForStyle + '/NavbarImages/search.svg';
    document.getElementById('#userIcon').src = pathForStyle + '/NavbarImages/user.png';
    document.getElementById('#shoppingBag').src = pathForStyle + '/NavbarImages/shopping-bag.svg';


    const menuContainer = document.getElementById('#menuContainer');
    const ad = document.getElementById('#Ad');

    menuButton.onmouseover = () => {
        menuContainer.style.display = 'block';
        ad.style.width = '70%';
        ad.style.left = '25%';

    };

    menuContainer.onmouseleave = () => {
        menuContainer.style.display = 'none';
        ad.style.width = '80%';
        ad.style.left = '10%';
    };


};

const initializeDropdown = () => {

    const dropdown = document.getElementById('myDropdown');
    const button = document.getElementById('dropdownTrigger');
    const adImage = document.getElementById('#Ad');

    document.addEventListener('click', (event) => {

        (button.contains(event.target) || dropdown.contains(event.target))
            ? (dropdown.style.display = 'block', adImage.style.mixBlendMode = 'overlay')
            : (dropdown.style.display = 'none');
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'Escape') {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    });
}

const initializeNavbar = async (pathForMenu, pathForStyle, baseUrl) => {
    initilizeSearch();
    initializeDropdown();
    await initializeMenu(pathForMenu, pathForStyle, baseUrl);
};

export default initializeNavbar;
