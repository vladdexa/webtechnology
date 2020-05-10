import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Category } from "./Category";

@Index("fk_categoryIdProductCategory", ["categoryId"], {})
@Index("fk_productIdProductCategory", ["productId"], {})
@Entity("productcategory", { schema: "toysdb" })
export class Productcategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "productId", unsigned: true, default: () => "'0'" })
  productId: number;

  @Column("int", { name: "categoryId", unsigned: true, default: () => "'0'" })
  categoryId: number;

  @ManyToOne(() => Product, (product) => product.productcategories, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Category, (category) => category.productcategories, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;
}
