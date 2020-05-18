import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("fk_productIdSoldProducts", ["productId"], {})
@Entity("soldproducts", { schema: "toysdb" })
export class Soldproducts {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "productId", unsigned: true, default: () => "'0'" })
  productId: number;

  @Column("int", { name: "soldCounter", unsigned: true, default: () => "'0'" })
  soldCounter: number;

  @ManyToOne(() => Product, (product) => product.soldproducts, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}