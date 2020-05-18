import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { Category } from "../models/entities/Category";
import HttpStatus from "http-status-codes";
import {Productcategory} from "../models/entities/Productcategory";
import {ProductRepository} from "../repositories/ProductRepository";
import {Product} from "../models/entities/Product";
import {CategoryRepository} from "../repositories/CategoryRepository";

async function getProductsByCategoryId(req: any, res: any) {

    const categoryId: number = req.body.categoryId;

    const productCategoryRepository = new ProductCategoryRepository();
    const products: Productcategory[] = await productCategoryRepository.getByCategoryId(categoryId);

    const categoryRepository = new CategoryRepository();
    await categoryRepository.updateAccessCounter(categoryId);

    let index: number = 0;
    let productsByCategoryResponse: Product[] = [];

    const productRepository = new ProductRepository();


    while (index < products.length) {
        const product: Product = (await productRepository.getById(products[index].productId))[0];
        productsByCategoryResponse.push(product);
        index++;
    }

    const response = {
        products: productsByCategoryResponse
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));

}

async function createCategory(req:any, res: any) {
    const payload = req.body;

    if(!payload) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type': 'application/json'});
        const response =  {
            success  : false,
            error: 'Invalid request',
        };

        res.end(JSON.stringify(response));
    }

    const name = payload.name;

    if(!name) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type': 'application/json'});
        const response =  {
            success  : false,
            error: 'Name is required',
        };

        res.end(JSON.stringify(response));
    }
    const parentName  = payload.parentName? payload.parentName : null;

    const category: Category = new Category();
    category.name = name;
    category.parentName = parentName;

    const repository = new CategoryRepository();

    try {
        await repository.create(category);

        res.writeHead(HttpStatus.OK, {'Content-Type': 'application/json'});
        const respone = {
            success: true,
            message: 'Category created successfully',
        };

        res.end(JSON.stringify(respone));
    } catch(error) {
        console.log(error);
        res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type': 'application/json'});
        const response = {
            success: false,
            message: 'There was an error creating the category',
        };
    }


}

export {getProductsByCategoryId, createCategory}
