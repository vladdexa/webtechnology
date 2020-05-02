import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/entities/Product";
import HttpStatus from 'http-status-codes'
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { Productcategory } from "../models/entities/Productcategory";

async function getProduct(req: any, res: any) {

    const productId: number = req.body.productId;

    const productRepository = new ProductRepository();
    const product: Product = (await productRepository.getById(productId))[0];

    const response = {
        product: product
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));

}

async function getProductsPicturesByCategory(req: any, res: any) {

    const prodId: number = req.body.productId;

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


export { getProduct, getProductsPicturesByCategory }