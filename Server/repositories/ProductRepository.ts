import { ReadWriteRepository } from "./ReadWriteRepository";
import { Product } from "../models/entities/Product";

export class ProductRepository extends ReadWriteRepository<Product> {
    constructor() {
        super(Product)
    }
    async updateAccessCounter(productId:number):Promise<void> {
        await this.connection.manager
        .createQueryBuilder()
        .update(Product)
        .set({accessCounter:() => "accessCounter + 1"})
        .where("id=:id",{id:productId})
        .execute();
    }

    async getFirstNRecordsOrderByAccessCounter(firstN:number):Promise<Product[]> {
        return await this.connection.getRepository(Product)
            .createQueryBuilder("product")
            .orderBy("product.accessCounter","DESC")
            .take(firstN)
            .getMany();

    }

    async getProductByPrice(startValue:number,endValue:number):Promise<Product[]> {
        return this.connection.manager
        .getRepository(Product)
        .query(`SELECT * FROM product WHERE price BETWEEN ${startValue} AND ${endValue}`);
    }
}