import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/entities/Product";
import HttpStatus from 'http-status-codes'
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { Productcategory } from "../models/entities/Productcategory";
import { UserProductRepository } from "../repositories/UserProductRepository";
import { Userproduct } from "../models/entities/Userproduct";

import URLparse from 'url-parse'

async function getProduct(req: any, res: any) {
    const url = URLparse(req.url,true);
    const productIdString: string | undefined = url.query.pid;
    if(productIdString !== undefined) {
        const productId: number = parseInt(productIdString, 10);
        const productRepository = new ProductRepository();
        const product: Product = (await productRepository.getById(productId))[0];
    
        await productRepository.updateAccessCounter(productId);
    
        const response = {
            product: product
        }
    
        res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    }
}

async function getProductsPicturesByCategory(req: any, res: any) {
    const url = URLparse(req.url,true);
    const productIdString: string | undefined = url.query.pid;

    if(productIdString !== undefined) {
        const prodId: number = parseInt(productIdString, 10);
        const productCategoryRepository = new ProductCategoryRepository();
        const productCategory: Productcategory = (await productCategoryRepository.getByProductId(prodId))[0];
    
        const products = await productCategoryRepository.getByCategoryId(productCategory.categoryId);
    
        const productRepository = new ProductRepository();
    
        let index: number = 0;
        let productsImagesByCategory: string[] = [];
    
        while (index < products.length) {
            const product: Product = (await productRepository.getById(products[index].productId))[0];
            productsImagesByCategory.push(`${product.picture} ${product.id}`);
            index++;
        }
    
    
        const response = {
            images: productsImagesByCategory
        }
    
        res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
    }
}


async function addProductToShoppingCart(req:any,res:any) {
    const productId:number = req.body.productId;
    const userIdString:string = req.body.userId;
    const userId:number = parseInt(userIdString,10);

    const userProductRepository = new UserProductRepository();
    
    const newUserProduct:Userproduct = new Userproduct();
    newUserProduct.userId=userId;
    newUserProduct.productId=productId;

    await userProductRepository.create(newUserProduct);

    res.writeHead(HttpStatus.OK, {'Content-Type':'application/json'});
    const response = {
        message:'The product has been added in the shopping cart with success'
    }

    res.end(JSON.stringify(response));

}

export { getProduct, getProductsPicturesByCategory, addProductToShoppingCart}