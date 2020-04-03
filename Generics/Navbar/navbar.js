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

}

const initializeMenu = async (path) => {

    const menu = new Menu(path);
    await menu.buildMenu();

    const menuButton = document.getElementById('#menuButton');
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

}

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

const initializeNavbar = async (path) => {
    initilizeSearch();
    initializeDropdown();
    await initializeMenu(path);
};

export default initializeNavbar;
