import { ReadWriteRepository } from "./ReadWriteRepository";
import { Userproduct } from "../models/entities/Userproduct";

export class UserProductRepository extends ReadWriteRepository<Userproduct> {
    constructor() {
        super(Userproduct);
    }

    async getByUserId(userId:number):Promise<Userproduct[]> {
        return await this.connection.manager
            .find(Userproduct, {where: {userId:userId}});
    }

    async getByProductId(productId:number):Promise<Userproduct[]> {
        return await this.connection.manager
            .find(Userproduct, {where: {productId:productId}});
    }
}