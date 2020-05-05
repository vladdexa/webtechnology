import { Product } from "../models/entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import HttpStatus from 'http-status-codes'

async function getProductsBySearchInput(req: any, res: any) {
    const searchKey: string = req.body.valueInputSearch.toString().toLocaleLowerCase();

    const productRepository = new ProductRepository();
    const products: Product[] = await productRepository.getAll();

    let index: number = 0;
    let productsResult: Product[] = [];

    while (index < products.length) {
        const nameDescriptionConcat: string = products[index].name.toLocaleLowerCase() + " " + products[index].description.toLocaleLowerCase();
        if (nameDescriptionConcat.indexOf(searchKey) !== (-1)) {
            productsResult.push(products[index]);
        }
        index++;
    }

    if(productsResult.length) {
        res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
        const response = {
           products:productsResult,
           message:''
        }
        res.end(JSON.stringify(response));
    } else {
        res.writeHead(HttpStatus.NOT_FOUND, { 'Content-Type': 'application/json' });
        const response = {
           message:'Product not found.'
        }
        res.end(JSON.stringify(response));
    }
   
}


export {getProductsBySearchInput}