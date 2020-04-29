import { ReadWriteRepository } from "./ReadWriteRepository";
import { Product } from "../models/entities/Product";

export class ProductRepository extends ReadWriteRepository<Product> {
    constructor() {
        super(Product)
    }
}