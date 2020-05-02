import { ReadWriteRepository } from "./ReadWriteRepository";
import { Userproduct } from "../models/entities/Userproduct";

export class UserProductRepository extends ReadWriteRepository<Userproduct> {
    constructor() {
        super(Userproduct);
    }
}