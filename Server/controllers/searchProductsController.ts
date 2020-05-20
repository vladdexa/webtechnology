import { Product } from "../models/entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import HttpStatus from 'http-status-codes'
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { SearchKeyRepository } from "../repositories/SearchKeyRepository";
import { Searchkey } from "../models/entities/Searchkey";
import URLparse from 'url-parse'

async function getProductsBySearchInput(req: any, res: any) {

    const url = URLparse(req.url,true);
    const searchKeyValue: string | undefined = url.query.value;

    if(searchKeyValue !== undefined) {
        const searchKey: string = searchKeyValue.toString().toLocaleLowerCase();


        const searchKeyRepository = new SearchKeyRepository();
        const searchKeyRecord:Searchkey = (await searchKeyRepository.getByKey(searchKey))[0];
    
        if(searchKeyRecord) {
            await searchKeyRepository.updateSearchCounter(searchKeyRecord.id);
        } else {
            const  newSearchKey:Searchkey = new Searchkey();
            newSearchKey.key = searchKey;
            newSearchKey.searchCounter=1;
            await searchKeyRepository.create(newSearchKey);
        }
        const productRepository = new ProductRepository();
        const products: Product[] = await productRepository.getAll();
    
        let index: number = 0;
        let productsResult: Product[] = [];
    
        const productCategoryRepository = new ProductCategoryRepository();
        const categoryRepository = new CategoryRepository();
    
        let categoriesFoundByProducts: number[] =[];
    
        while (index < products.length) {
            const nameDescriptionConcat: string = products[index].name.toLocaleLowerCase() + " " + products[index].description.toLocaleLowerCase();
            if (nameDescriptionConcat.indexOf(searchKey) !== (-1)) {
                productsResult.push(products[index]);
                
                const categoryId:number = (await productCategoryRepository.getByProductId(products[index].id))[0].categoryId;
                const found:number|undefined = categoriesFoundByProducts.find(element => element === categoryId);
    
                if(!found) {
                    categoriesFoundByProducts.push(categoryId);
                }
            }
            index++;
        }
    
        index = 0;
        while(index<categoriesFoundByProducts.length) {
            await categoryRepository.updateAccessCounter(categoriesFoundByProducts[index]);
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
   
}


export {getProductsBySearchInput}