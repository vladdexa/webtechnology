import { ReadWriteRepository } from "./ReadWriteRepository";
import { Searchkey } from "../models/entities/Searchkey";

export class SearchKeyRepository extends ReadWriteRepository<Searchkey> {
    constructor() {
        super(Searchkey);
    }

    async updateSearchCounter(keyId: number): Promise<void> {
        await this.connection.manager
            .createQueryBuilder()
            .update(Searchkey)
            .set({ searchCounter: () => "searchCounter + 1" })
            .where("id=:id", { id: keyId })
            .execute();
    }

    async getByKey(key:string):Promise<Searchkey[]> {
        return await this.connection.manager
            .find(Searchkey, {where: {key:key}});
    }

    async getFirstNRecordsOrderBySearchCounter(firstN:number):Promise<Searchkey[]> {
        return await this.connection.getRepository(Searchkey)
            .createQueryBuilder("searchKey")
            .orderBy("searchKey.searchCounter","DESC")
            .take(firstN)
            .getMany();

    }
}
