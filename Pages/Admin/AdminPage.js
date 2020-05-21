import {authorizer} from "../../Components/Generics/authorizer.js";
import {ImageUploaderService} from "../../ClientServices/GoogleCloudServices/ImageUploaderService.js";


const mapCategoriesToSelect = async()=>{
   if(!authorizer()) {
       await alert('You do not have authorization for this action.');
       window.location.replace('auth/login');
       return;
   }

   const response = await fetch('http://localhost:3000/home/categories');
   const allCategories =  await response.json();

    allCategories.forEach((category)=>{
        const option = document.createElement('option');
        option.setAttribute('id', category.id);
        option.innerHTML = option.innerHTML + category.name;

        const select = document.getElementById('categories');
        select.appendChild(option);
    });

  const categories = allCategories.filter((category) => category.parentName === null);

   categories.forEach((category)=>{
       const option = document.createElement('option');
       option.setAttribute('id', category.id);
       option.innerHTML = option.innerHTML + category.name;

       const select = document.getElementById('parentName');
       select.appendChild(option);
   });
};


const createCategory = async ()=> {
    const name = document.getElementById('name').value;
    const value = document.getElementById('parentName').value;
    const parentName =  value !== 'None' ?
        value
        :
        undefined;

    const payload = {
        name,
        parentName,
    };

    if(name.length <=0 || !name) {
        alert('Category name is required');
        return;
    }

    if(authorizer()) {
        const response = await fetch('http://localhost:3000/category/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const messageFromServer = await response.json();

        if (!messageFromServer.success) {
            alert(messageFromServer.message);
        }

        alert(messageFromServer.message);
    } else {
        alert('You do not have authorization for this action');
    }

};

const createProduct = async()=> {
    const name = document.getElementById('nameP').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('categories').value;
    const price = document.getElementById('price').value;
    const selectedFile = document.querySelector('#picture').files[0];

    console.log(selectedFile);

    if(name.length <=0 || !name) {
        alert('Product name is required');
        return;
    }

    const imageServiceUploader = new ImageUploaderService();
    window.addEventListener('load', imageServiceUploader.authorization);
    await imageServiceUploader.getFile(selectedFile);
    await imageServiceUploader.uploadImage();

    const picture = `https://storage.cloud.google.com/toys-1/${imageServiceUploader.file.metadata.name}`;
    const payload =  {
        name,
        picture,
        category,
        description,
        price,
    };


   const response  = await fetch('http://localhost:3000/product/create', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(payload),
   });

    const messageFromServer = await response.json();
    console.log(messageFromServer);

};

const redirectToHomepage = () => {
    if(authorizer()) {
        window.location.assign('http://localhost:3000/home');
    }
    else {
        alert('You are not authorized to perform this action');
    }

};

let categoryForm  = false;
let productForm = false;

const initialize = async () => {
    await mapCategoriesToSelect();

    const createCategoryButton = document.getElementById('createCategoryButton');
    const createProductButton = document.getElementById('createProductButton');

    createCategoryButton.addEventListener('click', ()=> {
        const detailsContainer = document.getElementById('detailsContainerCategory');
        categoryForm? detailsContainer.style.display = 'block': detailsContainer.style.display = 'none';
        categoryForm = !categoryForm;
        createProductButton.disabled = !categoryForm;
    });


    createProductButton.addEventListener('click',()=>{
        const detailsContainer = document.getElementById('detailsContainerProduct');
        productForm? detailsContainer.style.display = 'block': detailsContainer.style.display = 'none';
        productForm = !productForm;
        createCategoryButton.disabled = !productForm;
    });

};

document.getElementById('#body').addEventListener('load', initialize());
document.getElementById('submitButton').addEventListener('click', createCategory);
document.getElementById('submitButtonProduct').addEventListener('click', createProduct);
document.getElementById('homepageButton').addEventListener('click', redirectToHomepage);
