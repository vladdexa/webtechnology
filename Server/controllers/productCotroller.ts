import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/entities/Product";
import HttpStatus from 'http-status-codes'
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { Productcategory } from "../models/entities/Productcategory";
import { UserProductRepository } from "../repositories/UserProductRepository";
import { Userproduct } from "../models/entities/Userproduct";
import {CategoryRepository} from "../repositories/CategoryRepository";
import {Category} from "../models/entities/Category";

async function getProduct(req: any, res: any) {

    const productId: number = req.body.productId;

    const productRepository = new ProductRepository();
    const product: Product = (await productRepository.getById(productId))[0];

    await productRepository.updateAccessCounter(productId);

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

async function createProduct(req: any, res: any) {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const picture = req.body.picture;

    if(!name || name.length <=0 ) {
        res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
        const response = {
            success: false,
            message: 'Product name is required',
        };

        res.end(JSON.stringify(response));
    }


    const categoryRepository: CategoryRepository = new CategoryRepository();
    const productRepository: ProductRepository = new ProductRepository();
    const productCategoryRepository : ProductCategoryRepository = new ProductCategoryRepository();

    const product: Product = new Product();
    product.name = name;
    product.description = description;
    product.picture = picture;
    product.price = price;

    try{
       await productRepository.create(product);


       const productByName: Product | undefined = (await productRepository.getAll()).find(item => item.name === product.name);

       if(!productByName) {
           res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type':'application/json'});
           const response = {
               success: false,
               message: 'There was an error creating the product',
           };

           res.end(JSON.stringify(response));
           return;
       }

       const categoryByName: Category | undefined = (await categoryRepository.getByName(category.name))[0];
       if(!categoryByName) {
           res.writeHead(HttpStatus.BAD_REQUEST, {'Content-Type':'application/json'});
           const response = {
               success: false,
               message: 'Nonexistent category',
           };

           res.end(JSON.stringify(response));
           return;
       }


       const productcategory: Productcategory = new Productcategory();
       productcategory.productId = productByName.id;
       productcategory.categoryId = categoryByName.id;

       await productCategoryRepository.create(productcategory);

        res.writeHead(HttpStatus.OK, {'Content-Type':'application/json'});
        const response = {
            success: true,
            message: 'Product created',
        };

        res.end(JSON.stringify(response));
    }
     catch(error) {
         res.writeHead(HttpStatus.INTERNAL_SERVER_ERROR, {'Content-Type':'application/json'});
         const response = {
             success: false,
             message: 'There was an error creating the product',
         };

         res.end(JSON.stringify(response));
         throw (error);
     }

}



export { getProduct, getProductsPicturesByCategory, addProductToShoppingCart, createProduct}
