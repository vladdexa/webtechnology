import { ReadWriteRepository } from "./ReadWriteRepository";
import { Category } from "../models/entities/Category";

export class CategoryRepository extends ReadWriteRepository<Category> {
    constructor() {
        super(Category)
    }
}