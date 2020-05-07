import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import {Category} from "../models/entities/Category";
import HttpStatus from "http-status-codes";
import {Productcategory} from "../models/entities/Productcategory";
import {ProductRepository} from "../repositories/ProductRepository";
import {Product} from "../models/entities/Product";

async function getProductByCategoryId(req: any, res: any) {

    const categoryId: number = req.body.categoryId;

    const productCategoryRepository = new ProductCategoryRepository();
    const category: Category = (await productCategoryRepository.getByCategoryId(categoryId))[0];
    const response = {
        category: category
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));

}

async function getProductByCategoryList(req: any, res: any) {

    const prodId: number = req.body.productId;

    const productCategoryRepository = new ProductCategoryRepository();
    const productCategory: Productcategory = (await productCategoryRepository.getByProductId(prodId))[0];

    const products = await productCategoryRepository.getByCategoryId(productCategory.categoryId);

    const productRepository = new ProductRepository();

    let index: number = 0;
    let productsByCategory: Product[] = [];

    while (index < products.length) {
        const product: Product = (await productRepository.getById(products[index].productId))[0];
        productsByCategory.push(product);
        index++;
    }

    const response = {
        Product: productsByCategory
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

export {getProductByCategoryId, getProductByCategoryList}