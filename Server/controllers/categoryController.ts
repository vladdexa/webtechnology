import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { Category } from "../models/entities/Category";
import HttpStatus from "http-status-codes";
import { Productcategory } from "../models/entities/Productcategory";
import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/entities/Product";
import { CategoryRepository } from "../repositories/CategoryRepository";
import URLparse from 'url-parse'

async function getProductsByCategoryId(req: any, res: any) {
    const url = URLparse(req.url, true);
    const categoryIdString: string | undefined = url.query.cid;

    if (categoryIdString !== undefined) {
        const categoryId: number = parseInt(categoryIdString, 10);
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
}

export { getProductsByCategoryId }