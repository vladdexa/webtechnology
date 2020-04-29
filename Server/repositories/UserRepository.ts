import { User } from "../models/entities/User";
import { ReadWriteRepository } from "./ReadWriteRepository";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class UserRepository extends ReadWriteRepository<User>{

    constructor() {
        super(User);
    }

    async getByUsername(usernameParameter: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { username: usernameParameter } })
    }

    async getByEmail(email: string): Promise<User[]> {
        return await this.connection.manager
            .find(User, { where: { email: email } });
    }

    
    async updatePassword(updateValue:string,id:number) {
        return await this.connection.manager.update(User, id, { password:updateValue});
           
    }
}