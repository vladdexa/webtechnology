import HttpStatus from 'http-status-codes'
import { Userproduct } from '../models/entities/Userproduct';
import { UserProductRepository } from '../repositories/UserProductRepository';
import { Product } from '../models/entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

async function getProductsForShoppingCart(req:any,res:any) {
    const userId:number = req.body.userId;

    const userProductRepository = new UserProductRepository();
    const products:Userproduct[] = await userProductRepository.getByUserId(userId);

    let productsForShoppingCarts:Product[] = [];
    let index:number = 0;

    const productRepository = new ProductRepository();

    while (index < products.length) {
        const product: Product = (await productRepository.getById(products[index].productId))[0];
        productsForShoppingCarts.push(product);
        index++;
    }

    const response = {
        products: productsForShoppingCarts 
    }


    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

async function deleteProductFromShoppingCart(req:any,res:any) {
    const productId:number = req.body.productId;

    const userProductRepository = new UserProductRepository();
    const userProduct:Userproduct = (await userProductRepository.getByProductId(productId))[0];

    await userProductRepository.delete(userProduct.id);

    const response = {
         message: 'The product has been deleted from shopping cart with successs.'
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));

}


export {getProductsForShoppingCart,deleteProductFromShoppingCart}