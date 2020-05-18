import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("searchkey", { schema: "toysdb" })
export class Searchkey {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "key", length: 150, default: () => "'0'" })
  key: string;

  @Column("int", {
    name: "searchCounter",
    unsigned: true,
    default: () => "'0'",
  })
  searchCounter: number;
}
