import {authorizer} from "../authorizer.js";

class Menu {
    constructor(path) {
        this.items = [];
        this.path = path;
    }

    async getItems() {
        try {
            const response = await fetch('http://localhost:3000/home/categories');

            this.items = await response.json();
        } catch (e) {
            throw e;
        }
    }

    async buildMenu() {
        await this.getItems();

        const div = document.getElementById('#menuContainer');
        const ul = document.createElement('ul');
        div.appendChild(ul);

        const categories = this.items.filter(category => category.parentName === null);
        console.log('categories', categories);

        categories.forEach((category) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            li.setAttribute('id', category.id);
            a.setAttribute('href', `http://localhost:3000/category?categoryId=${category.id}`);
            a.addEventListener('click', ()=>{
                if(!authorizer()) {
                    alert('You do not have authorization for this action.')
                }
                window.location.assign(`http://localhost:3000/category?categoryId=${category.id}`);
            });
            a.innerHTML = a.innerHTML + category.name;
            li.appendChild(a);
            ul.appendChild(li);


            const subcategories = this.items.filter((subcategory) => subcategory.parentName === category.name);
            console.log('subcategories', subcategories);

            if (subcategories.length > 0) {
                const ull = document.createElement('ul');
                li.appendChild(ull);

                subcategories.forEach((subcategory) => {
                    const lii = document.createElement('li');
                    const aa = document.createElement('a');
                    aa.setAttribute('href', `http://localhost:3000/category?categoryId=${category.id}`);
                    aa.innerHTML = aa.innerHTML + subcategory.name;
                    a.addEventListener('click', ()=>{
                        if(!authorizer()) {
                            alert('You do not have authorization for this action.')
                        }
                        window.location.assign(`http://localhost:3000/category?categoryId=${subcategory.id}`);
                    });
                    lii.appendChild(aa);
                    ull.appendChild(lii);

                })
            }

        })
    }
}

export default Menu;
