import { ReadWriteRepository } from "./ReadWriteRepository";
import { Soldproducts } from "../models/entities/Soldproducts";

export class SoldProductsRepository extends ReadWriteRepository<Soldproducts> {
    constructor() {
        super(Soldproducts)
    }

    async updateSoldCounter(productId:number):Promise<void> {
        await this.connection.manager
            .createQueryBuilder()
            .update(Soldproducts)
            .set({soldCounter: () => "soldCounter +1"})
            .where("productId=:productId",{productId:productId})
            .execute();
    }

    async getByProductId(productId: number): Promise<Soldproducts[]> {
        return await this.connection.manager
            .find(Soldproducts, { where: { productId: productId } });
    }

    async getFirstNRecordsOrderBySoldCounter(firstN:number):Promise<Soldproducts[]> {
        return await this.connection.getRepository(Soldproducts)
            .createQueryBuilder("soldProduct")
            .orderBy("soldProduct.soldCounter","DESC")
            .take(firstN)
            .getMany();

    }
}