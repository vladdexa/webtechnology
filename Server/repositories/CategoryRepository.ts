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
}