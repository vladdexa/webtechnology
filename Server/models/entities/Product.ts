import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Productcategory } from "./Productcategory";
import { Userproduct } from "./Userproduct";

@Entity("product", { schema: "toysdb" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", {
    name: "shortDescription",
    length: 250,
    default: () => "'0'",
  })
  shortDescription: string;

  @Column("varchar", {
    name: "longDescription",
    length: 500,
    default: () => "'0'",
  })
  longDescription: string;

  @Column("varchar", { name: "picture", length: 500, default: () => "'0'" })
  picture: string;

  @Column("decimal", {
    name: "price",
    precision: 4,
    scale: 0,
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
