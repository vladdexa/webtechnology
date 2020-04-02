class Menu {
    constructor() {
        this.items = [];
    }

    async getItems () {
        try{
           const response =  await fetch('Menu/menuItems.json');

           const data = await response.json();

           this.items = data.Items;
        } catch (e) {
            throw e;
        }
    }

    async buildMenu() {
       await this.getItems();

        const div = document.getElementById('#menuContainer');
        const ul = document.createElement('ul');
        div.appendChild(ul);

        this.items.forEach((value)=>{
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML = a.innerHTML + Object.keys(value).toString();
            li.appendChild(a);
            ul.appendChild(li);

            if(Object.values(value)[0].length > 0 ) {
                const ull = document.createElement('ul');
                li.appendChild(ull);

                Object.values(value)[0].forEach((subcategory)=>{
                    const lii = document.createElement('li');
                    const aa = document.createElement('a');
                    aa.setAttribute('href','#');
                    aa.innerHTML = aa.innerHTML + subcategory.Subcategory;
                    lii.appendChild(aa);
                    ull.appendChild(lii);

                    if(subcategory.List.length > 0) {
                        const ulll = document.createElement('ul');
                        lii.appendChild(ulll);

                        subcategory.List.forEach((elem)=>{

                            const liii = document.createElement('li');
                            const aaa = document.createElement('a');
                            aaa.setAttribute('href','#');
                            aaa.innerHTML = aaa.innerHTML + elem;
                            liii.appendChild(aaa);
                            ulll.appendChild(liii);

                        })
                    }

                })
            }
        })
    }
}
