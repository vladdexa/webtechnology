import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productcategory } from "./Productcategory";

@Entity("category", { schema: "toysdb" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "parentName", nullable: true, length: 100 })
  parentName: string | null;

  @Column("int", {
    name: "accessCounter",
    unsigned: true,
    default: () => "'0'",
  })
  accessCounter: number;

  @OneToMany(
    () => Productcategory,
    (productcategory) => productcategory.category
  )
  productcategories: Productcategory[];
}
