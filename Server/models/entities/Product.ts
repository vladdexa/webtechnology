import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productcategory } from "./Productcategory";
import { Userproduct } from "./Userproduct";

@Entity("product", { schema: "toysdb" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 100, default: () => "'0'" })
  name: string;

  @Column("varchar", {
    name: "description",
    length: 1500,
    default: () => "'0'",
  })
  description: string;

  @Column("varchar", { name: "picture", length: 500, default: () => "'0'" })
  picture: string;

  @Column("varchar", {
    name: "price",
    length:10,
    default: () => "'0'",
  })
  price: string;

  @OneToMany(
    () => Productcategory,
    (productcategory) => productcategory.product
  )
  productcategories: Productcategory[];

  @OneToMany(() => Userproduct, (userproduct) => userproduct.product)
  userproducts: Userproduct[];
}
