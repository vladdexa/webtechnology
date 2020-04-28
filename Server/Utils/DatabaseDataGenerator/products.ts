import fs from 'fs';
import { Product } from '../../models/entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';
import { createConnection } from 'typeorm';

async function generateProducts() {

    let images: any;
    fs.readFile('D:\\proiectTW\\Server\\Utils\\DatabaseDataGenerator\\images.json', (error: any, data: any) => {
        if (error) {
            throw error;
        }
        images = JSON.parse(data).Urls;
    })

    let products: any;
    fs.readFile('D:\\proiectTW\\Server\\Utils\\DatabaseDataGenerator\\products.json', (error: any, data: any) => {
        if (error) {
            throw error;
        }

        products = JSON.parse(data).Products;
        let index: number = 0;

        products.forEach( async (product: any) => {
            product.picture = images[index].url;
            index++;

            let newProduct: Product = new Product();

            newProduct.name = product.name;
            newProduct.description = product.description;
            newProduct.picture = product.picture;
            newProduct.price = product.price;
            const productRepository = new ProductRepository();
             await productRepository.create(newProduct);
        });
    })



}



createConnection().then(async () => {
    await generateProducts();

}).catch(error => {
    console.log(error);
})


