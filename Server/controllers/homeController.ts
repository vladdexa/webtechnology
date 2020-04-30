import { CategoryRepository } from "../repositories/CategoryRepository"
import { ProductCategoryRepository } from "../repositories/ProductCategoryRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { Productcategory } from "../models/entities/Productcategory";
import { Product } from "../models/entities/Product";
import HttpStatus from 'http-status-codes'


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
        const productId:number = product.id;

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

export { getImagesForCarousels }