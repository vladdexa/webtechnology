import { ReadWriteRepository } from "./ReadWriteRepository";
import { Category } from "../models/entities/Category";

export class CategoryRepository extends ReadWriteRepository<Category> {
    constructor() {
        super(Category)
    }

    async getByName(name: string): Promise<Category[]> {
        return await this.connection.manager
            .find(Category, { where: { name: name } });
    }

    async updateAccessCounter(categoryId:number):Promise<void> {
        await this.connection.manager
        .createQueryBuilder()
        .update(Category)
        .set({accessCounter:() => "accessCounter + 1"})
        .where("id=:id",{id:categoryId})
        .execute();
    }

    async getFirstNRecordsOrderByAccessCounter(firstN:number):Promise<Category[]> {
        return await this.connection.getRepository(Category)
            .createQueryBuilder("category")
            .orderBy("category.accessCounter","DESC")
            .take(firstN)
            .getMany();

    }
}