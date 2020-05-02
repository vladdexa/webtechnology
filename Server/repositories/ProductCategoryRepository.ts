import { ReadWriteRepository } from "./ReadWriteRepository";
import { Productcategory } from "../models/entities/Productcategory";

export class ProductCategoryRepository extends ReadWriteRepository<Productcategory> {
    constructor() {
        super(Productcategory);
    }

    async getByCategoryId(categoryId: number): Promise<Productcategory[]> {
        return await this.connection.manager
            .find(Productcategory, { where: { categoryId: categoryId } });
    }

    async getByProductId(productId: number): Promise<Productcategory[]> {
        return await this.connection.manager
            .find(Productcategory, { where: { productId: productId } });
    }
}