import { CategoryRepository } from "../repositories/CategoryRepository"
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { Productcategory } from "../models/entities/Productcategory";
import { Product } from "../models/entities/Product";
import HttpStatus from 'http-status-codes'
import { Category } from "../models/entities/Category";
import { SearchKeyRepository } from "../repositories/SearchKeyRepository";
import { Searchkey } from "../models/entities/Searchkey";
import { Soldproducts } from "../models/entities/Soldproducts";
import { SoldProductsRepository } from "../repositories/SoldProductsRepository";

const JSONToCSV = require('json2csv').parse;

async function getImagesForCarousels(req: any, res: any) {
    const forFamily: string = 'Pentru familie';
    const Cars: string = 'Cars';
    const PapusiBarbie: string = 'Păpuși Barbie';

    const responseForFamily = await getImagesForCarousel(forFamily);
    const responseCars = await getImagesForCarousel(Cars);
    const responsePapusiBarbie = await getImagesForCarousel(PapusiBarbie);

    const response = {
        carousel1: responseForFamily,
        carousel2: responseCars,
        carousel3: responsePapusiBarbie
    }

    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

async function getImagesForCarousel(categoryName: string): Promise<any[]> {
    const categoryRepository = new CategoryRepository();

    const categoryId: number = (await categoryRepository.getByName(categoryName))[0].id; //preluam id ul categoriei dupa numele respectiv dat prin parametru

    const productCategoryRepository = new ProductCategoryRepository();
    const productCategories: Productcategory[] = await productCategoryRepository.getByCategoryId(categoryId);  // aducem toate record urile care au categoryId ul respectiv

    const productRepository = new ProductRepository();

    let bucket: string[] = []; // o lista intermediara care va fi o bucata din images a cate 3 elemente
    let images: any[] = []; //lista finala de bucket uri de imagini

    let index: number = 0;

    //pentru fiecare din record urile gasite(produse) preluam produsul respectiv pentru a putea accesa campul picture si formam lista images
    while (index < productCategories.length) {
        const product: Product = (await productRepository.getById(productCategories[index].productId))[0];
        const productId: number = product.id;

        if (bucket.length == 2) {
            bucket.push(`${product.picture} ${productId}`);
            images.push(bucket);
            bucket = [];
            index++;
        } else {
            bucket.push(`${product.picture}  ${productId}`);
            index++;
        }
    }

    return images;

}

async function getCategories(req: any, res: any) {
    const categoryRepository = new CategoryRepository();

    const categories: Category[] = await categoryRepository.getAll();
    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));

}

async function createStatistics(req: any, res: any) {

    let startValue: number;
    let endValue: number;
    let titleObj: object;
    let index: number;

    // primele n categorii cele mai accesate

    const numberOfCategories: number = 5;
    const categoryRepository = new CategoryRepository();
    const categories: any[] = await categoryRepository.getFirstNRecordsOrderByAccessCounter(numberOfCategories);

    titleObj = {
        title: "Cele mai accesate categorii:\n"
    };
    const categoriesResult: any[] = [];

    categoriesResult.push(titleObj);

    index = 1;
    categories.forEach((category: Category) => {
        const contentObj: object = {
            name: `${index}.${category.name}`,
            accessCounter: `Numar de cautari: ${category.accessCounter}`
        }
        categoriesResult.push(contentObj);
        index++;
    })

    // -------------------------------------------------------------------


    //primele n produse cele mai accesate

    const numberOfProducts: number = 10;
    const productRepository = new ProductRepository();
    const products: Product[] = await productRepository.getFirstNRecordsOrderByAccessCounter(numberOfProducts);

    titleObj = {
        title: "Cele mai vizitate produse:\n"
    };
    const productsResult: any[] = [];

    productsResult.push(titleObj);

    index = 1;
    products.forEach((product: Product) => {
        const contentObj: object = {
            name: `${index}.${product.name}`,
            accessCounter: `Numar de accesari: ${product.accessCounter}`
        }
        productsResult.push(contentObj);
        index++;
    })

    // -------------------------------------------------------------------


    // primele n cele mai frecvente cautari dupa chei

    const numberOfKeys: number = 5;
    const searchKeyRepository = new SearchKeyRepository();
    const searchKeys: Searchkey[] = await searchKeyRepository.getFirstNRecordsOrderBySearchCounter(numberOfKeys);

    titleObj = {
        title: "Cele mai frecvente chei de cautare dupa care s-au cautat produse:\n"
    };
    const searchKeysResult: any[] = [];

    searchKeysResult.push(titleObj);

    index = 1;
    searchKeys.forEach((searchKey: Searchkey) => {
        const contentObj: object = {
            name: `${index}.${searchKey.key}`,
            accessCounter: `Numar de cautari: ${searchKey.searchCounter}`
        }
        searchKeysResult.push(contentObj);
        index++;
    })


    //--------------------------------------------------------------------------

    const allProducts: number = (await productRepository.getAll()).length;
    titleObj = {
        title: "Statistici in functie de pret: \n"
    };
    const percents: any[] = [];
    percents.push(titleObj);

    // cat la % din produse se afla in intervalul de pret [1,50]

    startValue = 1;
    endValue = 50;
    const productsInterval150: Product[] = await productRepository.getProductByPrice(startValue, endValue);

    const procent150: string = (productsInterval150.length * 100 / allProducts).toFixed(2);

    const products150: object = {
        numbers: `Sunt ${productsInterval150.length} produse in intervalul de pret 1-50 RON`,
        percents:`acestea reprezinta ${procent150} % din totalul de produse.\n `      
    }

    percents.push(products150);

    // -------------------------------------------------------------------


    // cat la % din produse se afla in intervalul de pret [50,100]

    startValue = 50;
    endValue = 100;
    const productsInterval50100: Product[] = await productRepository.getProductByPrice(startValue, endValue);

    const procent50100: string = (productsInterval50100.length * 100 / allProducts).toFixed(2);

    const products50100: object = {
        numbers: `Sunt ${productsInterval50100.length} produse in intervalul de pret 50-100 RON`,
        percents:`acestea reprezinta ${procent50100} % din totalul de produse.\n `      

    }

    percents.push(products50100);
    
    // -------------------------------------------------------------------


    // cat la % din produse se afla in intervalul de pret [50,100]

    startValue = 100;
    endValue = 150;
    const productsInterval100150: Product[] = await productRepository.getProductByPrice(startValue, endValue);

    const procent100150: string = (productsInterval100150.length * 100 / allProducts).toFixed(2);

    const products100150: object = {
        numbers: `Sunt ${productsInterval100150.length} produse in intervalul de pret 100-150 RON`,
        percents:`acestea reprezinta ${procent100150} % din totalul de produse.\n `      

    }
    percents.push(products100150);


    // -------------------------------------------------------------------


    // primele n cele mai cumparate produse

    const numberOfSoldProducts: number = 10;
    const soldProductsRepository = new SoldProductsRepository();
    const soldProducts: Soldproducts[] = await soldProductsRepository.getFirstNRecordsOrderBySoldCounter(numberOfSoldProducts);

    titleObj = {
        title: "Cele mai cumparate produse:\n"
    };
    const soldProductsResult: any[] = [];

    soldProductsResult.push(titleObj);

    let indexx:number = 0;
    index = 1;
    while(indexx<soldProducts.length) {
        const product:Product = (await productRepository.getById(soldProducts[indexx].productId))[0];
        const contentObj: object = {
            name: `${index}.${product.name}`,
            accessCounter:`Numar de achizitionari: ${soldProducts[indexx].soldCounter}`
        }
        soldProductsResult.push(contentObj);
        index++;
        indexx++;
    }


    // -------------------------------------------------------------------


    const response = {
        categories: categoriesResult,
        products: productsResult,
        searchKeys: searchKeysResult,
        productsPercents:percents,
        soldProducts: soldProductsResult
    }



    res.writeHead(HttpStatus.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));

}

export { getImagesForCarousels, getCategories, createStatistics }
